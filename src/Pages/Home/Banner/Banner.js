import { useEffect, useState, useRef, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Banner.module.scss';

const TIME_CHANGE = 6000;
const COOLDOWN_TIME = 600;

export const BannerContext = createContext();

const slideContent = [
  {
    tag: 'New Collection',
    title: 'Discover the Art of Living',
    subtitle: 'Premium products that blend form and function with uncompromising quality.',
  },
  {
    tag: 'Featured Items',
    title: 'Curated for the Discerning',
    subtitle: 'A hand-picked selection of timeless pieces designed to inspire.',
  },
  {
    tag: 'Trending Now',
    title: 'Elevate Your Everyday',
    subtitle: 'Find what moves you. Exceptional design meets extraordinary value.',
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};

function Banner({ images }) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const timer = useRef(null);
  const totalImages = images.length;

  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setDirection(1);
      setIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    }, TIME_CHANGE);
  };

  useEffect(() => {
    if (!isHovered) startTimer();
    return () => clearInterval(timer.current);
  }, [totalImages, isHovered]);

  const goSlide = (newIndex) => {
    if (newIndex === index) return;
    clearInterval(timer.current);
    setDirection(newIndex > index ? 1 : -1);
    setIndex(newIndex);
  };

  const goNext = () => goSlide(index === totalImages - 1 ? 0 : index + 1);
  const goPrev = () => goSlide(index === 0 ? totalImages - 1 : index - 1);

  const value = {
    images, index, setIndex: goSlide,
    handleChangeImage: goSlide, totalImages,
    startTimer, timer,
  };

  return (
    <BannerContext.Provider value={value}>
      <section
        className={styles.heroSection}
        onMouseEnter={() => { clearInterval(timer.current); setIsHovered(true); }}
        onMouseLeave={() => { setIsHovered(false); startTimer(); }}
      >
        {/* Slide Track */}
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            className={styles.slide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'tween', duration: 0.7, ease: [0.76, 0, 0.24, 1] },
              opacity: { duration: 0.4 },
            }}
          >
            <motion.img
              src={images[index]}
              alt={`Hero ${index + 1}`}
              className={styles.slideImage}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            />
            <div className={styles.slideOverlay} />

            {/* Animated gradient accent */}
            <div className={styles.accentGlow} />

            <div className={styles.slideContent}>
              <motion.span
                className={styles.slideTag}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {slideContent[index]?.tag || 'Explore'}
              </motion.span>

              <motion.h1
                className={styles.slideTitle}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {slideContent[index]?.title || images[index]?.alt || 'Discover More'}
              </motion.h1>

              <motion.p
                className={styles.slideSubtitle}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {slideContent[index]?.subtitle || 'Premium products that blend form and function.'}
              </motion.p>

              <motion.div
                className={styles.slideCta}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.85, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href="/product" className={styles.ctaPrimary}>
                  Explore Products
                  <motion.span
                    className={styles.ctaArrow}
                    initial={{ x: 0 }}
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut', delay: 1.5 }}
                  >
                    →
                  </motion.span>
                </a>
                <a href="/product" className={styles.ctaSecondary}>
                  Learn More
                </a>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress Dots */}
        <div className={styles.dots}>
          {images.map((_, i) => (
            <motion.button
              key={i}
              className={`${styles.dot} ${i === index ? styles.active : ''}`}
              onClick={() => goSlide(i)}
              aria-label={`Go to slide ${i + 1}`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>

        {/* Nav Buttons */}
        <motion.button
          className={`${styles.navBtn} ${styles.navPrev}`}
          onClick={goPrev}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(45, 212, 191, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Previous"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        <motion.button
          className={`${styles.navBtn} ${styles.navNext}`}
          onClick={goNext}
          whileHover={{ scale: 1.1, backgroundColor: 'rgba(45, 212, 191, 0.15)' }}
          whileTap={{ scale: 0.95 }}
          aria-label="Next"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>

        {/* Scroll hint */}
        <motion.div
          className={styles.scrollHint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.div
            className={styles.scrollLine}
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          />
        </motion.div>
      </section>
    </BannerContext.Provider>
  );
}

export default Banner;