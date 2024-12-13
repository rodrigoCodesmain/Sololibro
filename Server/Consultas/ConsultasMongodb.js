const connectDB = require ("../DataBase/MongoDB");
const {Libro} = require ("./Schemas/Schema.js")

connectDB();


const InformacionLibros = async () => { 
    try { 
        const libros = await Libro.find(
            { 
                titulo: { $exists: true }, 
                autor: { $exists: true }, 
                categorias: { $exists: true },
                isbn: { $exists: true },
                precio: { $exists: true },
                ImagenURL: { $exists: true },
                sucursal: { $exists: true },
            }, 
            { 
                titulo: 1, 
                autor: 1, 
                categorias: 1, 
                isbn: 1, 
                precio: 1, 
                ImagenURL: 1,
                sucursal: 1, 
                _id: 1 
            }
        );
        return libros;
        
    } catch (error) {
        console.error("Error al extraer la información de los libros", error);
        return { success: false, message: "Hubo un error al extraer la información de los libros. Por favor, inténtalo de nuevo más tarde." };
    }
};

const CrudLibros = async () => { 
    try { 
        const libros = await Libro.find(
            { 
                titulo: { $exists: true }, 
                autor: { $exists: true }, 
                categorias: { $exists: true },
                isbn: { $exists: true },
                precio: { $exists: true },
                ImagenURL: { $exists: true },
                sucursal: { $exists: true }, 
                cantidad: { $exists: true }   
            }, 
            { 
                titulo: 1, 
                autor: 1, 
                categorias: 1, 
                isbn: 1, 
                precio: 1, 
                ImagenURL: 1,
                sucursal: 1, 
                cantidad: 1,  
                _id: 1 
            }
        );
        return libros;
        
    } catch (error) {
        console.error("Error al extraer la información de los libros", error);
        return { success: false, message: "Hubo un error al extraer la información de los libros. Por favor, inténtalo de nuevo más tarde." };
    }
};

const findById = async (id) => {

    console.log(" Pase por busqueda solamente")

    try {
        const libro = await Libro.findById(id, { _id: 1 }); // Solo obtenemos el ID

        if (!libro) {
            return { success: false, message: "Libro no encontrado." };
        }

        return { success: true, libro }; // Retorna el libro encontrado
    } catch (error) {
        console.error("Error al obtener el libro:", error);
        return { success: false, message: "Hubo un error al obtener el libro. Por favor, inténtalo de nuevo más tarde." };
    }
};


const EliminarLibroPorId = async (id) => {
    try {
        const libro = await Libro.deleteOne({ _id: id }); // Solo obtenemos el ID
        return { success: true, libro }; // Retorna el libro eliminado
    } catch (error) {
        console.error("Error al obtener el libro:", error);
        return { success: false, message: "Hubo un error al obtener el libro. Por favor, inténtalo de nuevo más tarde." };
    }
};


const ActualizarLibroPorId = async (id, body) => {
    
    console.log(id)
    try {
        const libroActualizado = await Libro.findByIdAndUpdate(id, 

            { $set: body }, // Actualizar únicamente los campos proporcionados
            { new: true, runValidators: true } // Retornar el documento actualizado y aplicar validadores del esquema
        
        
        );

        if (!libroActualizado) {
            return { success: false, message: "Libro no encontrado." };
        }

        return { success: true, libro: libroActualizado }; // Retorna el libro actualizado
    } catch (error) {
        console.error("Error al actualizar el libro:", error);
        return { success: false, message: "Hubo un error al actualizar el libro. Por favor, inténtalo de nuevo más tarde." };
    }
};

const CrearLibro = async (body) => { 
    try {

        const libroNuevo = await Libro.create(body); // Crear el libro directamente desde body
        
        return { success: true, libro: libroNuevo };
        
    } catch (error) {
        console.error("Error al insertar libro:", error);
        return { success: false, message: "Hubo un error al insertar el libro. Por favor, inténtalo de nuevo más tarde." };
    }
};
module.exports = {InformacionLibros,findById,ActualizarLibroPorId,CrudLibros,EliminarLibroPorId,CrearLibro};