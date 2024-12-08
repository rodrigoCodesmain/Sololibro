"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Crud.module.css";

const CrudForm = ({ createData, updateData, currentRecord, setCurrentRecord }) => {
  const [form, setForm] = useState({
    titulo: "",
    autor: "",
    categorias: "",
    isbn: "",
    precio: "",
    sucursal: "",
    cantidad: "",
  });

  useEffect(() => {
    if (currentRecord) {
      setForm(currentRecord);
    } else {
      setForm({ titulo: "", autor: "", categorias: "", isbn: "", precio: "", sucursal: "", cantidad: "" });
    }
  }, [currentRecord]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.titulo || !form.autor || !form.sucursal || !form.cantidad || !form.categorias || !form.isbn || !form.precio)
      return alert("Por favor llena todos los campos");

    if (form.id) {
      updateData(form);  // Actualizar el libro existente
    } else {
      createData(form);  // Crear un nuevo libro
    }

    handleReset();
  };

  const handleReset = () => {
    setForm({ titulo: "", autor: "", categorias: "", isbn: "", precio: "", sucursal: "", cantidad: "" });
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
