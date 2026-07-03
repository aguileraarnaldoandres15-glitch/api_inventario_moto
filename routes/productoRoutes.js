const express = require('express');
const router = express.Router();
const Producto = require('../models/Producto');

// Crear producto (POST)
router.post('/', async (req, res) => {
    try {
        const nuevoProducto = new Producto(req.body);
        await nuevoProducto.save();
        res.status(201).json(nuevoProducto);
    } catch (error) {
        res.status(400).json({ mensaje: 'Error al guardar', error });
    }
});

// Obtener todos (GET)
router.get('/', async (req, res) => {
    try {
        const productos = await Producto.find().populate('proveedor'); // El populate trae los datos del proveedor referenciado
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener', error });
    }
});

// Endpoint de negocio: Bajo stock
router.get('/bajostock/:cantidad', async (req, res) => {
    try {
        const limite = parseInt(req.params.cantidad);
        const productosBajoStock = await Producto.find({ stock: { $lt: limite } });
        res.status(200).json(productosBajoStock);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en la búsqueda', error });
    }
});

// Endpoint de negocio: Actualizar stock masivo
router.put('/actualizar-stock', async (req, res) => {
    try {
        const actualizaciones = req.body;
        for (let item of actualizaciones) {
            await Producto.findByIdAndUpdate(item.id, { stock: item.nuevoStock });
        }
        res.status(200).json({ mensaje: 'Stock actualizado masivamente con éxito' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error en actualización masiva', error });
    }
});

// Obtener por ID
router.get('/:id', async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id).populate('proveedor');
        if (!producto) return res.status(404).json({ mensaje: 'No encontrado' });
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar', error });
    }
});

// Actualizar por ID
router.put('/:id', async (req, res) => {
    try {
        const actualizado = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!actualizado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.status(200).json(actualizado);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error });
    }
});

// Eliminar por ID
router.delete('/:id', async (req, res) => {
    try {
        const eliminado = await Producto.findByIdAndDelete(req.params.id);
        if (!eliminado) return res.status(404).json({ mensaje: 'No encontrado' });
        res.status(200).json({ mensaje: 'Eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error });
    }
});

module.exports = router;