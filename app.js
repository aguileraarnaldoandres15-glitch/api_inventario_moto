// Cargar variables de entorno 
require('dotenv').config(); 

const express = require('express');
const cors = require('cors'); 
const conectarBD = require('./config/db');
const productoRoutes = require('./routes/productoRoutes');

const app = express();
const puerto = 3000;

// Conectar a MongoDB Atlas
conectarBD();

// Middlewares
app.use(cors()); // Permite que el frontend consulte esta API
app.use(express.json());

// Redirección de rutas principales 
app.use('/api/productos', productoRoutes);

// Ruta de prueba
app.get('/api/test', (req, res) => {
    res.send('La aplicación está funcionando correctamente conectada a Atlas');
});

// Arrancar el servidor
app.listen(puerto, () => {
    console.log(`Servidor corriendo en el puerto ${puerto}`);
});

// Exportamos la app para que Vercel la pueda leer
module.exports = app;