const fs = require('fs');

class ProductManager {
    constructor() {
        this.path = './products.json';
        // Si el archivo no existe, lo creamos con un arreglo vacío
        if (!fs.existsSync(this.path)) {
            fs.writeFileSync(this.path, JSON.stringify([]));
        }
    }

    // Lee los productos del archivo
    readProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            console.log("Error al leer productos:", error);
            return [];
        }
    }

    // Guarda los productos en el archivo
    writeProducts(products) {
        try {
            fs.writeFileSync(this.path, JSON.stringify(products, null, 2));
        } catch (error) {
            console.log("Error al guardar productos:", error);
        }
    }

    // Lista todos los productos
    getProducts() {
        return this.readProducts();
    }

    // Busca un producto por ID
    getProductById(pid) {
        const products = this.readProducts();
        const product = products.find(p => p.id === pid);
        if (!product) {
            console.log("Producto no encontrado");
            return null;
        }
        return product;
    }

    // Agrega un nuevo producto
    addProduct(product) {
        const products = this.readProducts();
        
        // Verifica si el código ya existe
        if (products.some(p => p.code === product.code)) {
            console.log("Error: El código ya existe");
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
        this.writeProducts(products);
        console.log("Producto agregado:", newProduct.title);
    }

    // Actualiza un producto
    updateProduct(pid, updateFields) {
        const products = this.readProducts();
        const productIndex = products.findIndex(p => p.id === pid);

        if (productIndex === -1) {
            console.log("Producto no encontrado para actualizar");
            return;
        }

        // Actualiza solo los campos proporcionados, sin cambiar el ID
        products[productIndex] = {
            ...products[productIndex],
            ...updateFields,
            id: products[productIndex].id // Mantiene el ID original
        };

        this.writeProducts(products);
        console.log("Producto actualizado");
    }

    // Elimina un producto
    deleteProduct(pid) {
        const products = this.readProducts();
        const productIndex = products.findIndex(p => p.id === pid);

        if (productIndex === -1) {
            console.log("Producto no encontrado para eliminar");
            return;
        }

        products.splice(productIndex, 1);
        this.writeProducts(products);
        console.log("Producto eliminado");
    }
}

module.exports = ProductManager;