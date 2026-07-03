const express = require('express');
const conectarBD = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const puerto = 3000;

// Conectar a la Base de Datos
conectarBD();

// Middleware
app.use(express.json());

// Redirección de rutas principales
app.use('/productos', productoRoutes);

// Ruta raíz de cortesía
app.get('/', (req, res) => {
    res.send('Servidor modular de repuestos de motos funcionando.');
});

app.listen(puerto, () => {
    console.log(`Servidor corriendo con nodemon en el puerto ${puerto}`);
});