const express = require('express');
const app = express();
const mainrouter = require('./Rutas/rutas.js')

//Declaracion del puerto
const puerto = 3000;


//Middleware para controlar las rutas solicitadas
app.use(mainrouter);

// Ejecucion del servidor 
app.listen(puerto, () =>{
    console.log("servidor corriendo en el puerto", puerto)
})
