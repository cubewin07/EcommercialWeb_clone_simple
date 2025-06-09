import { useContext } from 'react';
import styles from './Cart.module.scss';
import EmptyCart from './EmptyCart/EmptyCart';
import { ShoppingContext } from '../../contexts/ShoppingProvider';

function Cart() {
  const { cart, totalItems, removeFromCart } = useContext(ShoppingContext);

  return totalItems > 0 ? (
    <div className={styles.cart}>
      <h1 className={styles.cartTitle}>🛒 Your Cart</h1>
      <div className={styles.cartItems}>
        {cart.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
              <h2 className={styles.itemName}>{item.name}</h2>
              <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
            </div>
            <div className={styles.priceColumn}>
              <p className={styles.unitPrice}>${item.price.toFixed(2)} / item</p>
              <p className={styles.totalPerItem}>${(item.price * item.quantity).toFixed(2)} total</p>
            </div>
            <button className={styles.removeBtn} onClick={() => removeFromCart(item.id)}>
              ✕ Remove
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cartTotal}>
        <h2>
          Grand Total: <span>${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}</span>
        </h2>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}

export default Cart;