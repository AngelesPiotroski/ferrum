# Ferretería Landing Page

Sistema completo de gestión para una ferretería con landing page pública y panel de administración.

## Características

### Para Clientes
- Landing page pública con catálogo de productos
- Búsqueda de productos por nombre
- Filtrado por categorías (cocina, baño, herramientas, caños, etc.)
- Visualización de precios y detalles de productos
- Diseño responsive y moderno

### Para Administradores y Vendedores
- Sistema de autenticación seguro
- Gestión completa de productos (crear, editar, eliminar)
- Gestión de categorías
- Búsqueda de productos con información de stock
- Edición de precios y stock
- Gestión de imágenes de productos
- Configuración del sitio (logo, teléfono, dirección, redes sociales)

## Tecnologías

- **Next.js 14** - Framework React con App Router
- **TypeScript** - Tipado estático
- **Prisma** - ORM para base de datos
- **SQLite** - Base de datos (fácil de migrar a PostgreSQL)
- **NextAuth.js** - Autenticación
- **Tailwind CSS** - Estilos
- **React Icons** - Iconos

## Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar la base de datos:
```bash
npx prisma generate
npx prisma db push
```

3. Crear un usuario administrador inicial:
```bash
npx prisma studio
```
O crear un script de inicialización (ver más abajo)

4. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

5. Abrir [http://localhost:3000](http://localhost:3000)

## Crear Usuario Administrador

Puedes crear un usuario administrador usando Prisma Studio o creando un script:

```typescript
// scripts/create-admin.ts
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@ferreteria.com',
      password: hashedPassword,
      name: 'Administrador',
      role: 'admin',
    },
  })
  
  console.log('Admin creado:', admin)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

Ejecutar con:
```bash
npx ts-node scripts/create-admin.ts
```

## Estructura del Proyecto

```
ferreteria-landing/
├── app/
│   ├── admin/          # Panel de administración
│   ├── api/            # API routes
│   ├── producto/       # Página de detalle de producto
│   └── page.tsx        # Landing page pública
├── components/         # Componentes reutilizables
├── lib/               # Utilidades y configuración
├── prisma/            # Esquema de base de datos
└── public/            # Archivos estáticos
```

## Categorías Predefinidas

Puedes crear categorías como:
- Cocina
- Baño
- Herramientas
- Caños y Accesorios
- Electricidad
- Pintura
- Jardín
- Y más...

## Notas

- Las imágenes se almacenan como URLs. Para producción, considera usar un servicio de almacenamiento como Cloudinary o AWS S3.
- La base de datos SQLite es perfecta para desarrollo. Para producción, considera migrar a PostgreSQL.
- Asegúrate de cambiar las contraseñas por defecto en producción.

## Licencia

MIT
