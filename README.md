# Sistema de Bebidas

Aplicación web para gestión de inventario de bebidas y menú público con backend en Node.js/Express.

## Características

- **Gestión de inventario**: CRUD completo para bebidas con categorías, precios y stock
- **Múltiples sucursales**: Soporte para sucursales con usuarios diferentes
- **Panel de administración**: Autenticación con roles (Maitré, Capitan)
- **Menú público**: Vista filtrada de productos disponibles

## Tecnologías

- **Backend**: Node.js, Express 5.x
- **Frontend**: HTML, CSS, JavaScript puro
- **Almacenamiento**: Datos en memoria (array)

## Paso a paso

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