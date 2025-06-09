import styles from './EmptyCart.module.scss';

function EmptyCart() {
    return (
        <div className={styles.cart}>
            <div className={styles.cartHeader}>
                <h1 className={styles.cartTitle}>Your Cart</h1>
                <p className={styles.cartMessage}>Your cart is currently empty.</p>
            </div>
            <div className={styles.cartContent}>
                <img src="/assets/images/empty-cart.png" alt="Empty Cart" className={styles.emptyCartImage} />
                <p className={styles.cartPrompt}>Browse our products to add items to your cart!</p>
                <button className={styles.shopButton}>Start Shopping</button>
            </div>
        </div>
    );
}

export default EmptyCart;