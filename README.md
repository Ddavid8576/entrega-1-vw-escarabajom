# Entrega 1 - Gestión de Repuestos VW Escarabajo

Proyecto para gestionar productos y carritos en Node.js, con persistencia en archivos JSON.

## Archivos
- `ProductManager.js`: Maneja productos.
- `CartManager.js`: Maneja carritos.
- `index.js`: Pruebas.
- `products.json` y `carts.json`: Almacenan datos.

## Uso
```bash
node index.js

## Entrega 2
- Agregado Handlebars con vistas `home.handlebars` y `realTimeProducts.handlebars`.
- Implementado WebSockets con Socket.IO para actualización en tiempo real.
- Nueva estructura: carpetas `views` y `public`.
- Ejecutar el servidor:
  ```bash
  npm install
  node server.js
- Visitar http://localhost:8080 y http://localhost:8080/realtimeproducts.

