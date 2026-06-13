import { useNavigate, useParams, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';
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

  const product = products.find((p) => p.id === parseInt(productId));
  const isInCart = cart.some((item) => item.id === product?.id);

  if (!product) {
    return (
      <div className={styles.errorPage}>
        <div className={styles.errorContent}>
          <span className={styles.errorIcon}>✕</span>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Link to="/product" className={styles.backBtn}>← Back to Products</Link>
        </div>
      </div>
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

  return (
    <motion.div
      className={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Breadcrumb */}
      <nav className={styles.breadcrumb}>
        <Link to="/">Home</Link>
        <span> / </span>
        <Link to="/product">Products</Link>
        <span> / </span>
        <span>{product.name}</span>
      </nav>

      <div className={styles.grid}>
        {/* Image */}
        <motion.div
          className={styles.imagePanel}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className={styles.imageWrap}>
            <img src={product.image} alt={product.name} className={styles.image} />
            {product.featured && <span className={styles.featuredBadge}>★ Featured</span>}
          </div>
        </motion.div>

        {/* Info */}
        <motion.div
          className={styles.infoPanel}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className={styles.category}>Premium Collection</span>
          <h1 className={styles.name}>{product.name}</h1>

          <div className={styles.rating}>
            <span className={styles.stars}>{'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}</span>
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
              <button className={styles.qtyBtn} onClick={() => setQuantity((q) => Math.max(1, q - 1))}>−</button>
              <span className={styles.qtyDisplay}>{quantity}</span>
              <button className={styles.qtyBtn} onClick={() => setQuantity((q) => q + 1)}>+</button>
            </div>
          </div>

          {/* Total */}
          <div className={styles.totalRow}>
            <span>Total</span>
            <span className={styles.total}>${(product.price * quantity).toFixed(2)}</span>
          </div>

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={`${styles.addCartBtn} ${added ? styles.added : ''}`}
              onClick={handleAddToCart}
            >
              {added ? '✓ Updated in Cart' : isInCart ? 'Update Cart' : 'Add to Cart'}
            </button>
            <button className={styles.buyBtn} onClick={() => Navigate('/cart')}>
              Buy Now
            </button>
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
        <section className={styles.related}>
          <h2 className={styles.relatedTitle}>You May Also Like</h2>
          <div className={styles.relatedGrid}>
            {relatedProducts.map((p) => (
              <Link key={p.id} to={`/product/${p.id}`} className={styles.relatedCard}>
                <img src={p.image} alt={p.name} className={styles.relatedImg} />
                <div className={styles.relatedInfo}>
                  <span className={styles.relatedName}>{p.name}</span>
                  <span className={styles.relatedPrice}>${p.price.toFixed(2)}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </motion.div>
  );
}

export default ProductDetail;