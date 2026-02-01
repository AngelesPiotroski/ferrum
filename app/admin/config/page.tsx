'use client'

import { useState, useEffect } from 'react'
import { FiSave } from 'react-icons/fi'

interface Config {
  logo?: string
  phone?: string
  address?: string
  email?: string
  facebook?: string
  instagram?: string
}

export default function AdminConfigPage() {
  const [config, setConfig] = useState<Config>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchConfig()
  }, [])

  const fetchConfig = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/config')
      const data = await res.json()
      setConfig(data)
    } catch (error) {
      console.error('Error fetching config:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const configEntries = [
        { key: 'logo', value: config.logo || '', type: 'image' },
        { key: 'phone', value: config.phone || '', type: 'text' },
        { key: 'address', value: config.address || '', type: 'text' },
        { key: 'email', value: config.email || '', type: 'text' },
        { key: 'facebook', value: config.facebook || '', type: 'url' },
        { key: 'instagram', value: config.instagram || '', type: 'url' },
      ]

      await Promise.all(
        configEntries.map((entry) =>
          fetch('/api/config', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(entry),
          })
        )
      )

      alert('Configuración guardada exitosamente')
    } catch (error) {
      console.error('Error saving config:', error)
      alert('Error al guardar configuración')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Configuración del Sitio</h1>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          <FiSave />
          {saving ? 'Guardando...' : 'Guardar Cambios'}
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            URL del Logo
          </label>
          <input
            type="url"
            value={config.logo || ''}
            onChange={(e) => setConfig({ ...config, logo: e.target.value })}
            placeholder="https://ejemplo.com/logo.png"
            className="w-full px-3 py-2 border rounded-md"
          />
          {config.logo && (
            <div className="mt-2">
              <img
                src={config.logo}
                alt="Logo preview"
                className="h-20 object-contain"
                onError={(e) => {
                  ;(e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Teléfono</label>
          <input
            type="text"
            value={config.phone || ''}
            onChange={(e) => setConfig({ ...config, phone: e.target.value })}
            placeholder="+54 11 1234-5678"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Dirección</label>
          <textarea
            value={config.address || ''}
            onChange={(e) => setConfig({ ...config, address: e.target.value })}
            placeholder="Calle 123, Ciudad, Provincia"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={config.email || ''}
            onChange={(e) => setConfig({ ...config, email: e.target.value })}
            placeholder="contacto@ferreteria.com"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Facebook (URL)
          </label>
          <input
            type="url"
            value={config.facebook || ''}
            onChange={(e) =>
              setConfig({ ...config, facebook: e.target.value })
            }
            placeholder="https://facebook.com/ferreteria"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Instagram (URL)
          </label>
          <input
            type="url"
            value={config.instagram || ''}
            onChange={(e) =>
              setConfig({ ...config, instagram: e.target.value })
            }
            placeholder="https://instagram.com/ferreteria"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  )
}
