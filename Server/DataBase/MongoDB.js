const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://nachoski:mHM2exHZYhFTSCIO@cluster0.ocvfx.mongodb.net/Sololibro?retryWrites=true&w=majority');
        console.log('Conectado a la base de datos con Mongoose');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos con Mongoose', error);
        process.exit(1); // Detener la aplicación si no se puede conectar
    }
};

module.exports = connectDB;