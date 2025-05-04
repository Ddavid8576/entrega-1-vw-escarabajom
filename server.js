const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const ProductManager = require('./ProductManager');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware para archivos estáticos (como CSS o JS del frontend)
app.use(express.static('public'));

// Instancia de ProductManager
const productManager = new ProductManager();

// Ruta para la vista home
app.get('/', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('home', { products });
    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
});

// Ruta para la vista realTimeProducts
app.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products });
    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
});

// Manejo de conexiones WebSocket
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Enviar lista inicial de productos al cliente
    productManager.getProducts().then(products => {
        socket.emit('updateProducts', products);
    });

    // Manejar creación de producto
    socket.on('addProduct', async (productData) => {
        try {
            await productManager.addProduct(productData);
            const products = await productManager.getProducts();
            io.emit('updateProducts', products); // Actualizar todos los clientes
        } catch (error) {
            socket.emit('error', 'Error al agregar producto');
        }
    });

    // Manejar eliminación de producto
    socket.on('deleteProduct', async (pid) => {
        try {
            await productManager.deleteProduct(parseInt(pid));
            const products = await productManager.getProducts();
            io.emit('updateProducts', products); // Actualizar todos los clientes
        } catch (error) {
            socket.emit('error', 'Error al eliminar producto');
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// Iniciar el servidor
const PORT = 8080;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});