import styles from '../styles/Register.module.css';
import Link from 'next/link';

export default function RegisterPage() {
    return (
        <div className={styles.container}>
            <div className={styles.registerBox}>
                <div className={styles.icon}>
                    <Link href='/'>
                    <img src="/path/to/icon.png" alt="Libro icono" />
                    </Link>
                </div>
                <h2 className={styles.title}>Registro</h2>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="Usuario" className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="password" placeholder="Contraseña" className={styles.input} required />
                    </div>
                    <button type="submit" className={styles.button}>Registrarse</button>
                    <p className={styles.loginLink}>
                        ¿Tienes una cuenta? <a href="/login" className={styles.link}>Ingresar</a>
                    </p>
                </form>
            </div>
        </div>
    );
}