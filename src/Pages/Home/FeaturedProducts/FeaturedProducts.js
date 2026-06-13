import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './FeaturedProducts.module.scss';
import NavigationButton from './NavigationButton/NavigationButton.js';
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

function FeaturedProducts() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const productsPerPage = 3;
  const { addToCart } = useContext(ShoppingContext);
  const { isAuthenticated } = useContext(AuthenContext);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentIndex + productsPerPage < FeaturedProductsData.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const handlePrev = () => {
    if (currentIndex - productsPerPage >= 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  const handleProductClick = (product) => navigate(`/product/${product.id}`);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    if (!isAuthenticated) { setShowModal(true); return; }
    addToCart({ id: product.id, name: product.name, price: parseFloat(product.price), image: product.image, quantity: 1 });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <>
      <section className={styles.section}>
        <motion.div
          className={styles.header}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <span className={styles.eyebrow}>Curated Selection</span>
            <h2 className={styles.title}>Featured Products</h2>
          </div>
          <p className={styles.subtitle}>
            Hand-picked items that combine exceptional quality with timeless design.
          </p>
        </motion.div>

        <div className={styles.carouselWrap}>
          <motion.div
            className={styles.productList}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
          >
            {FeaturedProductsData.map((product) => (
              <motion.div
                key={product.id}
                className={styles.productCard}
                variants={itemVariants}
                onClick={() => handleProductClick(product)}
              >
                <div className={styles.imageWrap}>
                  <img src={product.image} alt={product.name} className={styles.image} />
                  <div className={styles.imageOverlay} />
                  <span className={styles.badge}>
                    {product.featured ? '★ Featured' : '✦ New'}
                  </span>
                  <div className={styles.hoverActions}>
                    <button
                      className={`${styles.addBtn} ${addedId === product.id ? styles.added : ''}`}
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      {addedId === product.id ? '✓ Added' : '+ Add to Cart'}
                    </button>
                  </div>
                </div>
                <div className={styles.info}>
                  <div className={styles.meta}>
                    <span className={styles.category}>Category</span>
                    <span className={styles.rating}>★ {product.rating} ({product.reviews})</span>
                  </div>
                  <h3 className={styles.name}>{product.name}</h3>
                  <p className={styles.desc}>{product.description}</p>
                  <div className={styles.footer}>
                    <span className={styles.price}>${product.price.toFixed(2)}</span>
                    <button
                      className={styles.quickAdd}
                      onClick={(e) => handleAddToCart(e, product)}
                      aria-label="Add to cart"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.2 13.3a1 1 0 0 0 1 .7h9.4a1 1 0 0 0 1-.8L23 6H6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <NavigationButton
          disabledNext={currentIndex >= FeaturedProductsData.length - productsPerPage}
          disabledPrev={currentIndex === 0}
          handleNext={handleNext}
          handlePrev={handlePrev}
        />

        <div className={styles.viewAll}>
          <a href="/product" className={styles.viewAllBtn}>
            View All Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </section>

      {showModal && (
        <div className={styles.modalOverlay} onClick={() => setShowModal(false)}>
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Sign In Required</h3>
            <p>Please sign in to add items to your cart.</p>
            <div className={styles.modalActions}>
              <button onClick={() => setShowModal(false)} className={styles.cancelBtn}>Cancel</button>
              <button onClick={() => { setShowModal(false); navigate('/login'); }} className={styles.signInBtn}>Sign In</button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}

export default FeaturedProducts;