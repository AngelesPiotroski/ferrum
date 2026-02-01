'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useEffect } from 'react'
import { FiPackage, FiSettings, FiLogOut, FiHome, FiGrid } from 'react-icons/fi'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin" className="text-xl font-bold text-primary-600">
                Panel Admin
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                >
                  <FiPackage />
                  Productos
                </Link>
                <Link
                  href="/admin/categorias"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                >
                  <FiGrid />
                  Categorías
                </Link>
                <Link
                  href="/admin/config"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
                >
                  <FiSettings />
                  Configuración
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100"
              >
                <FiHome />
                Ver sitio
              </Link>
              <span className="text-sm text-gray-600">
                {(session.user as any)?.name}
              </span>
              <button
                onClick={() => signOut({ callbackUrl: '/admin/login' })}
                className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 text-red-600"
              >
                <FiLogOut />
                Salir
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
