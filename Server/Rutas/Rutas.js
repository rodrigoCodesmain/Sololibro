const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

const { CrearUsuarios,verificaciónUsuario,InformacionLibros} = require('../Consultas/ConsultasMongodb'); 

app.use(express.static('public'));
app.use(router);


router.post("/api/registro", async (req, res) => {
    console.log("Datos recibidos en req.body:", req.body); // Debugging
    try {
        const Body = req.body;
        const result = await CrearUsuarios(Body);

        // Envía la respuesta al cliente
        if (result.success) {
            res.status(201).send(result); // 201 Created para usuarios nuevos
        } else {
            // console.log(result);
            res.status(400).send(result); // 400 Bad Request para errores de validación
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al enviar datos");
    }
});


router.post("/api/login", async (req, res) => {
    console.log("Datos recibidos en req.body:", req.body); // Debugging
    try {
        const LBody = req.body;
        const result = await verificaciónUsuario(LBody);

        // Envía la respuesta al cliente
        if (result.success) {
            res.status(201).send(result); // 201 Created para usuarios nuevos
        } else {
            // console.log(result);
            res.status(400).send(result); // 400 Bad Request para errores de validación
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al enviar datos");
    }
});
router.get('/api/libros', async (req, res) => {
    try {
        
        libros = await InformacionLibros();
      
        return res.json(libros); // Enviar los libros encontrados en formato JSON
        
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      return res.status(500).json({ message: 'Hubo un error al obtener los libros' });
    }
});


router.get("/main", async (req,res)=>{
    try{
        res.sendFile(path.join(__dirname, 'public','biblioteca.html'));
    }catch (error) {
        console.error(error);
        res.status(404).send("La pagina no existe");
    }

})
//////


router.get("/usuario", async (req, res) => {
    try {
        const usuarios = await getUsuarios(); // Llamada a la función que obtiene usuarios
        res.json(usuarios); // Envía la lista de usuarios como respuesta
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
});

router.get("/libros", async (req, res) => {
    try {
        const libros = await getlibros(); // Llamada a la función que obtiene usuarios
        res.json(libros); // Envía la lista de usuarios como respuesta
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
});

router.get("/sucursales", async (req, res) => {
    try {
        const Sucursal = await getSucursal(); // Llamada a la función que obtiene usuarios
        res.json(Sucursal); // Envía la lista de usuarios como respuesta
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
});

router.get("/inventarios", async (req, res) => {
    try {
        const inventarios = await getInventarios(); // Llamada a la función que obtiene usuarios
        res.json(inventarios); // Envía la lista de usuarios como respuesta
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
});

router.get("/disponibilidad", async (req, res) => {
    try {
        const disponibilidad = await getDisponibilidad(); // Llamada a la función que obtiene usuarios
        res.json(disponibilidad); // Envía la lista de usuarios como respuesta
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al obtener usuarios");
    }
});


module.exports = router;