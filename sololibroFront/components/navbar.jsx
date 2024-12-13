"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css';

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
       <Link href="/" onClick={() => { setSearchTerm(''); setSelectedGenre(null); }}>
          <div className={styles.navbarLogo}>
            <Image 
              src="/images/logo.png" 
              alt="SOLOLIBRO Logo" 
              width={100} 
              height={50} 
            />
          </div>
        </Link>
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
