"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css'; 

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>SOLOLIBRO</div>
      <input type="text" placeholder="Título o Autor" className={styles.navbarSearch} />
      <div className={styles.navbarIcons}>
        <span className="icon">🔔</span>
        <span
          className="icon profile-icon"
          onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
        >
          👤
        </span>
        {isProfileMenuOpen && (
          <div className="profile-menu">
            <Link href="/inicio">Iniciar Sesión</Link>
            <Link href="/registro">Registrarse</Link>
            <Link href="/profile">Perfil</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
