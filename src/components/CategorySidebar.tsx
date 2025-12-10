"use client"
import Link from 'next/link'

type Category = { slug: string; name: string }

export default function CategorySidebar({
  categories,
  current,
}: {
  categories: Category[]
  current?: string
}) {
  const [open, setOpen] = require('react').useState(false)
  return (
    <aside className="md:w-64 flex-shrink-0">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">Categorías</h2>
        <button
          type="button"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50"
          onClick={() => setOpen((v: boolean) => !v)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      <ul className={`space-y-2 ${open ? '' : 'hidden md:block'}`}>
        <li>
          <Link
            className={`block px-3 py-2 rounded hover:bg-gray-100 ${!current ? 'font-semibold text-brand-rose' : 'text-gray-700'}`}
            href={`?page=1`}
          >
            Todas
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              className={`block px-3 py-2 rounded hover:bg-gray-100 ${current === cat.slug ? 'font-semibold text-brand-rose' : 'text-gray-700'}`}
              href={`?page=1&category=${encodeURIComponent(cat.slug)}`}
            >
              {cat.name}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  )
}
