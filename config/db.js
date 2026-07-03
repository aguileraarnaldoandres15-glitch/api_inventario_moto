const mongoose = require('mongoose');

const conectarBD = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/inventario-motos');
        console.log('Conectado a la base de datos MongoDB local');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
        process.exit(1); // Detiene la app si no se puede conectar
    }
};

module.exports = conectarBD;