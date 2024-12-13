'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Login.module.css';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Evita el envío por defecto del formulario

        // Validar que ambos campos no estén vacíos
        if (!username || !password) {
            alert('El nombre de usuario o correo no está registrado');
            return;
        }

        // Preparar los datos para enviar al backend
        const data = {
            username: username.trim(),
            password: password.trim(),
        };

        try {
            const response = await fetch("https://localhost:3001/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Error desconocido");
            }

            const responseData = await response.json();
            console.log("Éxito:", responseData);
            alert("Login exitoso");

            // Redirigir a la página principal
            window.location.href = "https://localhost:3000/";
        } catch (error) {
            console.error(error);
            alert(error.message || "Error al conectar con el servidor");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <Link href="/">
                    <h2 className={styles.title}>Ingresar</h2>
                </Link>    
                <form className={styles.form} onSubmit={handleSubmit}>
                    
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="Usuario/Correo" className={styles.input} value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>

                    <div className={styles.inputGroup}>
                        <input type="password" placeholder="Contraseña" className={styles.input} value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>

                    <button type="submit" className={styles.button}>Ingresar</button>
                    <p className={styles.registerLink}>
                        ¿No tienes una cuenta? <Link href="/registro" className={styles.link}>Regístrate</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}