"use client";
import React, { useEffect, useState } from "react";
import styles from "../styles/Crud.module.css";

const CrudTable = ({ setCurrentRecord }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('https://localhost:3001/api/CrudLibros'); // Cambia esto por tu endpoint
      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteData = async (id) => {
    try {
      const response = await fetch(`https://localhost:3001/api/BorrarLibro/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Actualiza el estado después de eliminar el libro
        setData(data.filter(record => record._id !== id));
      } else {
        console.error("Error deleting book:", response.statusText);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={styles["table-container"]}>
      <table className={styles["crud-table"]}>
        <thead>
          <tr>
            <th>Nombre del libro</th>
            <th>Autor</th>
            <th>Categorías</th>
            <th>ISBN</th>
            <th>Precio</th>
            <th>Sucursal</th>
            <th>Cantidad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr key={record._id}>
              <td>{record.titulo}</td>
              <td>{record.autor}</td>
              <td>{record.categorias}</td>
              <td>{record.isbn}</td>
              <td>{record.precio}</td>
              <td>{record.sucursal}</td>
              <td>{record.cantidad}</td>
              <td>
                <button
                  className={styles["crud-button"]}
                  onClick={() => setCurrentRecord(record)}
                >
                  Editar
                </button>
                <button
                  className={styles["crud-button"]}
                  onClick={() => deleteData(record._id)} // Cambiado a record._id
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;