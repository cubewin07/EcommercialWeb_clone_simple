import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import BannerProduct from "./bannerProduct/BannerProduct.js";
import styles from './ProductCom.module.scss';

function ProductCom({ banner, id, title, description, price, image, featured }) {
    const navigate = useNavigate();

    if (banner) {
        return <BannerProduct />;
    }

    return (
        <motion.div
            className={styles.productCard}
            onClick={() => navigate(`/product/${id}`, { replace: true })}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/product/${id}`, { replace: true });
                }
            }}
            role="button"
            tabIndex={0}
            whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.imageWrap}>
                <motion.img
                    src={image}
                    alt={title}
                    className={styles.productImage}
                    whileHover={{ scale: 1.08 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <div className={styles.imageOverlay} />

                {featured && (
                    <motion.span
                        className={styles.featuredBadge}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 25 }}
                    >
                        ★ Featured
                    </motion.span>
                )}

                {/* Quick look shimmer on hover */}
                <motion.div
                    className={styles.quickLook}
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <span className={styles.quickLookText}>Quick View</span>
                </motion.div>
            </div>

            <div className={styles.productDetails}>
                <div className={styles.meta}>
                    <span className={styles.category}>Category</span>
                    {featured && <span className={styles.hotTag}>Hot</span>}
                </div>
                <h2 className={styles.productTitle}>{title}</h2>
                <p className={styles.productDescription}>{description}</p>
                <div className={styles.priceRow}>
                    <span className={styles.productPrice}>${price.toFixed(2)}</span>
                    <motion.button
                        className={styles.addBtn}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/product/${id}`, { replace: true });
                        }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label={`View ${title}`}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="11" cy="11" r="8" />
                            <line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
}

export default ProductCom;