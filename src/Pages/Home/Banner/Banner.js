import { useEffect, useState, useRef } from "react";
import styles from './Banner.module.scss';

const TIME_CHANGE = 5000; // Time in milliseconds to change the image

function Banner({ images }) {
    const [index, setIndex] = useState(0);
    const timer = useRef(null);
    const totalImages = images.length;

    useEffect(() => {
        timer.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
        }, TIME_CHANGE);

        return () => {
            clearInterval(timer.current); // Cleanup interval on component unmount
        };
    }, [totalImages]);

    const handleChangeImage = (newIndex) => {
        clearInterval(timer.current); // Clear the existing timer
        setIndex(newIndex);
    };

    return (
        <div className={styles.banner}>
            <img src={images[index]} alt="Banner" className={styles.bannerImage} />
            <div className={styles.bannerDots}>
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`${styles.dot} ${i === index ? styles.active : ''}`}
                        onClick={() => handleChangeImage(i)}
                    ></span>
                ))}
            </div>
            <div className={styles.ChangeBanner}>
                <button
                    className={styles.prevButton}
                    onClick={() => handleChangeImage(index === 0 ? totalImages - 1 : index - 1)}
                >
                    &lt;
                </button>
                <button
                    className={styles.nextButton}
                    onClick={() => handleChangeImage(index === totalImages - 1 ? 0 : index + 1)}
                >
                    &gt;
                </button>
            </div>
        </div>
    );
}

export default Banner;