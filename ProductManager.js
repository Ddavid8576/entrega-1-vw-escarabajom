// ProductManager.js
const Product = require('./models/Product');

class ProductManager {
    // Lista productos con filtros, paginación y ordenamiento
    async getProducts({ limit = 10, page = 1, sort, query } = {}) {
        try {
            let filter = {};
            if (query) {
                if (query.category) filter.category = query.category;
                if (query.status !== undefined) filter.status = query.status;
            }

            const options = {
                limit: parseInt(limit),
                page: parseInt(page),
                sort: sort ? { price: sort === 'asc' ? 1 : -1 } : undefined
            };

            const result = await Product.paginate(filter, options);

            return {
                status: 'success',
                payload: result.docs,
                totalPages: result.totalPages,
                prevPage: result.prevPage,
                nextPage: result.nextPage,
                page: result.page,
                hasPrevPage: result.hasPrevPage,
                hasNextPage: result.hasNextPage,
                prevLink: result.hasPrevPage ? `/api/products?limit=${limit}&page=${result.prevPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${JSON.stringify(query)}` : ''}` : null,
                nextLink: result.hasNextPage ? `/api/products?limit=${limit}&page=${result.nextPage}${sort ? `&sort=${sort}` : ''}${query ? `&query=${JSON.stringify(query)}` : ''}` : null
            };
        } catch (error) {
            console.error('Error al obtener productos:', error);
            return { status: 'error', payload: [], totalPages: 0, page: 1 };
        }
    }

    // Busca un producto por ID
    async getProductById(pid) {
        try {
            const product = await Product.findById(pid);
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
            const newProduct = new Product(product);
            await newProduct.save();
            console.log('Producto agregado:', newProduct.title);
            return newProduct;
        } catch (error) {
            console.error('Error al agregar producto:', error);
            throw error;
        }
    }

    // Actualiza un producto
    async updateProduct(pid, updateFields) {
        try {
            const product = await Product.findByIdAndUpdate(pid, updateFields, { new: true });
            if (!product) {
                console.log('Producto no encontrado para actualizar');
                return null;
            }
            console.log('Producto actualizado');
            return product;
        } catch (error) {
            console.error('Error al actualizar producto:', error);
            throw error;
        }
    }

    // Elimina un producto
    async deleteProduct(pid) {
        try {
            const product = await Product.findByIdAndDelete(pid);
            if (!product) {
                console.log('Producto no encontrado para eliminar');
                return null;
            }
            console.log('Producto eliminado');
            return product;
        } catch (error) {
            console.error('Error al eliminar producto:', error);
            throw error;
        }
    }
}

module.exports = ProductManager;