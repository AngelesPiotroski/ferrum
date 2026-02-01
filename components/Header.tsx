'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiSearch, FiPhone, FiMapPin } from 'react-icons/fi'

interface SiteConfig {
  logo?: string
  phone?: string
  address?: string
}

export default function Header() {
  const [config, setConfig] = useState<SiteConfig>({})
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => setConfig(data))
      .catch(console.error)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/?search=${encodeURIComponent(searchQuery)}`
    }
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            {config.logo ? (
              <img src={config.logo} alt="Logo" className="h-12" />
            ) : (
              <h1 className="text-2xl font-bold text-primary-600">
                Ferretería
              </h1>
            )}
          </Link>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl w-full">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar productos..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <FiSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </form>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm">
            {config.phone && (
              <a
                href={`tel:${config.phone}`}
                className="flex items-center gap-2 text-gray-700 hover:text-primary-600"
              >
                <FiPhone />
                <span>{config.phone}</span>
              </a>
            )}
            {config.address && (
              <div className="flex items-center gap-2 text-gray-700">
                <FiMapPin />
                <span>{config.address}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
