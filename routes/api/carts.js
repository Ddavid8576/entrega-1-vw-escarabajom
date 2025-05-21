// routes/api/carts.js
const express = require('express');
const router = express.Router();
const CartManager = require('../../CartManager');

const cartManager = new CartManager();

// Crear un carrito
router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart();
        res.status(201).json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al crear carrito' });
    }
});

// Agregar producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity } = req.body;
        const cart = await cartManager.addProductToCart(cid, pid, quantity);
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: error.message });
    }
});

// Obtener carrito
router.get('/:cid', async (req, res) => {
    try {
        const cart = await cartManager.getCartById(req.params.cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Carrito no encontrado' });
        }
        res.json({ status: 'success', payload: cart });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener carrito' });
    }
});

module.exports = router;