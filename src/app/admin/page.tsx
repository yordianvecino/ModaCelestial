import Link from 'next/link'

export const metadata = {
  title: 'Admin | Ropa Cristiana',
}

export default function AdminPage() {
  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Panel de Administración</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-lg border p-6 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Productos</h2>
          <p className="text-sm text-gray-600 mt-1 mb-4">Crea, edita y administra el catálogo de productos.</p>
          <div className="flex items-center gap-3">
            <Link href="/admin/products" className="inline-flex items-center rounded-md bg-christian-purple px-4 py-2 text-white hover:bg-purple-700">Panel productos</Link>
            <Link href="/products" className="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Ver tienda</Link>
            <Link href="/admin/products/new" className="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Nuevo producto</Link>
          </div>
        </section>

        <section className="rounded-lg border p-6 bg-white">
          <h2 className="text-xl font-semibold text-gray-900">Categorías</h2>
          <p className="text-sm text-gray-600 mt-1 mb-4">Organiza los productos por categorías.</p>
          <div className="flex items-center gap-3">
            <Link href="/admin/categories" className="inline-flex items-center rounded-md bg-brand-rose px-4 py-2 text-white hover:bg-brand-pink">Ver categorías</Link>
            <Link href="/admin/categories/new" className="inline-flex items-center rounded-md border px-4 py-2 text-gray-800 hover:bg-gray-50">Nueva categoría</Link>
          </div>
        </section>
      </div>

      <div className="mt-8 rounded-lg border p-6 bg-white">
        <h3 className="text-lg font-medium text-gray-900 mb-2">Acceso</h3>
        <p className="text-sm text-gray-600">Esta sección está protegida. Inicia sesión con tu correo y contraseña de administrador. Si no puedes ver los listados, revisa que la sesión esté activa.</p>
      </div>
    </main>
  )
}
