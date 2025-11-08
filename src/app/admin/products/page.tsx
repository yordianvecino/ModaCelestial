"use client"

import Link from 'next/link'
import { formatCurrency } from '@/lib/format'
import { useState, useEffect, useCallback } from 'react'

type Product = {
  id: string
  name: string
  price: number
  active: boolean
  categoryNombre?: string | null
}

type ApiResponse = { items: Product[]; total: number; error?: string }

export default function AdminProductsPage() {
  const [data, setData] = useState<ApiResponse>({ items: [], total: 0 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/products', { credentials: 'include', cache: 'no-store' })
      if (res.status === 401 || res.status === 403) {
        setError('Sesión expirada o no autenticado. Inicia sesión para ver los productos.')
        setData({ items: [], total: 0 })
        return
      }
      if (!res.ok) throw new Error('Fail')
      const json = (await res.json()) as ApiResponse
      setData(json)
    } catch {
      setError('BD no configurada o sin acceso')
      setData({ items: [], total: 0 })
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { void load() }, [load])

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Productos (Admin)</h1>
        <div className="flex items-center gap-3">
          <button onClick={load} className="border rounded-lg px-3 py-2 text-sm hover:bg-gray-50">Refrescar</button>
          <Link href="/admin/products/new" className="bg-christian-purple text-white px-4 py-2 rounded-lg hover:bg-purple-700">Nuevo producto</Link>
        </div>
      </div>
      {loading && <p className="text-sm text-gray-600 mb-4">Cargando productos...</p>}
      {error && <p className="text-sm text-red-600 mb-4">{error}</p>}
      <div className="overflow-x-auto bg-white border rounded-lg">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="px-4 py-2">Nombre</th>
              <th className="px-4 py-2">Categoría</th>
              <th className="px-4 py-2">Precio</th>
              <th className="px-4 py-2">Activo</th>
              <th className="px-4 py-2">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {data.items?.map((p) => (
              <tr key={p.id} className="border-t">
                <td className="px-4 py-2 font-medium">{p.name}</td>
                <td className="px-4 py-2 text-sm text-gray-700">{p.categoryNombre || '–'}</td>
                <td className="px-4 py-2">{formatCurrency(p.price / 100)}</td>
                <td className="px-4 py-2">{p.active ? 'Sí' : 'No'}</td>
                <td className="px-4 py-2">
                  <Link className="text-christian-purple hover:underline" href={`/admin/products/${p.id}`}>Editar</Link>
                </td>
              </tr>
            ))}
            {(!data.items || data.items.length === 0) && !loading && (
              <tr>
                <td className="px-4 py-4 text-gray-600" colSpan={5}>No hay productos para mostrar.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  )
}
