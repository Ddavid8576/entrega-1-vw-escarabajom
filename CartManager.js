const FileManager = require('./FileManager');

class CartManager {
    constructor() {
        this.fileManager = new FileManager('carts.json');
    }

    // Crea un nuevo carrito
    async createCart() {
        try {
            const carts = await this.fileManager.readFile();
            const newId = carts.length > 0 ? carts[carts.length - 1].id + 1 : 1;

            const newCart = {
                id: newId,
                products: []
            };

            carts.push(newCart);
            await this.fileManager.writeFile(carts);
            console.log('Carrito creado con ID:', newId);
            return newCart;
        } catch (error) {
            console.error('Error al crear carrito:', error);
            return null;
        }
    }

    // Obtiene un carrito por ID
    async getCartById(cid) {
        try {
            const carts = await this.fileManager.readFile();
            const cart = carts.find(c => c.id === cid);
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
            const carts = await this.fileManager.readFile();
            const cartIndex = carts.findIndex(c => c.id === cid);

            if (cartIndex === -1) {
                console.log('Carrito no encontrado');
                return;
            }

            const cart = carts[cartIndex];
            const productInCart = cart.products.find(p => p.product === pid);

            if (productInCart) {
                productInCart.quantity += 1;
            } else {
                cart.products.push({ product: pid, quantity: 1 });
            }

            await this.fileManager.writeFile(carts);
            console.log('Producto agregado al carrito');
        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }
    }
}

module.exports = CartManager;