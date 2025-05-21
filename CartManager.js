// CartManager.js
const Cart = require('./models/Cart');

class CartManager {
    // Crea un nuevo carrito
    async createCart() {
        try {
            const newCart = new Cart({ products: [] });
            await newCart.save();
            console.log('Carrito creado con ID:', newCart._id);
            return newCart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            throw error;
        }
    }

    // Obtiene un carrito por ID con populate
    async getCartById(cid) {
        try {
            const cart = await Cart.findById(cid).populate('products.product');
            if (!cart) {
                console.log('Carrito no encontrado');
                return null;
            }
            return cart;
        } catch (error) {
            console.error('Error al obtener carrito por ID:', error);
            return null;
        }
    }

    // Agrega un producto al carrito
    async addProductToCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                console.log('Carrito no encontrado');
                return null;
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            await cart.save();
            console.log('Producto agregado al carrito');
            return cart;
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            throw error;
        }
    }

    // Elimina un producto del carrito
    async deleteProductFromCart(cid, pid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                console.log('Carrito no encontrado');
                return null;
            }

            cart.products = cart.products.filter(p => p.product.toString() !== pid);
            await cart.save();
            console.log('Producto eliminado del carrito');
            return cart;
        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            throw error;
        }
    }

    // Actualiza todos los productos del carrito
    async updateCart(cid, products) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                console.log('Carrito no encontrado');
                return null;
            }

            cart.products = products;
            await cart.save();
            console.log('Carrito actualizado');
            return cart;
        } catch (error) {
            console.error('Error al actualizar carrito:', error);
            throw error;
        }
    }

    // Actualiza la cantidad de un producto
    async updateProductQuantity(cid, pid, quantity) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                console.log('Carrito no encontrado');
                return null;
            }

            const productIndex = cart.products.findIndex(p => p.product.toString() === pid);
            if (productIndex >= 0) {
                cart.products[productIndex].quantity = quantity;
                await cart.save();
                console.log('Cantidad actualizada');
                return cart;
            } else {
                console.log('Producto no encontrado en el carrito');
                return null;
            }
        } catch (error) {
            console.error('Error al actualizar cantidad:', error);
            throw error;
        }
    }

    // Elimina todos los productos del carrito
    async clearCart(cid) {
        try {
            const cart = await Cart.findById(cid);
            if (!cart) {
                console.log('Carrito no encontrado');
                return null;
            }

            cart.products = [];
            await cart.save();
            console.log('Carrito vaciado');
            return cart;
        } catch (error) {
            console.error('Error al vaciar carrito:', error);
            throw error;
        }
    }
}

module.exports = CartManager;