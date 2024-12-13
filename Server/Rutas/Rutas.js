const express = require('express');
const path = require('path');

const app = express();
const router = express.Router();

const {InformacionLibros,findById,ActualizarLibroPorId,CrudLibros,EliminarLibroPorId,CrearLibro} = require('../Consultas/ConsultasMongodb'); 
const { CrearUsuarios,verificaciónUsuario} = require('../Consultas/ConsultasMySQL'); 

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


router.get('/api/CrudLibros', async (req, res) => {
    try {
        
        libros = await CrudLibros();
      
        return res.json(libros); // Enviar los libros encontrados en formato JSON
        
    } catch (error) {
      console.error('Error al obtener los libros:', error);
      return res.status(500).json({ message: 'Hubo un error al obtener los libros' });
    }
});

router.post("/api/CrearLibro", async (req, res) => {
    try {
        const body = req.body;
        const result = await CrearLibro(body);

        // Envía la respuesta al cliente
        if (result.success) {
            res.status(201).send(result); // 201 Creado el nuevo libro
        } else {
            // console.log(result);
            res.status(400).send(result); // 400 Bad Request para errores de validación
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al enviar datos");
    }
});


router.put("/api/libros/:id", async (req, res) => {
    const { id } = req.params; // Obtener el ID del libro desde la URL
    const { titulo, autor, categorias, isbn, precio, sucursal, cantidad } = req.body; // Desestructurar el cuerpo de la solicitud
    const body = req.body
    try {
        // Validar que se haya proporcionado el ID y otros campos necesarios
        if (!id || !titulo || !autor || !categorias || !isbn || !precio || !sucursal || !cantidad) {
            return res.status(400).send("Todos los campos son requeridos.");
        }

        // Verificar si el libro existe
        const libroExistente = await findById(id);
        if (!libroExistente) {
            return res.status(404).send("Libro no encontrado.");
        }

        // Actualizar el libro en la base de datos
        const libroActualizado = await ActualizarLibroPorId(id,body);

        // Enviar respuesta con el libro actualizado
        res.status(200).json(libroActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al enviar datos");
    }
});

router.delete("/api/BorrarLibro/:id", async (req, res) => {
    const { id } = req.params; // Obtener el ID del libro desde la URL
    try {
       
        // Verificar si el libro existe
        const libroExistente = await findById(id);
        if (!libroExistente) {
            return res.status(404).send("Libro no encontrado.");
        }
        
        // Actualizar el libro en la base de datos
        const libroEliminado = await EliminarLibroPorId(id);

        console.log("Funciona")
        // Enviar respuesta con el libro actualizado
        res.status(200).json(libroEliminado);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error al enviar datos");
    }
});




module.exports = router;