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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} className="w-full h-auto max-h-[480px] object-contain" />
          ) : (
            <div className="w-full h-64 bg-brand-rose/10 rounded-lg" />
          )}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-brand-black mb-3">{product.name}</h1>
          {product.category && (
            <p className="text-sm text-brand-rose mb-2">Categoría: {product.category}</p>
          )}
          {product.description && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-brand-black mb-2">Descripción</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{product.description}</p>
            </div>
          )}
          <p className="text-2xl font-semibold text-brand-black mb-6">{formatCurrency(product.price)}</p>
          <div className="flex flex-wrap gap-2">
            <WhatsAppButton product={uiProduct} />
            <AddToCartButton product={uiProduct} />
          </div>
        </div>
      </div>
    </div>
  )
}
