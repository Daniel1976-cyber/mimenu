# Sistema de Bebidas

Aplicación web para gestión de inventario de bebidas y menú público.

## Características

- **Gestión de inventario**: CRUD completo para bebidas con categorías, precios y stock
- **Múltiples sucursales**: Soporte para sucursales con usuarios diferentes
- **Panel de administración**: Autenticación con roles (Maitré, Capitán)
- **Menú público**: Vista filtrada de productos disponibles

## Tecnologías.

- **Backend**: Node.js, Express 5.x
- **Frontend**: HTML, CSS, JavaScript puro
- **Almacenamiento**: Datos en memoria

## Despliegue en Vercel (sin base de datos)

Para desplegar sin configurar Supabase, renombra `server.js` a `index.js`:

```bash
mv api/server.js api/index.js
```

Luego haz deploy normalmente.

## Despliegue con Supabase (bases de datos)

1. Crea un proyecto en Supabase
2. Crea la tabla `beverages` con columnas:
   - id (integer, autoincrement)
   - name (text)
   - unit (text)
   - priceUSD (float, nullable)
   - priceCUP (integer)
   - category (text)
   - active (boolean)
   - stock (integer)

3. Agrega variables de entorno en Vercel:
   - `SUPABASE_URL` - URL de tu proyecto Supabase
   - `SUPABASE_ANON_KEY` - Key de acceso anónimo

4. Asegúrate de que `api/index.js` esté activo (usa Supabase)

## Paso a paso local

### 1. Instalar dependencias

```bash
npm install
cd api && npm install
```

### 2. Iniciar el servidor

```bash
npm run dev        # Desarrollo (con nodemon)
# o
npm start          # Producción
```

### 3. Acceder a la aplicación

- **Frontend**: http://localhost:3000
- **API**: http://localhost:3000/api/beverages
- **Admin**: http://localhost:3000/login.html

### 4. Credenciales de admin

| Sucursal | Usuario | Contraseña |
|----------|---------|------------|
| Snack Bar Cuba Cuba | Maitré | hotel2026 |
| Snack Bar Cuba Cuba | Capitán | capitan2026 |
| Bar Ranchon Santa Clara | Maitré | ranchon2026 |
| Bar Ranchon Santa Clara | Capitán | capitan2026 |

## APIs

- `GET /api/beverages` - Listar todas las bebidas
- `GET /api/beverages/menu` - Menú público (activos con stock)
- `GET /api/beverages/:id` - Obtener bebida específica
- `POST /api/beverages` - Crear bebida
- `PUT /api/beverages/:id` - Actualizar bebida
- `PATCH /api/beverages/:id/toggle` - Activar/desactivar
- `PATCH /api/beverages/:id/stock` - Actualizar stock
- `DELETE /api/beverages/:id` - Eliminar bebida
- `GET /api/categories` - Listar categorías
- `GET /api/stats` - Estadísticas del inventario