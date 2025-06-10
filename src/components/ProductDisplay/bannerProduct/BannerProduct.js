import { useContext } from 'react';

import styles from './BannerProduct.module.scss'
import { BannerContext } from '../../../Pages/Home/Banner/Banner';
function BannerProduct() {
    const { images ,index, setIndex, indexDots, setIndexDots, handleChangeImage, totalImages, timer, startTimer } = useContext(BannerContext);
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

export default BannerProduct;