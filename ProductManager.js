const FileManager = require('./FileManager');

class ProductManager {
    constructor() {
        this.fileManager = new FileManager('products.json');
    }

    // Lista todos los productos
    async getProducts() {
        try {
            return await this.fileManager.readFile();
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return [];
        }
    }

    // Busca un producto por ID
    async getProductById(pid) {
        try {
            const products = await this.fileManager.readFile();
            const product = products.find(p => p.id === pid);
            if (!product) {
                console.log('Producto no encontrado');
                return null;
            }
            return product;
        } catch (error) {
            console.error('Error al buscar producto por ID:', error);
            return null;
        }
    }

    // Agrega un nuevo producto
    async addProduct(product) {
        try {
            const products = await this.fileManager.readFile();

            // Verifica si el código ya existe
            if (products.some(p => p.code === product.code)) {
                console.log('Error: El código ya existe');
                return;
            }

            // Genera un nuevo ID
            const newId = products.length > 0 ? products[products.length - 1].id + 1 : 1;

            const newProduct = {
                id: newId,
                title: product.title,
                description: product.description,
                price: product.price,
                thumbnail: product.thumbnail,
                code: product.code,
                stock: product.stock
            };

            products.push(newProduct);
            await this.fileManager.writeFile(products);
            console.log('Producto agregado:', newProduct.title);
        } catch (error) {
            console.error('Error al agregar producto:', error);
        }
    }

    // Actualiza un producto
    async updateProduct(pid, updateFields) {
        try {
            const products = await this.fileManager.readFile();
            const productIndex = products.findIndex(p => p.id === pid);

            if (productIndex === -1) {
                console.log('Producto no encontrado para actualizar');
                return;
            }

            products[productIndex] = {
                ...products[productIndex],
                ...updateFields,
                id: products[productIndex].id
            };

            await this.fileManager.writeFile(products);
            console.log('Producto actualizado');
        } catch (error) {
            console.error('Error al actualizar producto:', error);
        }
    }

    // Elimina un producto
    async deleteProduct(pid) {
        try {
            const products = await this.fileManager.readFile();
            const productIndex = products.findIndex(p => p.id === pid);

            if (productIndex === -1) {
                console.log('Producto no encontrado para eliminar');
                return;
            }

            products.splice(productIndex, 1);
            await this.fileManager.writeFile(products);
            console.log('Producto eliminado');
        } catch (error) {
            console.error('Error al eliminar producto:', error);
        }
    }
}

module.exports = ProductManager;