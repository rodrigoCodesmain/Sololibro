"use client";
import React from "react";
import styles from "../styles/Crud.module.css";

const CrudTable = ({ data, deleteData, setCurrentRecord }) => {
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
          {data.map((record, index) => (
            <tr key={index}>
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
                  onClick={() => deleteData(record.id)}
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
