import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const configs = await prisma.siteConfig.findMany()
    const configMap: Record<string, any> = {}
    
    configs.forEach((config) => {
      if (config.type === 'image' || config.type === 'url') {
        configMap[config.key] = config.value
      } else {
        configMap[config.key] = config.value
      }
    })

    return NextResponse.json(configMap)
  } catch (error) {
    console.error('Error fetching config:', error)
    return NextResponse.json(
      { error: 'Error al obtener configuración' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json(
        { error: 'No autorizado' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { key, value, type = 'text' } = body

    if (!key || value === undefined) {
      return NextResponse.json(
        { error: 'Key y value son requeridos' },
        { status: 400 }
      )
    }

    const config = await prisma.siteConfig.upsert({
      where: { key },
      update: { value, type },
      create: { key, value, type },
    })

    return NextResponse.json(config)
  } catch (error: any) {
    console.error('Error updating config:', error)
    return NextResponse.json(
      { error: error.message || 'Error al actualizar configuración' },
      { status: 500 }
    )
  }
}
