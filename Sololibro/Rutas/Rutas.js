const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

const { getUsuarios,getlibros,getInventarios,getSucursal,getDisponibilidad,insertUser,verificaciónUsuario} = require('../Consultas/ConsultasMongodb'); 

app.use(express.static('public'));
app.use(router);


router.get("/registro", async (req,res)=>{
    try{
        res.sendFile(path.join(__dirname, 'public','registro.html'));
    }catch (error) {
        console.error(error);
        res.status(404).send("La pagina no existe");
    }

})

router.post("/registro", async (req, res) => {
    console.log("Datos recibidos en req.body:", req.body); // Debugging
    try {
        const Body = req.body;
        const result = await insertUser(Body);

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

router.get("/login", async (req,res)=>{
    try{
        res.sendFile(path.join(__dirname, 'public','login.html'));
    }catch (error) {
        console.error(error);
        res.status(404).send("La pagina no existe");
    }

})

router.post("/login", async (req, res) => {
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
router.get('/api/libros', (req, res) => {
    const libros = [
        { title: 'El Principito', author: 'Antoine de Saint-Exupéry' },
        { title: 'Cien Años de Soledad', author: 'Gabriel García Márquez' },
        { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes' },
        { title: 'El Principito', author: 'Antoine de Saint-Exupéry' },
        { title: 'Cien Años de Soledad', author: 'Gabriel García Márquez' },
        { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes' },
        { title: 'El Principito', author: 'Antoine de Saint-Exupéry' },
        { title: 'Cien Años de Soledad', author: 'Gabriel García Márquez' },
        { title: 'Don Quijote de la Mancha', author: 'Miguel de Cervantes' },
    ];
    res.json(libros); // Enviar libros en formato JSON
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