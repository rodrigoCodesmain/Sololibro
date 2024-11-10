import Link from 'next/link'; // Importa Link
import styles from '../styles/Login.module.css';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <div className={styles.icon}>
                    <Link href="/">
                        <img src="/path/to/icon.png" alt="Libro icono" />
                    </Link>
                </div>
                <h2 className={styles.title}>Ingresar</h2>
                <form className={styles.form}>
                    <div className={styles.inputGroup}>
                        <input type="text" placeholder="Usuario" className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <input type="password" placeholder="Contraseña" className={styles.input} required />
                    </div>
                    <button type="submit" className={styles.button}>Ingresar</button>
                    <p className={styles.registerLink}>
                        ¿No tienes una cuenta? <a href="/registro" className={styles.link}>Regístrate</a>
                    </p>
                </form>
            </div>
        </div>
    );
}