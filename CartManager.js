// CartManager.js
const Cart = require('./models/Cart');

class CartManager {
    async createCart() {
        try {
            const cart = new Cart({ products: [] });
            await cart.save();
            return cart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            throw error;
        }
    }

    async getCartById(cid) {
        try {
            const cart = await Cart.findById(cid).populate('products.product').lean();
            return cart;
        } catch (error) {
            console.error('Error al obtener carrito:', error);
            throw error;
        }
    }

    async addProductToCart(cid, pid, quantity = 1) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) throw new Error('Carrito no encontrado');

            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += quantity;
            } else {
                cart.products.push({ product: pid, quantity });
            }

            await cart.save();
            return await Cart.findById(cid).populate('products.product').lean();
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }
}

module.exports = CartManager;