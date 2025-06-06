import clsx from 'clsx';
import styles from './NavigationButton.module.scss';

function NavigationButton({ handleNext, handlePrev, type, disabled }) {


    const className = clsx(styles.navigationButton, {
        [styles.nextButton]: type === 'next',
        [styles.prevButton]: type === 'prev',
        [styles.disabled]: disabled

    });

    const eventHandler = type === 'next' ? handleNext : handlePrev;

    return (
        <button className={className} onClick={eventHandler}>
            {type === 'next' ? '>' : '<'}
        </button>
    );
}

export default NavigationButton;