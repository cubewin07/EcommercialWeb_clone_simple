import { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingContext } from '../../contexts/ShoppingProvider';
import { AuthenContext } from '../../contexts/AuthenProvider';
import styles from './Cart.module.scss';

const itemVariants = {
  initial: { opacity: 0, x: -40, height: 0 },
  animate: { opacity: 1, x: 0, height: 'auto', transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, x: 40, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
};

function Cart() {
  const { cart, totalItems, totalPrice, removeFromCart, updateQuantity } = useContext(ShoppingContext);
  const { isAuthenticated } = useContext(AuthenContext);
  const navigate = useNavigate();

  const FREE_SHIPPING_THRESHOLD = 200;
  const progress = Math.min(100, Math.round((totalPrice / FREE_SHIPPING_THRESHOLD) * 100));

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
      alert('Proceeding to checkout');
    }
  };

  return (
    <motion.div
      className={styles.cart}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence mode="wait">
        {totalItems > 0 ? (
          <motion.div
            key="has-items"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* ── Title ── */}
            <motion.h1
              className={styles.cartTitle}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              Your Cart
              <span className={styles.itemCount}>{totalItems}</span>
            </motion.h1>

            {/* ── Free Shipping Progress ── */}
            <motion.div
              className={styles.shippingBar}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              {progress >= 100 ? (
                <div className={styles.congratsMsg}>
                  🎉 You've earned free shipping!
                </div>
              ) : (
                <>
                  <div className={styles.progressLabel}>
                    Add <strong>${(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)}</strong> more for free shipping
                  </div>
                  <div className={styles.progressTrack}>
                    <motion.div
                      className={styles.progressFill}
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </div>
                  <div className={styles.progressInfo}>
                    <span>${totalPrice.toFixed(2)}</span>
                    <span>${FREE_SHIPPING_THRESHOLD}</span>
                  </div>
                </>
              )}
            </motion.div>

            {/* ── Cart Items ── */}
            <div className={styles.cartItems}>
              <AnimatePresence>
                {cart.map((item, i) => (
                  <motion.div
                    key={item.id}
                    className={styles.cartItem}
                    variants={itemVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    layout
                    transition={{ delay: i * 0.05 }}
                  >
                    <motion.img
                      src={item.image}
                      alt={item.name}
                      className={styles.itemImage}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    />

                    <div className={styles.itemDetails}>
                      <Link to={`/product/${item.id}`} className={styles.itemName}>
                        {item.name}
                      </Link>
                      <span className={styles.itemPrice}>${item.price.toFixed(2)} each</span>

                      <div className={styles.quantityControl}>
                        <motion.button
                          className={styles.qtyBtn}
                          onClick={() => handleQtyChange(item.id, item.quantity - 1)}
                          whileTap={{ scale: 0.9 }}
                        >
                          −
                        </motion.button>
                        <motion.span
                          className={styles.qtyDisplay}
                          key={item.quantity}
                          initial={{ scale: 1.2 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.quantity}
                        </motion.span>
                        <motion.button
                          className={styles.qtyBtn}
                          onClick={() => handleQtyChange(item.id, item.quantity + 1)}
                          whileTap={{ scale: 0.9 }}
                        >
                          +
                        </motion.button>
                      </div>
                    </div>

                    <div className={styles.itemTotal}>
                      <span className={styles.totalLabel}>Subtotal</span>
                      <span className={styles.totalValue}>
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>

                    <motion.button
                      className={styles.removeBtn}
                      onClick={() => removeFromCart(item.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                      </svg>
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Summary & Checkout ── */}
            <motion.div
              className={styles.cartTotal}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className={styles.summaryRow}>
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className={styles.summaryRow}>
                <span>Shipping</span>
                <span className={styles.freeTag}>{progress >= 100 ? 'Free' : `$${(FREE_SHIPPING_THRESHOLD - totalPrice).toFixed(2)} away`}</span>
              </div>
              <div className={`${styles.summaryRow} ${styles.grandTotal}`}>
                <span>Total</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <motion.button
                className={styles.checkoutButton}
                onClick={handleCheckout}
                whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(45, 212, 191, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>

              <Link to="/product" className={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            className={styles.emptyCart}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className={styles.emptyIcon}
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.2 13.3a1 1 0 0 0 1 .7h9.4a1 1 0 0 0 1-.8L23 6H6" />
              </svg>
            </motion.div>
            <h2 className={styles.emptyTitle}>Your Cart is Empty</h2>
            <p className={styles.emptyText}>
              Looks like you haven't added anything yet. Discover our curated collection.
            </p>
            <Link to="/product" className={styles.exploreBtn}>
              Explore Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Cart;