'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import Header from '@/components/Header'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  image?: string
  images?: string
  sku?: string
  brand?: string
  category: {
    name: string
    slug: string
  }
}

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string)
    }
  }, [params.id])

  const fetchProduct = async (id: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/products/${id}`)
      if (res.ok) {
        const data = await res.json()
        setProduct(data)
      }
    } catch (error) {
      console.error('Error fetching product:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-96 bg-gray-200 rounded-lg mb-4" />
            <div className="h-8 bg-gray-200 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/" className="text-primary-600 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  const additionalImages = product.images
    ? JSON.parse(product.images)
    : []

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="relative h-96 bg-gray-200 rounded-lg mb-4">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Sin imagen
                  </div>
                )}
              </div>
              {additionalImages.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {additionalImages.map((img: string, idx: number) => (
                    <div
                      key={idx}
                      className="relative h-20 bg-gray-200 rounded"
                    >
                      <Image
                        src={img}
                        alt={`${product.name} ${idx + 1}`}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Link
                href={`/?category=${product.category.slug}`}
                className="text-primary-600 hover:underline text-sm mb-2 inline-block"
              >
                {product.category.name}
              </Link>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              {product.description && (
                <p className="text-gray-700 mb-6">{product.description}</p>
              )}

              <div className="mb-6">
                <span className="text-4xl font-bold text-primary-600">
                  ${product.price.toLocaleString('es-AR')}
                </span>
              </div>

              {product.sku && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>SKU:</strong> {product.sku}
                </p>
              )}

              {product.brand && (
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Marca:</strong> {product.brand}
                </p>
              )}

              <p className="text-sm text-gray-600 mb-6">
                <strong>Stock disponible:</strong>{' '}
                <span
                  className={product.stock > 0 ? 'text-green-600' : 'text-red-600'}
                >
                  {product.stock > 0 ? `${product.stock} unidades` : 'Sin stock'}
                </span>
              </p>

              <Link
                href="/"
                className="inline-block px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Volver a productos
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
