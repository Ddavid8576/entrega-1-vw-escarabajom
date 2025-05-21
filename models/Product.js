// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, default: 'repuestos' }, // Nueva propiedad
    status: { type: Boolean, required: true, default: true } // Nueva propiedad para disponibilidad
});

module.exports = mongoose.model('Product', productSchema);