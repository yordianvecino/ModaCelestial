"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function NewProductPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('') // en pesos COP
  const [description, setDescription] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [uploading, setUploading] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [featured, setFeatured] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [categories, setCategories] = useState<any[]>([])

  // Cargar categorías
  useState(() => {
    ;(async () => {
      try {
        const res = await fetch('/api/admin/categories?all=1', { cache: 'no-store' })
        const data = await res.json()
        if (Array.isArray(data.items)) setCategories(data.items)
      } catch {}
    })()
  })

  function parsePesos(v: string) {
    // Permite separadores de miles y decimales, devuelve entero en pesos
    const clean = v.replace(/[^0-9.,]/g, '').replace(/\./g, '').replace(',', '.')
    const n = Number(clean)
    if (!Number.isFinite(n)) return null
    return Math.round(n)
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)
    const pricePesos = parsePesos(price)
    if (pricePesos === null || pricePesos < 0) {
      setError('Precio inválido')
      setLoading(false)
      return
    }
    const res = await fetch('/api/admin/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price: pricePesos, description, imageUrl, categoryId: categoryId || undefined, featured }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data?.error || 'No se pudo crear el producto')
      setLoading(false)
      return
    }
    router.push('/admin/products')
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Nuevo producto</h1>
      <form onSubmit={onSubmit} className="max-w-xl bg-white border rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1">Nombre</label>
          <input className="w-full border rounded px-3 py-2" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="flex items-center gap-2">
          <input id="featured" type="checkbox" checked={featured} onChange={(e) => setFeatured(e.target.checked)} />
          <label htmlFor="featured" className="text-sm text-gray-700">Destacado (aparece en la sección de destacados)</label>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Categoría</label>
          <select className="w-full border rounded px-3 py-2" value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">(Sin categoría)</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Precio (en pesos COP)</label>
          <input className="w-full border rounded px-3 py-2" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="ej: 20.000" required />
          <p className="text-xs text-gray-500 mt-1">Se guarda en pesos colombianos. Ej: 45000 → $ 45.000.</p>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Descripción</label>
          <textarea className="w-full border rounded px-3 py-2" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1">Imagen</label>
          <div className="flex items-center gap-3">
            <input
              className="flex-1 border rounded px-3 py-2"
              placeholder="URL de imagen (o usa Subir)"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
            />
            <UploadButton onUploaded={(url) => setImageUrl(url)} uploading={uploading} setUploading={setUploading} />
          </div>
          {imageUrl && (
            <div className="mt-2">
              <img src={imageUrl} alt="preview" className="h-24 rounded border object-cover" />
            </div>
          )}
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <div className="flex items-center gap-3">
          <button disabled={loading} type="submit" className="bg-brand-rose text-white px-4 py-2 rounded-lg hover:bg-brand-pink disabled:opacity-60">Guardar</button>
          <button type="button" onClick={() => router.push('/admin/products')} className="border px-4 py-2 rounded-lg hover:bg-gray-50">Cancelar</button>
        </div>
      </form>
    </main>
  )
}

function UploadButton({ onUploaded, uploading, setUploading }: { onUploaded: (url: string) => void; uploading: boolean; setUploading: (v: boolean) => void }) {
  const [input] = useState(() => typeof document !== 'undefined' ? document.createElement('input') : null)
  if (input) {
    input.type = 'file'
    input.accept = 'image/*'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return
      try {
        setUploading(true)
        const fd = new FormData()
        fd.append('file', file)
        fd.append('bucket', 'products')
        const res = await fetch('/api/upload', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) throw new Error(data?.error || 'No se pudo subir')
        if (data.url) onUploaded(data.url)
      } catch (e) {
        alert((e as Error).message)
      } finally {
        setUploading(false)
        input.value = ''
      }
    }
  }
  return (
    <button type="button" disabled={uploading} onClick={() => input?.click()} className="border px-3 py-2 rounded hover:bg-gray-50 disabled:opacity-60">
      {uploading ? 'Subiendo…' : 'Subir'}
    </button>
  )
}
