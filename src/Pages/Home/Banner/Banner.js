import { useEffect, useState, useRef     } from "react";
import styles from './Banner.module.scss'

const TIME_CHANGE = 5000; // Time in milliseconds to change the image

function Banner({ images }) {
    const [index, setIndex] = useState(0);
    const [isChanging, setIsChanging] = useState(false);
    const timer = useRef(null);
    const totalImages = images.length;

    useEffect(() => {
        timer.current = setInterval(() => {
            setIndex( prevIndex => prevIndex === totalImages - 1 ? 0 : prevIndex + 1);
            if(isChanging) {
                setIsChanging(false);
            }
        }, TIME_CHANGE); // Change image every 3 seconds
        return () => clearInterval(timer.current); // Cleanup interval on component unmount
    }, [totalImages, isChanging]);

    const handleChangeImage = (newIndex) => {
        setIsChanging(true);
        setIndex(newIndex);
        if (timer.current) {
            clearInterval(timer.current); // Clear the existing timer
        }
    };
    return ( 
        <div className={styles.banner}>
            <img src={images[index]} alt="Banner" className={styles.bannerImage} />
            {/* <div className={styles.bannerDots}>
                {images.map((_, i) => (
                    <span 
                        key={i} 
                        className={`${styles.dot} ${i === index ? styles.active : ''}`} 
                        onClick={() => setIndex(i)}
                    ></span>
                ))}
            </div> */}
            <div className={styles.ChangeBanner}>
                <button 
                    className={styles.prevButton}
                    onClick={() => setIndex(prevIndex => handleChangeImage(prevIndex === 0 ? totalImages - 1 : prevIndex - 1))}
                >
                    &lt;
                </button>
                <button 
                    className={styles.nextButton}
                    onClick={() => setIndex(prevIndex => handleChangeImage(prevIndex === totalImages - 1 ? 0 : prevIndex + 1))}
                >
                    &gt;
                </button>
            </div>    
        </div>
     );
}

export default Banner;