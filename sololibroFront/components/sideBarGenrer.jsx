'use client';

import React, { useState } from 'react';
import styles from '../styles/SideBarGenrer.module.css';

const genres = [
  'Romance',
  'Motivación',
  'Crimen y Misterio',
  'Ciencia Ficción',
  'Fantasía',
  'Historia',
  'Biografía',
  'Ciencia',
  'accion',
];

export default function Sidebar({ onGenreSelect }) {
  const [isGenresMenuOpen, setIsGenresMenuOpen] = useState(false);


  return (
    <div className={styles.sidebar}>
      <button className={styles.genreButton} onClick={() => setIsGenresMenuOpen(!isGenresMenuOpen)}>
        ☰ Géneros
      </button>
      {isGenresMenuOpen && (
        <ul className={styles.genreList}>
          <li onClick={() => onGenreSelect(null)}>Todos</li> {/* Mostrar todos los libros */}
          {genres.map((genre, index) => (
            <li key={index} onClick={() => onGenreSelect(genre)}>
              {genre}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}