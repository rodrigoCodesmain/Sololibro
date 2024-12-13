const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
    {
      _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
      nombre: { type: String },
      email: { type: String },
      contraseña: { type: String },
      
      // Referencia a las notificaciones
      notificaciones: [
        { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'Notificacion'  // Referencia al modelo Notificacion
        }
      ]
    },
    { 
      versionKey: false, // Desactiva el campo __v
      strict: true,
      collection: 'Usuarios'
    }
  );
  


// Schema sucursal
const sucursalSchema = new mongoose.Schema({
    id_sucursal: {
        type: String,
        required: true
    },
    nombre_sucursal: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    }
});


// schema disponibilidad
const disponibilidadSchema = new mongoose.Schema({
    sucursal: {
        type: sucursalSchema,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    }
});

// Schema del la coleccion libro
const LibroSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    categorias: { type: String},
    ISBN: { type: String},
    titulo : { type: String},
    autor: {type: String},
    precio: {type: Number},
    disponibilidad: { type: [disponibilidadSchema], required: false},
    ImagenURL:{type: String},
    sucursal: { type: String },   // Nuevo parámetro Sucursal
    cantidad: { type: Number }     // Nuevo parámetro Cantidad
},
{ 
    //Moficadores del schema
    versionKey: false,           
    strict: false,
    collection: 'Libros' ,
    toJSON: { versionKey: false }, // Omitir __v automáticamente
    toObject: { versionKey: false } // Omitir __v automáticamente
});


// Crear el modelo basado en el esquema
const Usuario = mongoose.model('Usuarios', usuarioSchema);


const Libro = mongoose.model('Libro', LibroSchema);


// Exportar el modelo
module.exports = {Usuario,Libro};