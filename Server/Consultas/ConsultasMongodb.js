const connectDB = require ("../DataBase/MongoDB");
const {Usuario,Libro} = require ("./Schemas/Schema.js")

connectDB();


const CrearUsuarios = async (Body) => { 
    try { 
        const ValidarNombre = await Usuario.findOne({ nombre: Body.Nombre });
        const ValidarEmail = await Usuario.findOne({ email: Body.Email });

        if (ValidarNombre != null) {
            // console.log("Este nombre de usuario ya existe");
            return { success: false, message: "El nombre de usuario ya está ocupado" };
        }
        if (ValidarEmail != null) {
            // console.log("Este correo ya está en uso");
            return { success: false, message: "Este correo ya está en uso" };
        }
        
        const respuesta = await Usuario.create(Body); // Esperar la creación del usuario
        // console.log("Usuario agregado correctamente");
        return { success: true, respuesta };
        
    } catch (error) {
        console.error("Error al insertar usuario:", error);
        return { success: false, message: "Hubo un error al insertar el usuario. Por favor, inténtalo de nuevo más tarde." };
    }
};

const verificaciónUsuario = async (LBody) => { 
    try { 
        const ValidarNombre = await Usuario.findOne({ nombre: LBody.username});
        const ValidarEmail = await Usuario.findOne({ email: LBody.username });

        let Contraseña = null;
        let UsuarioEncontrado = null;

        if (ValidarNombre != null) {
            UsuarioEncontrado = true;
            Contraseña = ValidarNombre['contraseña'];
            console.log(Contraseña)
        }
        else if (ValidarEmail != null) {
            UsuarioEncontrado = true;
            Contraseña = ValidarEmail['contraseña'];
            console.log(Contraseña)
        }

        if(UsuarioEncontrado != true){
            return { success: false, message: "El nombre de usuario o correo no está registrado" };
        }

        if(LBody.password == Contraseña){
            return { success: true, message: "Usuario Verificado" };
        }else {
            return { success: false, message: "Contraseña Incorrecta" };
        }
        
        
    } catch (error) {
        console.error("Error al ingresar usuario:", error);
        return { success: false, message: "Hubo un error al insertar el usuario. Por favor, inténtalo de nuevo más tarde." };
    }
};

const InformacionLibros = async () => { 
    try { 
        const libros = await Libro.find(
            { 
                titulo: { $exists: true }, 
                autor: { $exists: true }, 
                categorias: { $exists: true },
                isbn: { $exists: true },
                precio: { $exists: true },
                ImagenURL: { $exists: true }
            }, 
            { 
                titulo: 1, 
                autor: 1, 
                categorias: 1, 
                isbn: 1, 
                precio: 1, 
                ImagenURL: 1, 
                _id: 1 
            }
        );
        return libros;
        
    } catch (error) {
        console.error("Error al extraer la información de los libros", error);
        return { success: false, message: "Hubo un error al extraer la información de los libros. Por favor, inténtalo de nuevo más tarde." };
    }
};

module.exports = {CrearUsuarios,verificaciónUsuario,InformacionLibros};