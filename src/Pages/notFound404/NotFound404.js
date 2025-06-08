import styles from './NotFound404.module.scss';
import { useNavigate } from 'react-router-dom';

export default function Animated404Page() {
    const navigate = useNavigate();
    return (
      <div className={styles.errorPage}>
        <div className={styles.backgroundParticles}>
          {Array.from({ length: 30 }).map((_, i) => (
            <div key={i} className={styles.particle} />
          ))}
        </div>
  
        <div className={styles.glitchText} data-text="404">404</div>
        <div className={styles.robot}>
          <div className={styles.head}>
            <div className={styles.eyes}>
              <span className={styles.eye} />
              <span className={styles.eye} />
            </div>
          </div>
          <div className={styles.body}>
            <div className={styles.bar}>
              <div className={styles.progress} />
            </div>
            <p>Oops! Something went wrong...</p>
          </div>
        </div>
        <button className={styles.homeButton} onClick={() => navigate('/', { replace: true })}>
          Go Home
        </button>
      </div>
    );
}