import { useContext } from 'react';
import styles from './Cart.module.scss';
import EmptyCart from './EmptyCart/EmptyCart';
import { ShoppingContext } from '../../contexts/ShoppingProvider';

function Cart() {
  const { cart, totalItems } = useContext(ShoppingContext);

  console.log(cart);
  return totalItems > 0 ? (
    <div className={styles.cart}>
      <h1 className={styles.cartTitle}>🛒 Your Cart</h1>
      <div className={styles.cartItems}>
        {cart.map(item => (
          <div key={item.id} className={styles.cartItem}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemDetails}>
              <h2 className={styles.itemName}>{item.name}</h2>
              <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
              <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
            </div>
            <button className={styles.removeBtn} onClick={() => console.log('Remove', item.id)}>
              ✕ Remove
            </button>
          </div>
        ))}
      </div>
      <div className={styles.cartTotal}>
        <h2>Total: <span>${cart.reduce((total, item) => total + item.price, 0).toFixed(2)}</span></h2>
      </div>
    </div>
  ) : (
    <EmptyCart />
  );
}

export default Cart;