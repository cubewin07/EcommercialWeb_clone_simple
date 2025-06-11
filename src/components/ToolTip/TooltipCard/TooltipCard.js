import styles from './ProductTooltipCard.module.scss';

function ProductTooltipCard({ rating, reviews, quantity }) {
  return (
    <div className={styles.tooltipCard}>
      <div className={styles.row}>
        <span className={styles.label}>Rating:</span>
        <span className={styles.value}>
          {'★'.repeat(Math.floor(rating))}
          {'☆'.repeat(5 - Math.floor(rating))} ({rating.toFixed(1)})
        </span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>Reviews:</span>
        <span className={styles.value}>{reviews} reviews</span>
      </div>

      <div className={styles.row}>
        <span className={styles.label}>In Cart:</span>
        <span className={styles.value}> {quantity} item(s) in cart</span>
      </div>
    </div>
  );
}

export default ProductTooltipCard;