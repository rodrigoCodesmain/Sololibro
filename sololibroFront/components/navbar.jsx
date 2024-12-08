"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Usamos este hook para navegar
import styles from '../styles/Navbar.module.css';
import SideBarMenu from './sideBarGenrer';

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Funci贸n que maneja el clic en el 铆cono de perfil
  const handleProfileIconClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Funci贸n que maneja la b煤squeda y la actualizaci贸n de la URL
  const handleSearch = () => {
    if (searchTerm) {
      localStorage.setItem('searchTerm', searchTerm); // Guardamos el t茅rmino en localStorage
      router.push(`/?searchTerm=${searchTerm}`); // Actualizamos la URL con el t茅rmino de b煤squeda
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <div className={styles.navbarLogo}>SOLOLIBRO</div>
        </Link>
        <SideBarMenu />
      </div>
      <input
        type="text"
        placeholder="Título o Autor"
        className={styles.navbarSearch}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Ejecuta la b煤squeda al presionar Enter
      />
      <div className={styles.navbarIcons}>
        <div className={styles.profileIconContainer}>
          <span className="icon">🔔</span>
          <span
            className={`${styles.profileIcon} icon`}
            onClick={handleProfileIconClick}
          >
            👤
          </span>
          {isProfileMenuOpen && (
            <div className={styles.profileMenu}>
              <Link href="/login">Iniciar Sesión</Link>
              <Link href="/registro">Registrarse</Link>
              <Link href="/perfil">Perfil</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}