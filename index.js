const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');
const FileManager = require('./FileManager');

// Función para reiniciar los archivos JSON
async function resetFiles() {
    try {
        const productFileManager = new FileManager('products.json');
        const cartFileManager = new FileManager('carts.json');
        await productFileManager.writeFile([]);
        await cartFileManager.writeFile([]);
        console.log('Archivos JSON reiniciados');
    } catch (error) {
        console.error('Error al reiniciar archivos:', error);
        throw error;
    }
}

// Función principal
async function main() {
    try {
        // Reiniciar archivos
        await resetFiles();

        const productManager = new ProductManager();
        const cartManager = new CartManager();

        // Agregar productos
        await productManager.addProduct({
            title: 'Carburador VW Escarabajo',
            description: 'Carburador original para modelos 1960-1979',
            price: 150,
            thumbnail: 'carburador.jpg',
            code: 'CARB001',
            stock: 10
        });

        await productManager.addProduct({
            title: 'Llantas Clásicas',
            description: 'Juego de 4 llantas estilo original',
            price: 300,
            thumbnail: 'llantas.jpg',
            code: 'LLAN002',
            stock: 5
        });

        await productManager.addProduct({
            title: 'Bujías NGK',
            description: 'Juego de 4 bujías para VW Escarabajo',
            price: 20,
            thumbnail: 'bujias.jpg',
            code: 'BUJ003',
            stock: 20
        });

        // Listar productos
        console.log('Todos los productos:');
        console.log(await productManager.getProducts());

        // Actualizar un producto
        await productManager.updateProduct(1, { price: 160, stock: 8 });
        console.log('Producto actualizado:');
        console.log(await productManager.getProductById(1));

        // Eliminar un producto (usamos id: 2, que debería existir)
        await productManager.deleteProduct(2);

        // Listar productos después de eliminar
        console.log('Productos después de eliminar:');
        console.log(await productManager.getProducts());

        // Crear un carrito
        await cartManager.createCart();

        // Agregar productos al carrito
        await cartManager.addProductToCart(1, 1); // Carburador
        await cartManager.addProductToCart(1, 1); // Carburador (incrementa cantidad)
        await cartManager.addProductToCart(1, 3); // Bujías

        // Mostrar carrito
        console.log('Carrito con ID 1:');
        console.log(await cartManager.getCartById(1));
    } catch (error) {
        console.error('Error en la ejecución:', error);
    }
}

// Ejecutar la función principal
main();