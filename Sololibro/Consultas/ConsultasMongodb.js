const connectDB = require ("../DataBase/MongoDB");
const {Usuario,Libro} = require ("./Schemas/Schema.js")

connectDB();

const getUsuarios = async()=>{
    try{
        const database = await getConnection();
        const Usuarios = await database.collection("Usuarios").find().toArray();
        
        console.table(Usuarios);
        console.log("lista de Usuarios");
        return Usuarios;
    }catch(error){
        console.error(error);
    }
}

const getlibros = async()=>{
    try{
        const database = await getConnection();
        const Libros = await database.collection("Libro").find().toArray();
        
        console.table(Libros);
        console.log("lista de libros");
        return Libros;
    }catch(error){
        console.error(error);
    }
}

const getInventarios = async()=>{
    try{
        const database = await getConnection();
        const Inventario = await database.collection("Inventario").find().toArray();
        
        console.table(Inventario);
        console.log("lista de Inventarios");
        return Inventario;
    }catch(error){
        console.error(error);
    }
}

const getSucursal = async()=>{
    try{
        const database = await getConnection();
        const Sucursal = await database.collection("Sucursal").find().toArray();
        
        console.table(Sucursal);
        console.log("lista de Sucursales");
        return Sucursal;
    }catch(error){
        console.error(error);
    }
}

const getDisponibilidad = async()=>{
    try{
        const database = await getConnection();
        const disponibilidad = await database.collection("Disponibilidad").find().toArray();
        
        console.table(disponibilidad);
        console.log("lista de disponibilidad");
        return disponibilidad;
    }catch(error){
        console.error(error);
    }
}

const insertUser = async (Body) => { 
    try { 
        const ValidarNombre = await Usuario.findOne({ Nombre: Body.Nombre });
        const ValidarEmail = await Usuario.findOne({ Email: Body.Email });

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
        const ValidarNombre = await Usuario.findOne({ Nombre: LBody.username});
        const ValidarEmail = await Usuario.findOne({ Email: LBody.password });

        let Contraseña = null;
        let UsuarioEncontrado = null;

        if (ValidarNombre != null) {
            UsuarioEncontrado = true;
            Contraseña = ValidarNombre['Contraseña'];
            console.log(Contraseña)
        }
        else if (ValidarEmail != null) {
            UsuarioEncontrado = true;
            Contraseña = ValidarEmail['Contraseña'];
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

const InformacionLibros = async (Body) => { 
    try { 
        const nombres = await Libro.find({ Titulo: { $exists: true } , Autor: { $exists: true }, Categoria:{ $exists: true },ISBN:{ $exists: true},Precio:{ $exists: true},ImagenURL:{ $exists: true} }, { Titulo: 1, Autor: 1,Categoria: 1,ISBN: 1, Precio: 1, ImagenURL:1, _id: 0 } );
        return  nombres;
        
    } catch (error) {
        console.error("Error al extraer la información de los libros", error);
        return { success: false, message: "Hubo un error al extraer la información de los libros. Por favor, inténtalo de nuevo más tarde." };
    }
};


module.exports = {getUsuarios,getlibros,getInventarios,getSucursal,getDisponibilidad,insertUser,verificaciónUsuario,InformacionLibros};