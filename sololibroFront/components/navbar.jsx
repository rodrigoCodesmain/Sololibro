import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation'; // Usamos este hook para navegar
import styles from '../styles/Navbar.module.css';
import SideBarMenu from './SideBarGenrer';

export default function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  // Función que maneja el clic en el ícono de perfil
  const handleProfileIconClick = () => {
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };

  // Función que maneja la búsqueda y la actualización de la URL
  const handleSearch = () => {
    if (searchTerm) {
      localStorage.setItem('searchTerm', searchTerm); // Guardamos el término en localStorage
      router.push({
        pathname: '/', // Mantener la ruta base
        query: { searchTerm }, // Actualizamos el parámetro 'searchTerm' sin cambiar la ruta
      });
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
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()} // Ejecuta la búsqueda al presionar Enter
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