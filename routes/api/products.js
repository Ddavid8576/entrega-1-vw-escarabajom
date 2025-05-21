// routes/api/products.js
const express = require('express');
const router = express.Router();
const ProductManager = require('../../ProductManager');

const productManager = new ProductManager();

// GET /api/products
router.get('/', async (req, res) => {
    try {
        const { limit, page, sort, category, status } = req.query;
        const query = {};
        if (category) query.category = category;
        if (status !== undefined) query.status = status === 'true';

        const result = await productManager.getProducts({ limit, page, sort, query });
        res.json(result);
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
    }
});

// GET /api/products/:pid
router.get('/:pid', async (req, res) => {
    try {
        const product = await productManager.getProductById(req.params.pid);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al obtener producto' });
    }
});

// POST /api/products
router.post('/', async (req, res) => {
    try {
        const product = await productManager.addProduct(req.body);
        res.status(201).json({ status: 'success', payload: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al agregar producto' });
    }
});

// PUT /api/products/:pid
router.put('/:pid', async (req, res) => {
    try {
        const product = await productManager.updateProduct(req.params.pid, req.body);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', payload: product });
    } catch (error) {
        res.status(400).json({ status: 'error', message: 'Error al actualizar producto' });
    }
});

// DELETE /api/products/:pid
router.delete('/:pid', async (req, res) => {
    try {
        const product = await productManager.deleteProduct(req.params.pid);
        if (!product) return res.status(404).json({ status: 'error', message: 'Producto no encontrado' });
        res.json({ status: 'success', message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al eliminar producto' });
    }
});

module.exports = router;