'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // Usamos Link de Next.js
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
];

export default function Sidebar() {
  const [isGenresMenuOpen, setIsGenresMenuOpen] = useState(false);

  return (
    <div className={styles.sidebar}>
      <button className={styles.genreButton} onClick={() => setIsGenresMenuOpen(!isGenresMenuOpen)}>
        ☰ Géneros
      </button>
      {isGenresMenuOpen && (
        <ul className={styles.genreList}>
          {genres.map((genre, index) => (
            <li key={index}>
              {/* Redirige a la ruta estática correspondiente */}
              <Link href={`/genero/${genre.toLowerCase().replace(/ /g, '-')}`}>{genre}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}