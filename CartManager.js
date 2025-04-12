const fs = require('fs');

class CartManager {
    constructor() {
        this.path = './carts.json';
        // Si el archivo no existe, lo creamos con un arreglo vacío
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    // Lee los carritos del archivo
    readCarts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Error al leer carritos:", error);
            return [];
        }
    }

    // Guarda los carritos en el archivo
    writeCarts(carts) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(carts, null, 2));
        } catch (error) {
            console.log("Error al guardar carritos:", error);
        }
    }

    // Crea un nuevo carrito
    createCart() {
        const carts = this.readCarts();
        const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

        const newCart = {
            id: newId,
            products: []
        };

        carts.push(newCart);
        this.writeCarts(carts);
        console.log("Carrito creado con ID:", newId);
        return newCart;
    }

    // Obtiene un carrito por ID
    getCartById(cid) {
        const carts = this.readCarts();
        const cart = carts.find(c => c.id === cid);
        if (!cart) {
            console.log("Carrito no encontrado");
            return null;
        }
        return cart;
    }

    // Agrega un producto al carrito
    addProductToCart(cid, pid) {
        const carts = this.readCarts();
        const cartIndex = carts.findIndex(c => c.id === cid);

        if (cartIndex === -1) {
            console.log("Carrito no encontrado");
            return;
        }

        const cart = carts[cartIndex];
        const productInCart = cart.products.find(p => p.product === pid);

        if (productInCart) {
            // Si el producto ya está, incrementa la cantidad
            productInCart.quantity += 1;
        } else {
            // Si no está, lo agrega con cantidad 1
            cart.products.push({ product: pid, quantity: 1 });
        }

        this.writeCarts(carts);
        console.log("Producto agregado al carrito");
    }
}

module.exports = CartManager;