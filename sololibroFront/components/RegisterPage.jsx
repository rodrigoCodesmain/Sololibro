'use client'; // Agrega esta línea al inicio del archivo

import { useState } from 'react';
import styles from '../styles/Register.module.css';
import Link from 'next/link';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Previene el comportamiento por defecto del formulario

        const data = {
            nombre: formData.username,
            email: formData.email,
            contraseña: formData.password,
        };

        try {
            const response = await fetch('https://localhost:3001/api/registro', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error desconocido');
            }

            const responseData = await response.json();
            console.log('Éxito:', responseData);
            alert('Registro exitoso');
            window.location.href = "https://localhost:3000/login";
        } catch (error) {
            console.error('Error:', error);
            alert(error.message);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.registerBox}>
                <Link href="/">
                    <h2 className={styles.title}>Registro</h2>
                </Link>    
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    <div className={styles.inputGroup}>
                    <input type="text" name="username" id="username" placeholder="Nombre de Usuario" className={styles.input} required value={formData.username} onChange={handleChange}/>
                    </div>

                    <div className={styles.inputGroup}>
                        <input  type="email" name="email" id="email" placeholder="Correo" className={styles.input} required value={formData.email} onChange={handleChange} />
                    </div>

                    <div className={styles.inputGroup}>
                        <input type="password" name="password" id="password" placeholder="Contraseña" className={styles.input} required value={formData.password} onChange={handleChange} />
                    </div>

                    <button type="submit" className={styles.button}>Registrarse</button>
                    <p className={styles.loginLink}>
                        ¿Tienes una cuenta? <Link href="/login" className={styles.link}>Ingresar</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}