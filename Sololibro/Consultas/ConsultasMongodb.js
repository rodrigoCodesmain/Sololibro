const { getConnection } = require ("../DataBase/MongoDB");

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

module.exports = {getUsuarios};