"use client";
import React, { useState } from "react";
import CrudForm from "../../components/CrudForm";
import CrudTable from "../../components/CrudTable";
import styles from "../../styles/Crud.module.css";

const CrudPage = () => {
  const [books, setBooks] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);

  const createData = (newBook) => {
    // Agregar el nuevo libro al estado
    setBooks((prevBooks) => [...prevBooks, { ...newBook, id: Date.now() }]);
  };

  const updateData = (updatedBook) => {
    // Actualizar un libro existente
    setBooks(
      books.map((book) =>
        book.id === updatedBook.id ? { ...updatedBook } : book
      )
    );
  };

  const deleteData = (id) => {
    // Eliminar un libro por su id
    setBooks(books.filter((book) => book.id !== id));
  };

  const setCurrentBook = (record) => {
    // Establecer el libro actual que estamos editando
    setCurrentRecord(record);
  };

  return (
    <div className={styles["crud-container"]}>
      <h1>Gestión de Libros</h1>
      <CrudForm
        createData={createData}
        updateData={updateData}
        currentRecord={currentRecord}
        setCurrentRecord={setCurrentRecord}
      />
      <CrudTable data={books} deleteData={deleteData} setCurrentRecord={setCurrentBook} />
    </div>
  );
};

export default CrudPage;
