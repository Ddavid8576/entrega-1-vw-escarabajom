// server.js
const express = require('express');
const { engine } = require('express-handlebars');
const http = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const ProductManager = require('./ProductManager');
const productRouter = require('./routes/api/products');
const cartRouter = require('./routes/api/carts');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Conectar a MongoDB
mongoose.connect('mongodb+srv://denynsonmujica:mTK0D5HQlHEs9LMf@cluster0.rzrvg9v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(error => {
    console.error('Error al conectar a MongoDB:', error);
});

// Configurar Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Instancia de ProductManager
const productManager = new ProductManager();

// Routers API
app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

// Vista de productos con paginación
app.get('/products', async (req, res) => {
    try {
        const { limit, page, sort, category, status } = req.query;
        const query = {};
        if (category) query.category = category;
        if (status !== undefined) query.status = status === 'true';

        const result = await productManager.getProducts({ limit, page, sort, query });
        res.render('index', {
            products: result.payload,
            totalPages: result.totalPages,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            page: result.page,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevLink: result.prevLink,
            nextLink: result.nextLink
        });
    } catch (error) {
        res.status(500).send('Error al cargar productos');
    }
});

// Vista de producto individual
app.get('/products/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (!product) return res.status(404).send('Producto no encontrado');
        res.render('product', { product });
    } catch (error) {
        res.status(500).send('Error al cargar producto');
    }
});

// Vista de carrito
app.get('/carts/:cid', async (req, res) => {
    try {
        const cartManager = new CartManager();
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) return res.status(404).send('Carrito no encontrado');
        res.render('cart', { cart });
    } catch (error) {
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