# Guía de Instalación Rápida

## Pasos para iniciar el proyecto

### 1. Instalar dependencias
```bash
cd ferreteria-landing
npm install
```

### 2. Configurar la base de datos
```bash
# Generar el cliente de Prisma
npx prisma generate

# Crear la base de datos y aplicar el esquema
npx prisma db push
```

### 3. Crear usuario administrador

Opción A - Usando el script:
```bash
npx ts-node scripts/create-admin.ts
```

O con parámetros personalizados:
```bash
npx ts-node scripts/create-admin.ts admin@ferreteria.com miPassword123 Administrador
```

Opción B - Usando Prisma Studio:
```bash
npx prisma studio
```
Luego crear manualmente un usuario en la tabla `User` con:
- email: tu email
- password: hash bcrypt de tu contraseña (puedes usar un generador online)
- name: tu nombre
- role: "admin" o "vendedor"

### 4. Iniciar el servidor
```bash
npm run dev
```

### 5. Acceder a la aplicación
- **Landing pública**: http://localhost:3000
- **Panel de admin**: http://localhost:3000/admin
- **Login**: http://localhost:3000/admin/login

## Primeros pasos después de la instalación

1. **Iniciar sesión** en el panel de administración
2. **Crear categorías** (ej: Cocina, Baño, Herramientas, Caños, etc.)
3. **Agregar productos** a cada categoría
4. **Configurar el sitio** (logo, teléfono, dirección) en la sección de Configuración

## Notas importantes

- El archivo `.env.local` ya está configurado para desarrollo
- En producción, cambia `NEXTAUTH_SECRET` por una clave segura
- La base de datos SQLite se crea automáticamente en `prisma/dev.db`
- Para producción, considera migrar a PostgreSQL
