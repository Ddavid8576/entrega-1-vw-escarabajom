// models/Product.js
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    thumbnail: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true, default: 'repuestos' },
    status: { type: Boolean, required: true, default: true }
});

// Aplicar el plugin de paginación
productSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Product', productSchema);