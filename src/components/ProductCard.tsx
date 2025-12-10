"use client"

import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'
import { buildWhatsAppMessage, buildWhatsAppUrl } from '@/lib/whatsapp'
import { useWhatsAppPhone } from '@/hooks/useWhatsAppPhone'
import { formatCurrency } from '@/lib/format'
import React from 'react'

export function AddButton({ product }: { product: Product }) {
  const { addToCart } = useCart()
  return (
    <button
      onClick={() => addToCart(product)}
      className="h-11 px-5 inline-flex items-center justify-center bg-brand-rose text-white font-semibold rounded-md shadow-sm hover:shadow-md hover:bg-brand-pink transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-rose/40 min-w-[110px]"
    >
      Agregar
    </button>
  )
}

export function WhatsAppButton({ product, quantity = 1 }: { product: Product, quantity?: number }) {
  const { phone, loading } = useWhatsAppPhone()
  const disabled = !phone || loading
  const handleClick = () => {
    if (!phone) return
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const msg = buildWhatsAppMessage([{ product: { ...product }, quantity }], { includeImages: true, includeLinks: true, siteUrl: origin })
    const url = buildWhatsAppUrl(phone, msg)
    window.open(url, '_blank')
  }
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      title={disabled ? 'Configura WHATSAPP_PHONE en .env o espera carga' : 'Comprar por WhatsApp'}
      className={`h-11 px-5 inline-flex items-center justify-center border border-green-600 text-green-700 bg-white font-medium rounded-md shadow-sm hover:bg-green-50 transition-colors flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-green-600/40 min-w-[110px] ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {loading ? 'Cargando…' : 'WhatsApp'}
    </button>
  )
}

type ProductCardData = {
  id: string
  name: string
  price: number // unidades monetarias (no centavos)
  imageUrl?: string | null
  category?: string | null
}

export function ProductCard({ product }: { product: ProductCardData }) {
  return (
    <div className="rounded-lg border bg-white overflow-hidden flex flex-col shadow-sm">
      <div className="aspect-[3/4] w-full bg-gray-50 overflow-hidden">
        {product.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <a href={`/products/${product.id}`} className="block w-full h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.imageUrl}
              alt={product.name}
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </a>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-gray-400 text-sm">Sin imagen</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <span className="text-xs text-gray-500 tracking-wide">{product.category ?? ''}</span>
        <a href={`/products/${product.id}`} className="mt-1 mb-1 font-semibold text-gray-900 line-clamp-2 hover:text-brand-rose transition-colors">{product.name}</a>
        <div className="mt-auto pt-2 border-t">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg md:text-xl font-bold text-brand-gold whitespace-nowrap">{formatCurrency(product.price)}</span>
          </div>
          <div className="flex flex-wrap gap-2 justify-center">
            <WhatsAppButton product={{ id: product.id, name: product.name, price: product.price, image: product.imageUrl ?? undefined, category: product.category ?? undefined }} />
            <AddButton product={{ id: product.id, name: product.name, price: product.price, image: product.imageUrl ?? undefined, category: product.category ?? undefined }} />
          </div>
        </div>
      </div>
    </div>
  )
}

