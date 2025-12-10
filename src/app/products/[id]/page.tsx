import { getProductById } from '@/lib/products'
import { formatCurrency } from '@/lib/format'
import AddToCartButton from '@/components/AddToCartButton'
import { WhatsAppButton } from '@/components/ProductCard'

type Props = { params: { id: string } }

export default async function ProductDetailPage({ params }: Props) {
  const { id } = params
  const product = await getProductById(id)

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
        <p className="text-gray-600">El producto solicitado no existe o fue desactivado.</p>
      </div>
    )
  }

  const uiProduct = {
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.imageUrl ?? undefined,
    category: product.category ?? undefined,
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        <div className="bg-white rounded-xl shadow-sm p-5 md:p-6 flex items-center justify-center">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto max-h-[480px] object-contain" />
          ) : (
            <div className="w-full h-64 bg-brand-rose/10 rounded-lg" />
          )}
        </div>
        <div>
          {product.category && (
            <div className="mb-3">
              <span className="inline-block text-xs uppercase tracking-wide text-brand-rose bg-brand-rose/10 px-2 py-0.5 rounded">{product.category}</span>
            </div>
          )}
          <h1 className="text-3xl md:text-4xl font-bold text-brand-black mb-3 md:mb-4">{product.name}</h1>
          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-brand-black mb-2">Descripción</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          )}
          <div className="mb-4">
            <p className="text-2xl md:text-3xl font-bold text-brand-black">
              {formatCurrency(product.price)}
              <span className="ml-2 text-sm md:text-base font-medium text-gray-500">COP</span>
            </p>
            <p className="mt-1 text-xs text-gray-500">Impuestos incluidos. Envíos a todo Colombia.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <WhatsAppButton product={uiProduct} />
            <AddToCartButton product={uiProduct} />
          </div>
          <div className="mt-6 text-sm text-gray-600">
            <p>
              ¿Dudas sobre tallas o colores? Escríbenos por WhatsApp y te asesoramos.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
