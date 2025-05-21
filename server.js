// server.js
const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');
const productRouter = require('./routes/api/products');
const cartRouter = require('./routes/api/carts');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conectar a MongoDB
mongoose.connect('mongodb+srv://denynsonmujica:mTK0D5HQlHEs9LMf@cluster0.rzrvg9v.mongodb.net/escarabajoDB?retryWrites=true&w=majority')
    .then(() => console.log('Conectado a MongoDB'))
    .catch(error => console.error('Error al conectar a MongoDB:', error));

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Instancias de managers
const productManager = new ProductManager();
const cartManager = new CartManager();

// Routers API
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Vista de productos con paginación
app.get('/products', async (req, res) => {
    try {
        const { limit, page, sort, category, status } = req.query;
        const query = { category, status };
        const products = await productManager.getProducts({ limit, page, sort, query });
        res.render('index', {
            products: products.payload,
            totalPages: products.totalPages,
            prevPage: products.prevPage,
            nextPage: products.nextPage,
            page: products.page,
            hasPrevPage: products.hasPrevPage,
            hasNextPage: products.hasNextPage
        });
    } catch (error) {
        console.error('Error al cargar productos:', error);
        res.status(500).send('Error al cargar productos');
    }
});

// Vista de producto individual
app.get('/products/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (!product) {
            return res.status(404).send('Producto no encontrado');
        }
        res.render('product', { product });
    } catch (error) {
        console.error('Error al cargar producto:', error);
        res.status(500).send('Error al cargar producto');
    }
});

// Vista de carrito
app.get('/carts/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }
        res.render('cart', { cart });
    } catch (error) {
        console.error('Error al cargar carrito:', error);
        res.status(500).send('Error al cargar carrito');
    }
});

// Mantener WebSockets para realTimeProducts
app.get('/realtimeproducts', async (req, res) => {
    try {
        const products = await productManager.getProducts();
        res.render('realTimeProducts', { products: products.payload });
    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
});

io.on('connection', (socket) => {
    console.log('Cliente conectado');

    productManager.getProducts().then(result => {
        socket.emit('updateProducts', result.payload);
    });

    socket.on('addProduct', async (productData) => {
        try {
            await productManager.addProduct(productData);
            const result = await productManager.getProducts();
            io.emit('updateProducts', result.payload);
        } catch (error) {
            socket.emit('error', 'Error al agregar producto');
        }
    });

    socket.on('deleteProduct', async (pid) => {
        try {
            await productManager.deleteProduct(pid);
            const result = await productManager.getProducts();
            io.emit('updateProducts', result.payload);
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