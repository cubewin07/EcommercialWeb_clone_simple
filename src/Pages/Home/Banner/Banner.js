import { useEffect, useState, useRef } from "react";
import styles from './Banner.module.scss';

const TIME_CHANGE = 5000; // Time in milliseconds to change the image
const COOLDOWN_TIME = 500; // Cooldown time in milliseconds to prevent rapid changes
function Banner({ images }) {
    const [index, setIndex] = useState(0);
    const [indexDots, setIndexDots] = useState(0);
    const [canChange, setCanChange] = useState(true); // State to control image change
    const timer = useRef(null);
    const totalImages = images.length;

    useEffect(() => {
        startTimer(); // Start the timer when the component mounts

        return () => {
            clearInterval(timer.current); // Cleanup interval on component unmount
        };
    }, [totalImages]);

    const startTimer = () => {
        clearInterval(timer.current); // Clear any existing timer
        timer.current = setInterval(() => {
            setIndex((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
            setIndexDots((prevIndex) => (prevIndex === totalImages - 1 ? 0 : prevIndex + 1));
        }, TIME_CHANGE);
    };

    const handleChangeImage = (newIndex) => {
        if (!canChange || newIndex === index) return; // Prevent change if not allowed
        clearInterval(timer.current); // Clear the existing timer

        setCanChange(false); // Set to false to prevent immediate changes
        setIndex(newIndex);

        setTimeout(() => {
            setCanChange(true); // Allow changes after a short delay
            setIndexDots(newIndex); // Update the dot index
        }, COOLDOWN_TIME); // Delay to allow the transition to complete
    };

    return (
        <div className={styles.banner}>
            <div
                className={styles.bannerWrapper}
                style={{ transform: `translateX(-${index * 100}%)` }} // Slide effect
                onMouseOver={() => clearInterval(timer.current)} // Pause on hover
                onMouseOut={startTimer} // Resume on mouse out
            >
                {images.map((image, i) => (
                    <img
                        key={i}
                        src={image}
                        alt={`Banner ${i + 1}`}
                        className={styles.bannerImage}
                    />
                ))}
            </div>
            <div className={styles.bannerDots}>
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`${styles.dot} ${i === indexDots ? styles.active : ''}`}
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