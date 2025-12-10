"use client"
import { useCart } from '@/context/CartContext'
import type { Product } from '@/types'

export default function AddToCartButton({ product }: { product: Product }) {
  const { addToCart } = useCart()
  return (
    <button
      type="button"
      onClick={() => addToCart(product, 1)}
      className="bg-brand-rose hover:bg-brand-pink text-white px-6 py-3 rounded-lg font-semibold transition-colors"
    >
      Agregar al carrito
    </button>
  )
}
