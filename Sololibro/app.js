const express = require('express');
const fs = require('fs');
const https = require('https')

const app = express();
const mainrouter = require('./Rutas/rutas.js')

//Declaracion del puerto
const puerto = 3000;

//Lectura de certificado
const opciones ={
    key: fs.readFileSync('./Certificado-ssl/localhost+2-key.pem'),
    cert: fs.readFileSync('./Certificado-ssl/localhost+2.pem')
}

// Middleware para parssear JSON
app.use(express.json()); 

//Middleware para controlar las rutas solicitadas
app.use(mainrouter);

// Ejecucion del servidor 
https.createServer(opciones, app).listen(puerto, () => {
    console.log("Servidor HTTPS corriendo en https://localhost:" + puerto);
});
