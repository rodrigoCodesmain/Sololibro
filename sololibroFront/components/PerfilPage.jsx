'use client'

import styles from '../styles/Perfil.module.css';
import { useState } from 'react';

export default function Perfil() {
    const [notificaciones, setNotificaciones] = useState(true);
  
    return (
      <div className={styles.container}>
        {/* Información Personal */}
        <section className={styles.section}>
          <h2>Información Personal</h2>
          <div className={styles.personalInfo}>
            <div className={styles.imagePlaceholder}>
              <input type="file" className={styles.imageInput} title="Subir imagen" />
            </div>
            <div className={styles.userInfo}>
              <h3>UsuarioEjemplo</h3>
              <p>usuario@ejemplo.com</p>
            </div>
          </div>
        </section>
  
        {/* Preferencias */}
        <section className={styles.section}>
          <h2>Preferencias</h2>
          <div className={styles.preferences}>
            <label>
              Idioma:
              <select>
                <option>Español</option>
                <option>Inglés</option>
                <option>Francés</option>
                <option>Alemán</option>
                <option>Portugués</option>
              </select>
            </label>
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
        <section className={styles.section}>
          <h2>Libros Buscados</h2>
          <div className={styles.card}>
            <ul>
              <li>No hay libros en la lista</li>
            </ul>
          </div>
        </section>
      </div>
    );
  }