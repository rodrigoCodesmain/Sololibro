const mysql = require('mysql2/promise');

const connectDB = async () => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',      // Dirección del servidor
            user: 'root',           // Usuario MySQL
            password: '',           // Contraseña del usuario
            database: 'sololibro',  // Base de datos
        });
        console.log("Conectado a la base de datos MySQL");
        return connection;
    } catch (error) {
        console.error("No se pudo conectar a MySQL", error);
        process.exit(1); // Termina el proceso si la conexión falla
    }
};

module.exports = connectDB;
