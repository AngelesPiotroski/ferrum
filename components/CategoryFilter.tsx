'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

interface Category {
  id: string
  name: string
  slug: string
  image?: string
  _count?: {
    products: number
  }
}

interface CategoryFilterProps {
  categories: Category[]
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const searchParams = useSearchParams()
  const activeCategory = searchParams.get('category')

  return (
    <div className="flex flex-wrap gap-2 mb-6">
      <Link
        href="/"
        className={`px-4 py-2 rounded-lg font-medium transition-colors ${
          !activeCategory
            ? 'bg-primary-600 text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        Todos
      </Link>
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/?category=${category.slug}`}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            activeCategory === category.slug
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {category.name}
          {category._count && (
            <span className="ml-2 text-xs opacity-75">
              ({category._count.products})
            </span>
          )}
        </Link>
      ))}
    </div>
  )
}
