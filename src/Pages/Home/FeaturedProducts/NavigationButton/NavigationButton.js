import clsx from 'clsx';
import styles from './NavigationButton.module.scss';

function NavigationButton({ handleNext, handlePrev, type }) {

    const className = clsx(styles.navigationButton, {
        [styles.nextButton]: type === 'next',
        [styles.prevButton]: type === 'prev',
    });

    const eventHandler = type === 'next' ? handleNext : handlePrev;

    return (
        <button className={className} onClick={eventHandler}>
            {type === 'next' ? '>' : '<'}
        </button>
    );
}

export default NavigationButton;