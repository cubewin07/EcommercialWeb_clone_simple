import { useEffect, useState, useRef, createContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCom from '../../../components/ProductDisplay/ProductCom';
import styles from './Banner.module.scss';

const TIME_CHANGE = 6000;
const COOLDOWN_TIME = 600;

export const BannerContext = createContext();

function Banner({ images }) {
  const [index, setIndex] = useState(0);
  const [indexDots, setIndexDots] = useState(0);
  const [canChange, setCanChange] = useState(true);
  const timer = useRef(null);
  const totalImages = images.length;

  useEffect(() => {
    startTimer();
    return () => clearInterval(timer.current);
  }, [totalImages]);

  const startTimer = () => {
    clearInterval(timer.current);
    timer.current = setInterval(() => {
      setIndex((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
      setIndexDots((prev) => (prev === totalImages - 1 ? 0 : prev + 1));
    }, TIME_CHANGE);
  };

  const handleChangeImage = (newIndex) => {
    if (!canChange || newIndex === index) return;
    clearInterval(timer.current);
    setCanChange(false);
    setIndex(newIndex);
    setTimeout(() => {
      setCanChange(true);
      setIndexDots(newIndex);
    }, COOLDOWN_TIME);
  };

  const goNext = () => handleChangeImage(index === totalImages - 1 ? 0 : index + 1);
  const goPrev = () => handleChangeImage(index === 0 ? totalImages - 1 : index - 1);

  const value = {
    images, index, setIndex,
    indexDots, setIndexDots,
    handleChangeImage, totalImages,
    startTimer, timer,
  };

  return (
    <BannerContext.Provider value={value}>
      <section className={styles.heroSection}>
        {/* Slide track */}
        <div
          className={styles.slideTrack}
          style={{ transform: `translateX(-${index * 100}%)` }}
          onMouseEnter={() => clearInterval(timer.current)}
          onMouseLeave={startTimer}
        >
          {images.map((image, i) => (
            <div key={i} className={styles.slide}>
              <img src={image} alt={`Hero ${i + 1}`} className={styles.slideImage} />
              <div className={styles.slideOverlay} />
              <div className={styles.slideContent}>
                <motion.span
                  className={styles.slideTag}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.6 }}
                  key={`tag-${i}`}
                >
                  {i === 0 ? 'New Collection' : i === 1 ? 'Featured Items' : 'Trending Now'}
                </motion.span>
                <motion.h1
                  className={styles.slideTitle}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.7 }}
                  key={`title-${i}`}
                >
                  {i === 0
                    ? 'Discover the Art of Living'
                    : i === 1
                    ? 'Curated for the Discerning'
                    : 'Elevate Your Everyday'}
                </motion.h1>
                <motion.p
                  className={styles.slideSubtitle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  key={`subtitle-${i}`}
                >
                  Premium products that blend form and function with uncompromising quality.
                </motion.p>
                <motion.div
                  className={styles.slideCta}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.75, duration: 0.6 }}
                  key={`cta-${i}`}
                >
                  <a href="/product" className={styles.ctaPrimary}>Explore Products</a>
                  <a href="/product" className={styles.ctaSecondary}>Learn More</a>
                </motion.div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress dots */}
        <div className={styles.dots}>
          {images.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === indexDots ? styles.active : ''}`}
              onClick={() => handleChangeImage(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Prev/Next */}
        <button className={`${styles.navBtn} ${styles.navPrev}`} onClick={goPrev} aria-label="Previous">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button className={`${styles.navBtn} ${styles.navNext}`} onClick={goNext} aria-label="Next">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </section>
    </BannerContext.Provider>
  );
}

export default Banner;