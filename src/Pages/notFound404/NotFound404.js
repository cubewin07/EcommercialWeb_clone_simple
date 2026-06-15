import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import styles from './NotFound404.module.scss';

/* ────────────────────────────────────────────────────────────────
   Luxe Noir - 404 page
   Dark editorial e-commerce aesthetic
   Full-bleed, fills the viewport, renders without Layout.
   ──────────────────────────────────────────────────────────────── */

// Pre-computed deterministic floating positions so we don't re-seed
// the pseudo-random engine on every render (and so SSR / hydration —
// if added later — stays stable).
const PARTICLE_COUNT = 28;
const FLOAT_RANGE = 60; // viewport units of vertical drift

const generateParticles = (count) =>
  Array.from({ length: count }, (_, i) => {
    const seed = (i * 37 + 13) % 100;
    const seed2 = (i * 91 + 7) % 100;
    return {
      id: i,
      x: seed,                       // 0-100 vw
      size: 1 + ((seed2 % 4) * 0.5), // 1-3 px
      delay: (seed / 100) * 8,
      duration: 14 + ((seed2 / 100) * 12), // 14-26s
      drift: ((seed2 % 2 === 0 ? -1 : 1) * (4 + (seed % 5))), // +/- 4-9 vw
      opacity: 0.25 + ((seed % 5) * 0.08), // 0.25 - 0.57
    };
  });

// Animation variants ─ kept all in one place for legibility.
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1,
      when: 'beforeChildren',
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

const numberVariants = {
  hidden: { opacity: 0, scale: 0.96, letterSpacing: '0.4em' },
  visible: {
    opacity: 1,
    scale: 1,
    letterSpacing: '0.02em',
    transition: { duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  },
};

const planetVariants = {
  hidden: { opacity: 0, rotate: -20 },
  visible: {
    opacity: 1,
    rotate: 0,
    transition: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function NotFound404() {
  const navigate = useNavigate();
  const particles = useMemo(() => generateParticles(PARTICLE_COUNT), []);

  const goHome = () => navigate('/', { replace: true });

  return (
    <div className={styles.page} role="main">
      {/* Animated gradient + noise backdrop */}
      <div className={styles.backdrop} aria-hidden="true">
        <div className={styles.gradientOrb} />
        <div className={styles.gradientOrbSecondary} />
        <div className={styles.noise} />
      </div>

      {/* Soft gold/cream particles */}
      <div className={styles.particles} aria-hidden="true">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className={styles.particle}
            initial={{ y: '110vh', x: 0, opacity: 0 }}
            animate={{
              y: `-${FLOAT_RANGE}vh`,
              x: `${p.drift}vw`,
              opacity: [0, p.opacity, p.opacity, 0],
            }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
              times: [0, 0.15, 0.85, 1],
            }}
            style={{
              left: `${p.x}vw`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      <motion.div
        className={styles.content}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Subtle stylized planet illustration */}
        <motion.div
          className={styles.illustration}
          variants={planetVariants}
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 220 220"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.planet}
          >
            <defs>
              <radialGradient id="planetGrad" cx="35%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.18" />
                <stop offset="55%" stopColor="#1a8a7a" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#0d1117" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#fbbf24" stopOpacity="0" />
                <stop offset="50%" stopColor="#fbbf24" stopOpacity="0.45" />
                <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
              </linearGradient>
            </defs>

            {/* Outer ring */}
            <ellipse
              cx="110"
              cy="110"
              rx="105"
              ry="28"
              fill="none"
              stroke="url(#ringGrad)"
              strokeWidth="1"
              transform="rotate(-18 110 110)"
            />
            {/* Planet sphere */}
            <circle cx="110" cy="110" r="68" fill="url(#planetGrad)" />
            <circle
              cx="110"
              cy="110"
              r="68"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="1"
            />
            {/* Subtle inner highlight crescent */}
            <path
              d="M 60 90 A 55 55 0 0 1 110 55 A 40 55 0 0 0 60 90 Z"
              fill="rgba(240, 242, 245, 0.05)"
            />
          </svg>
        </motion.div>

        {/* Massive 404 with subtle glitch */}
        <motion.div className={styles.errorNumber} variants={numberVariants}>
          <span className={styles.errorNumberInner} data-text="404">
            4
          </span>
          <span className={styles.errorNumberInner} data-text="404">
            0
          </span>
          <span className={styles.errorNumberInner} data-text="404">
            4
          </span>
        </motion.div>

        <motion.h1 className={styles.title} variants={itemVariants}>
          Lost in the dark
        </motion.h1>

        <motion.p className={styles.tagline} variants={itemVariants}>
          The page you are looking for has slipped beyond the horizon.
          Try retracing your steps.
        </motion.p>

        <motion.div variants={itemVariants} className={styles.actions}>
          <button
            type="button"
            className={styles.primaryButton}
            onClick={goHome}
          >
            <span className={styles.primaryButtonLabel}>Return Home</span>
            <svg
              className={styles.primaryButtonIcon}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </motion.div>

        <motion.div className={styles.meta} variants={itemVariants}>
          <span className={styles.metaDot} />
          <span>Error 404 • Page not found</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
