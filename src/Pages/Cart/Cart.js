import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShoppingContext } from '../../contexts/ShoppingProvider';
import { AuthenContext } from '../../contexts/AuthenProvider';
import styles from './Cart.module.scss';

function Cart() {
  const { cart, totalItems, totalPrice, removeFromCart, increaseItemQuantity, decreaseItemQuantity, updateQuantity } = useContext(ShoppingContext);
  const { isAuthenticated } = useContext(AuthenContext);
  const navigate = useNavigate();
  const [shippingProgress, setShippingProgress] = useState(0); // 0-100 % free shipping progress

  // Example: free shipping threshold $200
  const FREE_SHIPPING_THRESHOLD = 200;
  const progress = Math.min(100, Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleQtyChange = (id, newQty) => {
    if (newQty <= 0) {
      removeFromCart(id);
    } else {
      updateQuantity(id, newQty);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { isBrowsing: true } });
    } else {
      // Simulate checkout flow placeholder
      alert('Proceeding to checkout');
    }
  };

  return (
    <div className={styles.cart}>
      {totalItems > 0 ? (
        <>
          <h1 className={styles.cartTitle}>🛒 Your Cart</h1>

          {/* Free shipping progress bar */}
          <div className={styles.shippingBar}>
            <div className={styles.progressLabel}>Free shipping threshold: ${FREE_SHIPPING_THRESHOLD}</div>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${progress}%` }} />
            </div>
            <div className={styles.progressInfo}>${totalPrice.toFixed(2)} / ${FREE_SHIPPING_THRESHOLD}</div>
          </div>

          <div className={styles.cartItems}>
            <AnimatePresence>
              {cart.map(item => (
                <motion.div
                  key={item.id}
                  className={styles.cartItem}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
                >
                  <img src={item.image} alt={item.name} className={styles.itemImage} />
                  <div className={styles.itemDetails}>
                    <h2 className={styles.itemName}>{item.name}</h2>
                    <div className={styles.quantityControl}>
                      <button className={styles.qtyBtn} onClick={() => handleQtyChange(item.id, item.quantity - 1)}>−</button>
                      <span className={styles.qtyDisplay}>{item.quantity}</span>
                      <button className={styles.qtyBtn} onClick={() => handleQtyChange(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className={styles.priceColumn}>
                    <p className={styles.unitPrice}>${item.price.toFixed(2)} / item</p>
                    <p className={styles.totalPerItem}>${(item.price * item.quantity).toFixed(2)} total</p>
                  </div>
                  <button className={styles.removeBtn} onClick={() => handleRemove(item.id)}>✕ Remove</button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          <div className={styles.cartTotal}>
            <h2>
              Grand Total: <span>${totalPrice.toFixed(2)}</span>
            </h2>
            <button className={styles.checkoutButton} onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      ) : (
        <div className={styles.emptyCart}>
          <h2>Your cart is empty.</h2>
          <p>Explore our <a href="/product" className={styles.link}>product catalog</a> to add items.</p>
        </div>
      )}
    </div>
  );
}

export default Cart;