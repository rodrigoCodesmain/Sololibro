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
];

export default function Sidebar() {
    const [isGenresMenuOpen, setIsGenresMenuOpen] = useState(false); // Estado para el menú de géneros

    return (
        <div className={styles.sidebar}>
            <button onClick={() => setIsGenresMenuOpen(!isGenresMenuOpen)}>
                Géneros
            </button>
            {isGenresMenuOpen && (
                <ul className={styles.genreList}>
                    {genres.map((genre, index) => (
                        <li key={index}>{genre}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}