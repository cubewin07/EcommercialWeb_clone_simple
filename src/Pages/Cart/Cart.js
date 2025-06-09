import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Cart.module.scss';
import EmptyCart from './EmptyCart/EmptyCart';
import { ShoppingContext } from '../../contexts/ShoppingProvider';

function Cart() {
    const { cart, totalItems, totalPrice,removeFromCart, increaseItemQuantity, decreaseItemQuantity, updateQuantity } = useContext(ShoppingContext);
    const [removingItemId, setRemovingItemId] = useState(null);

    const handleRemoveItem = (id) => {
        setRemovingItemId(id);
        setTimeout(() => {
            removeFromCart(id);
            setRemovingItemId(null);
        }, 300); // Match animation duration
    };

    const handleQuantityChange = (id, quantity) => {
        if (quantity === 0) {
            setRemovingItemId(id);
            setTimeout(() => {
                removeFromCart(id);
                setRemovingItemId(null);
            }, 300); // Match animation duration
        } else {
            updateQuantity(id, quantity);
        }
    };

    return (
        totalItems > 0 ? (
            <div className={styles.cart}>
                <h1 className={styles.cartTitle}>🛒 Your Cart</h1>
                <div className={styles.cartItems}>
                    <AnimatePresence>
                        {cart.map(item => (
                            <motion.div
                                key={item.id}
                                className={styles.cartItem}
                                initial={{ opacity: 1, scale: 1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <img src={item.image} alt={item.name} className={styles.itemImage} />
                                <div className={styles.itemDetails}>
                                    <h2 className={styles.itemName}>{item.name}</h2>
                                    <div className={styles.quantityControl}>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                        >
                                            −
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className={styles.qtyBtn}
                                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.priceColumn}>
                                    <p className={styles.unitPrice}>${item.price.toFixed(2)} / item</p>
                                    <p className={styles.totalPerItem}>${(item.price * item.quantity).toFixed(2)} total</p>
                                </div>
                                <button
                                    className={styles.removeBtn}
                                    onClick={() => handleRemoveItem(item.id)}
                                >
                                    ✕ Remove
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
                <div className={styles.cartTotal}>
                    <h2>
                        Grand Total: <span>${totalPrice.toFixed(2)}</span>
                    </h2>
                </div>
            </div>
        ) :
        <EmptyCart />
    );
}

export default Cart;