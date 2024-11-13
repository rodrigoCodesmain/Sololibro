const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Sololibros', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Conectado a la base de datos con Mongoose');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos con Mongoose', error);
        process.exit(1); // Detener la aplicación si no se puede conectar
    }
};

module.exports = connectDB;