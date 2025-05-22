# Proyecto Escarabajo - Gestión de Repuestos VW Escarabajo

Este proyecto es parte del curso de Backend, diseñado para gestionar repuestos de autos VW Escarabajo usando Node.js, MongoDB, Express, Handlebars, y WebSockets.

Entrega Final: MongoDB y APIs Avanzadas
Descripción
Actualiza la persistencia a MongoDB, implementa endpoints avanzados para productos y carritos, y mejora las vistas con paginación y detalles.
Estructura
models/: Product.js, Cart.js (esquemas Mongoose).

routes/api/: products.js, carts.js (endpoints API).

views/: Nuevas vistas product.handlebars, cart.handlebars.

server.js: Integra MongoDB, Express, Handlebars, Socket.IO.

Archivos de entregas anteriores se reutilizan o actualizan.

Dependencias
express, express-handlebars, socket.io

mongoose, mongoose-paginate-v2

Endpoints
Productos:
GET /api/products: Lista con filtros (limit, page, sort, category, status).

GET /api/products/:pid, POST /api/products, PUT /api/products/:pid, DELETE /api/products/:pid.

Carritos:
POST /api/carts, GET /api/carts/:cid, POST /api/carts/:cid/products/:pid.

DELETE /api/carts/:cid/products/:pid, PUT /api/carts/:cid, PUT /api/carts/:cid/products/:pid, DELETE /api/carts/:cid.

Vistas
/products: Lista de productos con paginación.

/products/:pid: Detalles de un producto.

/carts/:cid: Productos de un carrito específico.

/realtimeproducts: Lista dinámica con WebSockets.

Uso
Inicia el servidor:
bash

node server.js

Visita:
http://localhost:8080/products: Lista de productos.

http://localhost:8080/products/:pid: Detalles de producto.

http://localhost:8080/carts/:cid: Ver carrito.

http://localhost:8080/realtimeproducts: Gestión en tiempo real.

Notas
Usa MongoDB para persistencia.

Los endpoints soportan paginación, filtros, y ordenamiento.

Las vistas incluyen botones para agregar al carrito y enlaces para detalles.

## Requisitos
- Node.js (versión 16 o superior)
- MongoDB (Atlas o local)
- Navegador web

## Instalación
1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/proyecto-escarabajo.git

## Uso
node server.js



