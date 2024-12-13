"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Crud.module.css";

const CrudForm = ({ currentRecord, setCurrentRecord }) => {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    categorias: "",
    isbn: "",
    precio: "",
    sucursal: "",
    cantidad: "",
    ImagenURL: "", // Cambiado aquí
  });

  useEffect(() => {
    console.log("Current Record:", currentRecord);
    if (currentRecord) {
      setForm({
        id: currentRecord._id,
        titulo: currentRecord.titulo || "",
        autor: currentRecord.autor || "",
        categorias: currentRecord.categorias || "",
        isbn: currentRecord.isbn || "",
        precio: currentRecord.precio || "",
        sucursal: currentRecord.sucursal || "",
        cantidad: currentRecord.cantidad || "",
        ImagenURL: currentRecord.ImagenURL || "", // Cambiado aquí
      });
    } else {
      setForm({ 
        id: null,
        titulo: "", 
        autor: "", 
        categorias: "", 
        isbn: "", 
        precio: "", 
        sucursal: "", 
        cantidad: "",
        ImagenURL: "", // Cambiado aquí
      });
    }
  }, [currentRecord]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.titulo || !form.autor || !form.sucursal || !form.cantidad || !form.categorias || !form.isbn || !form.precio || !form.ImagenURL) // Cambiado aquí
      return alert("Por favor llena todos los campos");

    if (form.id) {
      await updateData(form);
    } else {
      await createData(form);
    }

    handleReset();
  };

  const createData = async (book) => {
    try {
      const response = await fetch("https://localhost:3001/api/CrearLibro", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (!response.ok) throw new Error("Error al crear el libro");
      console.log("Libro agregado exitosamente");
    } catch (error) {
      console.error("Error en createData:", error);
    }
  };

  const updateData = async (book) => {
    try {
      const response = await fetch(`https://localhost:3001/api/libros/${book.id}`, { 
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(book),
      });

      if (!response.ok) {
          const errorMessage = await response.text();
          throw new Error(errorMessage || "Error al actualizar el libro");
      }

      const updatedBook = await response.json();
      console.log("Libro actualizado exitosamente:", updatedBook);
      return updatedBook;
    } catch (error) {
      console.error("Error en updateData:", error);
      throw error;
    }
  };

  const handleReset = () => {
    setForm({ titulo: "", autor: "", categorias: "", isbn: "", precio: "", sucursal: "", cantidad: "", ImagenURL: "" }); 
    setCurrentRecord(null);
  };

  return (
    <div className={styles.formContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Título:</label>
        <input
          className={styles.input}
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        
        <label className={styles.label}>Autor:</label>
        <input
          className={styles.input}
          type="text"
          name="autor"
          value={form.autor}
          onChange={handleChange}
          required
        />
        
        <label className={styles.label}>Categorías:</label>
        <input
          className={styles.input}
          type="text"
          name="categorias"
          value={form.categorias}
          onChange={handleChange}
          required
        />
        
        <label className={styles.label}>ISBN:</label>
        <input
          className={styles.input}
          type="text"
          name="isbn"
          value={form.isbn}
          onChange={handleChange}
          required
        />
        
        <label className={styles.label}>Precio:</label>
        <input
          className={styles.input}
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          required
        />
        
        <label className={styles.label}>Sucursal:</label>
        <input
          className={styles.input}
          type="text"
          name="sucursal"
          value={form.sucursal}
          onChange={handleChange}
          required
        />
        
        <label className={styles.label}>Cantidad:</label>
        <input
          className={styles.input}
          type="number"
          name="cantidad"
          value={form.cantidad}
          onChange={handleChange}
          required
        />

        <label className={styles.label}>Imagen:</label>
        <input
          className={styles.input}
          type="text"
          name="ImagenURL" 
          value={form.ImagenURL} 
          onChange={handleChange}
          required
        />
        
        <div className={styles.formButtons}>
          <button type="submit" className={styles.button}>
            {form.id ? "Actualizar" : "Agregar"}
          </button>

          <button type="button" onClick={handleReset} className={styles.button}>
            Limpiar
          </button>
        </div>
      </form>
    </div>
  );
};

export default CrudForm;