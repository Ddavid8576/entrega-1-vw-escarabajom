const ProductManager = require('./ProductManager');
const CartManager = require('./CartManager');

// Crear instancias
const productManager = new ProductManager();
const cartManager = new CartManager();

// Agregar productos (repuestos VW Escarabajo)
productManager.addProduct({
    title: "Carburador VW Escarabajo",
    description: "Carburador original para modelos 1960-1979",
    price: 150,
    thumbnail: "carburador.jpg",
    code: "CARB001",
    stock: 10
});

productManager.addProduct({
    title: "Llantas Clásicas",
    description: "Juego de 4 llantas estilo original",
    price: 300,
    thumbnail: "llantas.jpg",
    code: "LLAN002",
    stock: 5
});

productManager.addProduct({
    title: "Bujías NGK",
    description: "Juego de 4 bujías para VW Escarabajo",
    price: 20,
    thumbnail: "bujias.jpg",
    code: "BUJ003",
    stock: 20
});

// Listar productos
console.log("Todos los productos:");
console.log(productManager.getProducts());

// Actualizar un producto
productManager.updateProduct(1, { price: 160, stock: 8 });
console.log("Producto actualizado:");
console.log(productManager.getProductById(1));

// Eliminar un producto
productManager.deleteProduct(2);

// Listar productos después de eliminar
console.log("Productos después de eliminar:");
console.log(productManager.getProducts());

// Crear un carrito
cartManager.createCart();

// Agregar productos al carrito
cartManager.addProductToCart(1, 1); // Carburador
cartManager.addProductToCart(1, 1); // Carburador (incrementa cantidad)
cartManager.addProductToCart(1, 3); // Bujías

// Mostrar carrito
console.log("Carrito con ID 1:");
console.log(cartManager.getCartById(1));