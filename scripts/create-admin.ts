import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = process.argv[2] || 'admin@ferreteria.com'
  const password = process.argv[3] || 'admin123'
  const name = process.argv[4] || 'Administrador'

  const hashedPassword = await bcrypt.hash(password, 10)
  
  try {
    const admin = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: 'admin',
      },
    })
    
    console.log('✅ Usuario administrador creado exitosamente:')
    console.log(`   Email: ${admin.email}`)
    console.log(`   Nombre: ${admin.name}`)
    console.log(`   Rol: ${admin.role}`)
  } catch (error: any) {
    if (error.code === 'P2002') {
      console.log('⚠️  El usuario ya existe')
    } else {
      console.error('❌ Error:', error.message)
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
