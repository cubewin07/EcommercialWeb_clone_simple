import { useContext } from 'react';
import { motion } from 'framer-motion';
import ProductCom from '../../components/ProductDisplay/ProductCom';
import styles from './Product.module.scss';
import { products } from '../../ProductsData/Data.js';
import ToolTipWrapper from '../../components/ToolTip/ToolTipWrapper.js';
import { ShoppingContext } from '../../contexts/ShoppingProvider.js';
import ProductTooltipCard from '../../components/ToolTip/TooltipCard/TooltipCard.js';

function Product() {
  const { cart } = useContext(ShoppingContext);

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.07 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className={styles.page}>
      <motion.div
        className={styles.hero}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className={styles.pageTitle}>All Products</h1>
        <p className={styles.pageSubtitle}>
          {products.length} curated items — discover something extraordinary
        </p>
      </motion.div>

      <motion.div
        className={styles.productGrid}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product) => {
          const productInCart = cart.filter((c) => c.id === product.id);
          const quantity = productInCart.length !== 0 ? productInCart[0].quantity : 0;
          return (
            <motion.div key={product.id} variants={itemVariants}>
              <ToolTipWrapper
                tooltipText={
                  <ProductTooltipCard
                    rating={product.rating}
                    reviews={product.reviews}
                    quantity={quantity}
                  />
                }
              >
                <ProductCom
                  id={product.id}
                  title={product.name}
                  description={product.description}
                  price={product.price}
                  image={product.image}
                  featured={product.featured}
                />
              </ToolTipWrapper>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}

export default Product;