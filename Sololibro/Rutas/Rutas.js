const express = require('express');
const router = express.Router();

const { getUsuarios } = require('../Consultas/ConsultasMongodb'); // Asegúrate de la ruta correcta

router.use(express.json()); // Middleware para parsear JSON



router.get("/usuario", async (req, res) => {
    try {
        const usuarios = await getUsuarios(); // Llamada a la función que obtiene usuarios
        res.json(usuarios); // Envía la lista de usuarios como respuesta
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
});




module.exports = router;