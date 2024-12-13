const connectDB = require('../DataBase/MySQLDB'); // Asegúrate de que la ruta sea correcta

let db; // Variable para almacenar la conexión

// Función para inicializar y retornar la conexión
const initializeDB = async () => {
    if (!db) {
        db = await connectDB(); // Conectar a la base de datos si no está inicializada
        console.log("Conexión a MySQL inicializada");
    }
    return db;
};
// Crear usuario
const CrearUsuarios = async (Body) => {
    try {
        const db = await initializeDB(); // Asegúrate de que la conexión se inicialice correctamente

        const [existingUser] = await db.query(
            "SELECT * FROM Usuarios WHERE nombre = ? OR email = ?",
            [Body.Nombre, Body.Email]
        );

        if (existingUser.length > 0) {
            const message = existingUser[0].nombre === Body.nombre
                ? "El nombre de usuario ya está ocupado"
                : "Este correo ya está en uso";
            return { success: false, message };
        }

        await db.query(
            "INSERT INTO Usuarios (nombre, email, contraseña) VALUES (?, ?, ?)",
            [Body.nombre, Body.email, Body.contraseña]
        );

        return { success: true, message: "Usuario agregado correctamente" };
    } catch (error) {
        console.error("Error al insertar usuario:", error);
        return { success: false, message: "Hubo un error al insertar el usuario. Por favor, inténtalo de nuevo más tarde." };
    }
};


// Función para verificar el usuario
const verificaciónUsuario = async (LBody) => {
    try {
        const db = await initializeDB(); // Garantiza que `db` esté inicializada
        const [rows] = await db.query(
            "SELECT * FROM Usuarios WHERE nombre = ? OR email = ?",
            [LBody.username, LBody.username]
        );

        if (rows.length === 0) {
            return { success: false, message: "El nombre de usuario o correo no está registrado" };
        }

        const user = rows[0];
        if (user.contraseña === LBody.password) {
            return { success: true, message: "Usuario Verificado" };
        } else {
            return { success: false, message: "Contraseña Incorrecta" };
        }
    } catch (error) {
        console.error("Error al verificar usuario:", error);
        return { success: false, message: "Hubo un error al verificar el usuario. Por favor, inténtalo de nuevo más tarde." };
    }
};

module.exports = { CrearUsuarios,verificaciónUsuario }; // Exporta correctamente la función


