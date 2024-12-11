"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // Importamos Image
import styles from '../styles/Navbar.module.css';
import SideBarMenu from './sideBarGenrer';

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleProfileIconClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  const handleSearch = () => {
    if (searchTerm) {
      localStorage.setItem('searchTerm', searchTerm);
      router.push(`/?searchTerm=${searchTerm}`);
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <Link href="/">
          <div className={styles.navbarLogo}>
            {/* Aquí reemplazamos el texto con el logo */}
            <Image 
              src="/images/logo.png" // Ruta del logo
              alt="SOLOLIBRO Logo" 
              width={100} // Ajusta el tamaño según tu necesidad
              height={50} 
            />
          </div>
        </Link>
        <SideBarMenu />
      </div>
      <input
        type="text"
        placeholder="Título o Autor"
        className={styles.navbarSearch}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
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
