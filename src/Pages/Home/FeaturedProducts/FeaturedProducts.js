import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './FeaturedProducts.module.scss';
import { ShoppingContext } from '../../../contexts/ShoppingProvider.js';
import { AuthenContext } from '../../../contexts/AuthenProvider.js';

const FeaturedProductsData = [
  { id: 1, name: 'Product 1', price: 29.99, image: `${process.env.PUBLIC_URL}/assets/images/product1.jpg`, description: 'This is a great product.', featured: true, rating: 5, reviews: 100 },
  { id: 2, name: 'Product 2', price: 39.99, image: `${process.env.PUBLIC_URL}/assets/images/product2.jpg`, description: 'This product is even better.', featured: true, rating: 4.9, reviews: 134 },
  { id: 3, name: 'Product 3', price: 49.99, image: `${process.env.PUBLIC_URL}/assets/images/product3.jpg`, description: 'You will love this product.', featured: true, rating: 5, reviews: 134 },
  { id: 4, name: 'Product 4', price: 59.99, image: `${process.env.PUBLIC_URL}/assets/images/product4.jpg`, description: 'This is the best product we offer.', featured: true, rating: 5, reviews: 45 },
  { id: 5, name: 'Product 5', price: 69.99, image: `${process.env.PUBLIC_URL}/assets/images/product5.jpg`, description: "An amazing product that you can't miss.", featured: true, rating: 5, reviews: 49 },
  { id: 6, name: 'Product 6', price: 79.99, image: `${process.env.PUBLIC_URL}/assets/images/product6.jpg`, description: 'A product that combines quality and value.', featured: true, rating: 5, reviews: 108 },
  { id: 7, name: 'Product 7', price: 89.99, image: `${process.env.PUBLIC_URL}/assets/images/product7.jpg`, description: 'A premium product for discerning customers.', rating: 4.8, reviews: 130 },
  { id: 8, name: 'Product 8', price: 99.99, image: `${process.env.PUBLIC_URL}/assets/images/product8.jpg`, description: 'An exclusive product with limited availability.', rating: 4.7, reviews: 14 },
  { id: 9, name: 'Product 9', price: 109.99, image: `${process.env.PUBLIC_URL}/assets/images/product9.jpg`, description: 'A product that sets new standards.', rating: 4.5, reviews: 190 },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.08,
      duration: 0.55,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

function FeaturedProducts() {
  const [showModal, setShowModal] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useContext(ShoppingContext);
  const { isAuthenticated } = useContext(AuthenContext);
  const navigate = useNavigate();

  const handleProductClick = (product) => navigate(`/product/${product.id}`);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!isAuthenticated) { setShowModal(true); return; }
    addToCart({ id: product.id, name: product.name, price: parseFloat(product.price), image: product.image, quantity: 1 });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  return (
    <>
      <section className={styles.section}>
        {/* ── Section Header ── */}
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <motion.span
              className={styles.eyebrow}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
            >
              Curated Selection
            </motion.span>
            <h2 className={styles.title}>
              Featured{' '}
              <span className="gradient-text">Products</span>
            </h2>
          </div>
          <p className={styles.subtitle}>
            Hand-picked items that combine exceptional quality with timeless design.
          </p>
        </motion.div>

        {/* ── Product Grid ── */}
        <motion.div
          className={styles.productGrid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {FeaturedProductsData.map((product, i) => (
            <motion.div
              key={product.id}
              className={styles.productCard}
              variants={cardVariants}
              custom={i}
              onClick={() => handleProductClick(product)}
              whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            >
              <div className={styles.imageWrap}>
                <motion.img
                  src={product.image}
                  alt={product.name}
                  className={styles.image}
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className={styles.imageOverlay} />
                {/* Badge */}
                <motion.span
                  className={styles.badge}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + i * 0.05, type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {product.featured ? '★ Featured' : '✦ New'}
                </motion.span>
                {/* Hover action */}
                <div className={styles.hoverActions}>
                  <button
                    className={`${styles.addBtn} ${addedId === product.id ? styles.added : ''}`}
                    onClick={(e) => handleAddToCart(e, product)}
                  >
                    {addedId === product.id ? (
                      <motion.span
                        key="added"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        className={styles.addedText}
                      >
                        ✓ Added
                      </motion.span>
                    ) : (
                      <motion.span
                        key="add"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        + Add to Cart
                      </motion.span>
                    )}
                  </button>
                </div>
              </div>

              <div className={styles.info}>
                <div className={styles.meta}>
                  <span className={styles.category}>Category</span>
                  <span className={styles.rating}>
                    <span className={styles.stars}>{'★'.repeat(Math.floor(product.rating))}</span>
                    <span className={styles.ratingNum}>{product.rating}</span>
                    <span className={styles.reviewCount}>({product.reviews})</span>
                  </span>
                </div>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.desc}>{product.description}</p>
                <div className={styles.footer}>
                  <span className={styles.price}>${product.price.toFixed(2)}</span>
                  <motion.button
                    className={styles.quickAdd}
                    onClick={(e) => handleAddToCart(e, product)}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Add to cart"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.2 13.3a1 1 0 0 0 1 .7h9.4a1 1 0 0 0 1-.8L23 6H6" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All */}
        <motion.div
          className={styles.viewAll}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <a href="/product" className={styles.viewAllBtn}>
            View All Products
            <motion.svg
              width="16" height="16" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </a>
        </motion.div>
      </section>

      {/* Login Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={styles.modalIcon}>🔒</div>
              <h3 className={styles.modalTitle}>Sign In Required</h3>
              <p>Please sign in to add items to your cart.</p>
              <div className={styles.modalActions}>
                <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
                <button onClick={() => { setShowModal(false); navigate('/login'); }} className={styles.signInBtn}>Sign In</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default FeaturedProducts;