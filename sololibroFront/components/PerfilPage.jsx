'use client';

import styles from '../styles/Perfil.module.css';
import { useState } from 'react';

export default function Perfil() {
  const [notificaciones, setNotificaciones] = useState(true);
  const [usuario, setUsuario] = useState({
    nombre: "UsuarioEjemplo",
    correo: "usuario@ejemplo.com",
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [newNombre, setNewNombre] = useState(usuario.nombre);
  const [newCorreo, setNewCorreo] = useState(usuario.correo);

  const handleGuardarCambios = () => {
    setUsuario({
      nombre: newNombre,
      correo: newCorreo,
    });
    setShowEditModal(false);
  };

  const handleConfirmarEliminar = () => {
    setShowDeleteModal(false);
    console.log("Cuenta eliminada");
  };

  return (
    <div className={styles.container}>
      {/* Información Personal */}
      <section className={styles.card}>
        <h2 className={styles.title}>Información Personal</h2>
        <div className={styles.personalInfo}>
          <div className={styles.imagePlaceholder}>
            <input type="file" className={styles.imageInput} title="Subir imagen" />
          </div>
          <div className={styles.userInfo}>
            <h3 className={styles.userName}>{usuario.nombre}</h3>
            <p className={styles.userEmail}>{usuario.correo}</p>
            <div className={styles.actions}>
              <button className={styles.editButton} onClick={() => setShowEditModal(true)}>Editar Información</button>
              <button className={styles.deleteButton} onClick={() => setShowDeleteModal(true)}>Eliminar Cuenta</button>
            </div>
          </div>
        </div>
      </section>

      {/* Preferencias */}
      <section className={styles.card}>
        <h2 className={styles.title}>Preferencias</h2>
        <div className={styles.preferences}>
          <div className={styles.notifications}>
            <span>Notificaciones:</span>
            <input
              type="checkbox"
              checked={notificaciones}
              onChange={() => setNotificaciones(!notificaciones)}
            />
          </div>
        </div>
      </section>

      {/* Libros Buscados */}
      <section className={styles.card}>
        <h2 className={styles.title}>Libros Buscados</h2>
        <div className={styles.cardContent}>
          <ul className={styles.bookList}>
            <li>No hay libros en la lista</li>
          </ul>
        </div>
      </section>

      {/* Modal para editar información */}
      {showEditModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>Editar Información</h3>
            <label className={styles.modalLabel}>
              Nombre:
              <input
                type="text"
                value={newNombre}
                onChange={(e) => setNewNombre(e.target.value)}
                className={styles.modalInput}
              />
            </label>
            <label className={styles.modalLabel}>
              Correo:
              <input
                type="email"
                value={newCorreo}
                onChange={(e) => setNewCorreo(e.target.value)}
                className={styles.modalInput}
              />
            </label>
            <div className={styles.modalActions}>
              <button className={styles.saveButton} onClick={handleGuardarCambios}>Guardar</button>
              <button className={styles.cancelButton} onClick={() => setShowEditModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para eliminar cuenta */}
      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h3 className={styles.modalTitle}>¿Eliminar Cuenta?</h3>
            <p className={styles.modalText}>Esta acción no se puede deshacer.</p>
            <div className={styles.modalActions}>
              <button className={styles.deleteButton} onClick={handleConfirmarEliminar}>Eliminar</button>
              <button className={styles.cancelButton} onClick={() => setShowDeleteModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
