import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShoppingContext } from '../../../contexts/ShoppingProvider';
import { products } from '../../../ProductsData/Data';
import { AuthenContext } from '../../../contexts/AuthenProvider';
import styles from './ProductDetail.module.scss';

function ProductDetail() {
  const Navigate = useNavigate()

  const { productId } = useParams();
  const { addToCart, cart, updateQuantity } = useContext(ShoppingContext);
  const {isAuthenticated} = useContext(AuthenContext)
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(productId));
  const isInCart = cart.some(item => item.id === product?.id);

  if (!product) {
    return (
      <div className={styles.errorContainer}>
        <div className={styles.errorCard}>
          <div className={styles.errorIcon}>❌</div>
          <h2>Product Not Found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <button onClick={() => Navigate('/product')} className={styles.backButton}>
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if(!isAuthenticated) {
      Navigate('/login', {state: {isBrowsing: true}})
    } else {
      if (isInCart) {
        updateQuantity(product.id, quantity);
      } else {
        addToCart({ ...product, quantity });
      }
      setQuantity(1); 
    }
  };

  const handleCheckout = () => {
    // Replace this with navigation or actual checkout logic
    alert('Proceeding to checkout...');
  };

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.productGrid}>
        {/* Product Image Card */}
        <div className={styles.imageCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Product Image</h2>
          </div>
          <div className={styles.cardBody}>
            <img 
              src={product.image} 
              alt={product.name} 
              className={styles.productImage} 
            />
          </div>
        </div>

        {/* Product Info Card */}
        <div className={styles.infoCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Product Details</h2>
          </div>
          <div className={styles.cardBody}>
            <h1 className={styles.productTitle}>{product.name}</h1>
            
            <div className={styles.priceSection}>
              <span className={styles.priceLabel}>Price:</span>
              <span className={styles.productPrice}>${product.price.toFixed(2)}</span>
            </div>

            <div className={styles.ratingSection}>
              <span className={styles.ratingLabel}>Rating:</span>
              <div className={styles.productRating}>
                <span className={styles.stars}>
                  {'★'.repeat(Math.floor(product.rating))}
                  {'☆'.repeat(5 - Math.floor(product.rating))}
                </span>
                <span className={styles.ratingText}>
                  {product.rating.toFixed(1)} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className={styles.descriptionSection}>
              <h3 className={styles.descriptionTitle}>Description</h3>
              <p className={styles.productDescription}>{product.description}</p>
            </div>
          </div>
        </div>

        {/* Action Card */}
        <div className={styles.actionCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>Purchase Options</h2>
          </div>
          <div className={styles.cardBody}>
            <div className={styles.quantitySection}>
              <label className={styles.quantityLabel}>Quantity:</label>
              <div className={styles.quantityControl}>
                <button 
                  onClick={decreaseQty}
                  className={styles.quantityBtn}
                  disabled={quantity <= 1}
                >
                  −
                </button>
                <span className={styles.quantityDisplay}>{quantity}</span>
                <button 
                  onClick={increaseQty}
                  className={styles.quantityBtn}
                >
                  +
                </button>
              </div>
            </div>

            <div className={styles.totalSection}>
              <span className={styles.totalLabel}>Total:</span>
              <span className={styles.totalPrice}>
                ${(product.price * quantity).toFixed(2)}
              </span>
            </div>

            <div className={styles.actionButtons}>
              <button
                className={styles.addToCartButton}
                onClick={handleAddToCart}
              >
                {isInCart ? 'Update Cart' : 'Add to Cart'}
              </button>

              <button 
                className={styles.checkoutButton} 
                onClick={handleCheckout}
              >
                Buy Now
              </button>
            </div>

            {!isAuthenticated && (
              <div className={styles.loginPrompt}>
                <p>Please log in to add items to your cart</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
