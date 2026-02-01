'use client'

import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  image?: string
  category: {
    name: string
    slug: string
  }
}

interface ProductCardProps {
  product: Product
  showStock?: boolean
}

export default function ProductCard({ product, showStock = false }: ProductCardProps) {
  return (
    <Link href={`/producto/${product.id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <div className="relative h-48 bg-gray-200">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              Sin imagen
            </div>
          )}
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-2 line-clamp-2">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-4">
            <span className="text-2xl font-bold text-primary-600">
              ${product.price.toLocaleString('es-AR')}
            </span>
            {showStock && (
              <span
                className={`px-2 py-1 rounded text-xs ${
                  product.stock > 0
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                Stock: {product.stock}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500 mt-2 block">
            {product.category.name}
          </span>
        </div>
      </div>
    </Link>
  )
}
