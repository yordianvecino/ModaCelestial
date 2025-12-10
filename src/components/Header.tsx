"use client"
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useSession, signOut } from 'next-auth/react'
import { Crown } from 'lucide-react'
import React from 'react'

const Header = () => {
  const { data: session, status } = useSession()
  const isAdmin = (session?.user as any)?.role === 'ADMIN'

  const [open, setOpen] = React.useState(false)
  const toggle = () => setOpen(v => !v)
  const close = () => setOpen(false)

  return (
    <header className="bg-white/90 backdrop-blur shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-8">
            <Link href="/" className="group inline-flex items-center gap-2">
              <span className="relative inline-flex items-center">
                <span className="font-accent text-2xl leading-none">moda celestial</span>
                <span className="absolute -top-2 -right-5 text-brand-gold"><Crown size={20} /></span>
              </span>
              <span className="ml-2 hidden sm:inline text-xs tracking-widest text-gray-500">
                BOUTIQUE CRISTIANA VIRTUAL
              </span>
            </Link>
            <nav className="hidden md:flex space-x-6">
              <Link href="/productos" className="text-gray-700 hover:text-brand-rose transition-colors">
                Productos
              </Link>
              <Link href="/categorias" className="text-gray-700 hover:text-brand-rose transition-colors">
                Categorías
              </Link>
              <Link href="/nosotros" className="text-gray-700 hover:text-brand-rose transition-colors">
                Nosotros
              </Link>
              <Link href="/contacto" className="text-gray-700 hover:text-brand-rose transition-colors">
                Contacto
              </Link>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            {/* Botón hamburguesa en mobile */}
            <button onClick={toggle} className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-rose/40">
              <span className="sr-only">Abrir menú</span>
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-brand-rose">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <button className="text-gray-700 hover:text-brand-rose">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <Link href="/carrito" className="relative text-gray-700 hover:text-brand-rose">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 5l1.5 3H19" />
              </svg>
              {/* Badge de cantidad del carrito */}
              <CartBadge />
            </Link>

            {isAdmin ? (
              <>
                <Link href="/admin" className="hidden md:inline text-gray-700 hover:text-brand-rose">Admin</Link>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="text-gray-700 hover:text-brand-rose">Salir</button>
              </>
            ) : (
              <Link href="/login" className="text-gray-700 hover:text-brand-rose">Acceder</Link>
            )}
          </div>
        </div>
        {/* Menú móvil (overlay + panel) */}
        {open && (
          <div className="md:hidden">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/30" onClick={close} />
            {/* Panel superior bajo el header (h-16) */}
            <div className="fixed left-0 right-0 top-16 max-h-[calc(100vh-4rem)] overflow-y-auto bg-white border-t shadow-lg rounded-b-lg p-4 animate-[fadeIn_150ms_ease-out]">
              <div className="flex items-center justify-between mb-3">
                <span className="font-accent text-xl">menú</span>
                <button onClick={close} className="inline-flex w-9 h-9 items-center justify-center rounded-md hover:bg-gray-50">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="grid grid-cols-1 gap-2">
                <Link href="/productos" onClick={close} className="px-3 py-2 rounded hover:bg-brand-rose/10">Productos</Link>
                <Link href="/categorias" onClick={close} className="px-3 py-2 rounded hover:bg-brand-rose/10">Categorías</Link>
                <Link href="/nosotros" onClick={close} className="px-3 py-2 rounded hover:bg-brand-rose/10">Nosotros</Link>
                <Link href="/contacto" onClick={close} className="px-3 py-2 rounded hover:bg-brand-rose/10">Contacto</Link>
                {isAdmin ? (
                  <Link href="/admin" onClick={close} className="px-3 py-2 rounded hover:bg-brand-rose/10">Admin</Link>
                ) : (
                  <Link href="/login" onClick={close} className="px-3 py-2 rounded hover:bg-brand-rose/10">Acceder</Link>
                )}
                {isAdmin && (
                  <button onClick={() => { signOut({ callbackUrl: '/' }); close() }} className="text-left px-3 py-2 rounded hover:bg-brand-rose/10">Salir</button>
                )}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

// Componente cliente interno para mostrar contador del carrito
function CartBadge() {
  const { totalItems } = useCart()
  if (totalItems <= 0) return null
  return (
    <span className="absolute -top-2 -right-2 bg-brand-gold text-black text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {totalItems}
    </span>
  )
}