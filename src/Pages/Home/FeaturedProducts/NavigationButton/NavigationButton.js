import styles from './NavigationButton.module.scss';

function NavigationButton({ handleNext, handlePrev, type }) {
    return (
        type === 'next' ? (
            <button className={`${styles.navigationButton} ${styles.nextButton}`} onClick={handleNext}>
                &gt;
            </button>
        ) : (
            <button className={`${styles.navigationButton} ${styles.prevButton}`} onClick={handlePrev}>
                &lt;
            </button>
        )
    );
}

export default NavigationButton;