const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
    stock: { type: Number, required: true },
    // REFERENCIACIÓN: Vinculamos el producto con un Proveedor por su ID
    proveedor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Proveedor',
        required: false // Lo dejamos opcional para las primeras pruebas
    }
});

module.exports = mongoose.model('Producto', productoSchema);