const connectDB = require ("../DataBase/MongoDB");
const Usuario = require ("./Schemas/Schema.js")
const mongoose = require('mongoose');

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

module.exports = {getUsuarios,getlibros,getInventarios,getSucursal,getDisponibilidad,insertUser};