// routes/api/carts.js
const express = require('express');
const router = express.Router();
const CartManager = require('../../CartManager');

const cartManager = new CartManager();

// POST /api/carts
router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al crear carrito' });
    }
});

// GET /api/carts/:cid
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener carrito' });
    }
});

// POST /api/carts/:cid/products/:pid
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await cartManager.addProductToCart(req.params.cid, req.params.pid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al agregar producto al carrito' });
    }
});

// DELETE /api/carts/:cid/products/:pid
router.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const cart = await cartManager.deleteProductFromCart(req.params.cid, req.params.pid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al eliminar producto del carrito' });
    }
});

// PUT /api/carts/:cid
router.put('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.updateCart(req.params.cid, req.body.products);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al actualizar carrito' });
    }
});

// PUT /api/carts/:cid/products/:pid
router.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { quantity } = req.body;
        const cart = await cartManager.updateProductQuantity(req.params.cid, req.params.pid, quantity);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito o producto no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al actualizar cantidad' });
    }
});

// DELETE /api/carts/:cid
router.delete('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.clearCart(req.params.cid);
        if (!cart) return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al vaciar carrito' });
    }
});

module.exports = router;