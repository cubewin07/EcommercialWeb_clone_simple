import clsx from 'clsx';
import styles from './NavigationButton.module.scss';

function NavigationButton({ handleNext, handlePrev, type, disabledNext, disabledPrev, disabled }) {
  const isNext = type === 'next';
  const isDisabled = isNext ? disabledNext : disabledPrev;

  const className = clsx(
    styles.navigationButton,
    isNext ? styles.nextButton : styles.prevButton,
    (isDisabled || disabled) && styles.disabled
  );

  return (
    <button
      className={className}
      onClick={isNext ? handleNext : handlePrev}
      disabled={isDisabled || disabled}
      aria-label={isNext ? 'Next products' : 'Previous products'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        {isNext
          ? <path d="M9 18l6-6-6-6" />
          : <path d="M15 18l-6-6 6-6" />
        }
      </svg>
    </button>
  );
}

export default NavigationButton;