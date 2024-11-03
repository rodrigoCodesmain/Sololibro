import styles from '../styles/MostSGenrers.module.css';

export default function MostSGenrer() {
    return (
        <div className={styles['sidebar-genres']}>
            <div className={`${styles.genre} ${styles.romance}`}>
                <img src='/Genrers-jpg/romance.jpg' alt="Romance" />
                <p>Romance</p>
            </div>
            <div className={`${styles.genre} ${styles.motivacion}`}>
                <img src="/Genrers-jpg/motivacion.jpg" alt="Motivación Personal" />
                <p>Motivación Personal</p>
            </div>
            <div className={`${styles.genre} ${styles.misterio}`}>
                <img src="/Genrers-jpg/crimen.jpg" alt="Crimen y Misterio" />
                <p>Crimen y Misterio</p>
            </div>
            <div className={`${styles.genre} ${styles.cienciaFiccion}`}>
                <img src="/Genrers-jpg/scifi.jpg" alt="Ciencia Ficción" />
                <p>Ciencia Ficción</p>
            </div>
        </div>
    );
}