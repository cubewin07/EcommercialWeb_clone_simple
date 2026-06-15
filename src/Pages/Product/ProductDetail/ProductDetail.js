import { useNavigate, useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingContext } from '../../../contexts/ShoppingProvider';
import { products } from '../../../ProductsData/Data';
import { AuthenContext } from '../../../contexts/AuthenProvider';
import styles from './ProductDetail.module.scss';

function ProductDetail() {
  const Navigate = useNavigate();
  const { productId } = useParams();
  const { addToCart, cart, updateQuantity } = useContext(ShoppingContext);
  const { isAuthenticated } = useContext(AuthenContext);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const product = products.find((p) => p.id === parseInt(productId));
  const isInCart = cart.some((item) => item.id === product?.id);

  if (!product) {
    return (
      <motion.div
        className={styles.errorPage}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className={styles.errorContent}>
          <motion.span
            className={styles.errorIcon}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            ✕
          </motion.span>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/product" className={styles.backBtn}>← Back to Products</Link>
        </div>
      </motion.div>
    );
  }

  const handleAddToCart = () => {
    if (!isAuthenticated) { Navigate('/login', { state: { isBrowsing: true } }); return; }
    if (isInCart) { updateQuantity(product.id, quantity); } else { addToCart({ ...product, quantity }); }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
    setQuantity(1);
  };

  const relatedProducts = products.filter((p) => p.id !== product.id && p.featured).slice(0, 3);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay = 0) => ({
      opacity: 1, y: 0,
      transition: { delay, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
    }),
  };

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span className={styles.separator}>/</span>
        <Link to="/product">Products</Link>
        <span className={styles.separator}>/</span>
        <span className={styles.current}>{product.name}</span>
      </nav>

      <div className={styles.grid}>
        {/* Image Panel */}
        <motion.div
          className={styles.imagePanel}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className={styles.imageWrap}>
            {!imageLoaded && (
              <div className={styles.skeleton}>
                <div className={styles.pulsePlaceholder} />
              </div>
            )}
            <motion.img
              src={product.image}
              alt={product.name}
              className={styles.image}
              initial={{ scale: 1.05, opacity: 0 }}
              animate={imageLoaded ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              onLoad={() => setImageLoaded(true)}
            />
            {product.featured && (
              <motion.span
                className={styles.featuredBadge}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4, type: 'spring', stiffness: 400, damping: 25 }}
              >
                ★ Featured
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Info Panel */}
        <motion.div
          className={styles.infoPanel}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.category}>Premium Collection</span>
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.rating}>
            <span className={styles.stars}>
              {'★'.repeat(Math.floor(product.rating))}
              {'☆'.repeat(5 - Math.floor(product.rating))}
            </span>
            <span className={styles.ratingText}>{product.rating} ({product.reviews} reviews)</span>
          </div>

          <div className={styles.priceBlock}>
            <span className={styles.price}>${product.price.toFixed(2)}</span>
            <span className={styles.taxNote}>Inclusive of all taxes</span>
          </div>

          <p className={styles.description}>{product.description}</p>

          <div className={styles.divider} />

          {/* Quantity */}
          <div className={styles.qtySection}>
            <label className={styles.qtyLabel}>Quantity</label>
            <div className={styles.qtyControl}>
              <motion.button
                className={styles.qtyBtn}
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                whileTap={{ scale: 0.9 }}
              >
                −
              </motion.button>
              <AnimatePresence mode="wait">
                <motion.span
                  key={quantity}
                  className={styles.qtyDisplay}
                  initial={{ y: -8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {quantity}
                </motion.span>
              </AnimatePresence>
              <motion.button
                className={styles.qtyBtn}
                onClick={() => setQuantity((q) => q + 1)}
                whileTap={{ scale: 0.9 }}
              >
                +
              </motion.button>
            </div>
          </div>

          {/* Total */}
          <div className={styles.totalRow}>
            <span>Total</span>
            <motion.span
              className={styles.total}
              key={quantity}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            >
              ${(product.price * quantity).toFixed(2)}
            </motion.span>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <motion.button
              className={`${styles.addCartBtn} ${added ? styles.added : ''}`}
              onClick={handleAddToCart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              {added ? (
                <motion.span
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                >
                  ✓ Added to Cart
                </motion.span>
              ) : isInCart ? (
                'Update Cart'
              ) : (
                'Add to Cart'
              )}
            </motion.button>
            <motion.button
              className={styles.buyBtn}
              onClick={() => Navigate('/cart')}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Buy Now
            </motion.button>
          </div>

          {!isAuthenticated && (
            <p className={styles.loginHint}>
              <Link to="/login">Sign in</Link> to save items to your cart
            </p>
          )}
        </motion.div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <motion.section
          className={styles.related}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className={styles.relatedTitle}>
            You May Also{' '}
            <span className="gradient-text">Like</span>
          </h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.1, duration: 0.4 }}
              >
                <Link to={`/product/${p.id}`} className={styles.relatedCard}>
                  <div className={styles.relatedImgWrap}>
                    <img src={p.image} alt={p.name} className={styles.relatedImg} />
                  </div>
                  <div className={styles.relatedInfo}>
                    <span className={styles.relatedName}>{p.name}</span>
                    <span className={styles.relatedPrice}>${p.price.toFixed(2)}</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}

export default ProductDetail;