// public/js/main.js
async function addToCart(productId) {
    try {
        // Obtener o crear un carrito
        let cartId = localStorage.getItem('cartId');
        if (!cartId) {
            const response = await fetch('/api/carts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();
            if (result.status === 'success') {
                cartId = result.payload._id;
                localStorage.setItem('cartId', cartId);
            } else {
                throw new Error('Error al crear carrito');
            }
        }

        // Agregar producto al carrito
        const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ quantity: 1 })
        });

        if (response.ok) {
            alert('Producto agregado al carrito');
            window.location.href = `/carts/${cartId}`; // Redirigir al carrito
        } else {
            const error = await response.json();
            throw new Error(error.message || 'Error al agregar producto');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error al agregar producto: ${error.message}`);
    }
}