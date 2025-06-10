import { useParams } from 'react-router-dom';
import { useContext, useState } from 'react';
import { ShoppingContext } from '../../../contexts/ShoppingProvider';
import { products } from '../../../Products/Data';
import styles from './ProductDetail.module.scss';

function ProductDetail() {
  const { productId } = useParams();
  const { addToCart, cart, updateQuantity } = useContext(ShoppingContext);
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === parseInt(productId));
  const isInCart = cart.some(item => item.id === product?.id);

  if (!product) {
    return <div className={styles.errorMessage}>Product not found.</div>;
  }

  const handleAddToCart = () => {
    if (isInCart) {
      updateQuantity(product.id, quantity);
    } else {
      addToCart({ ...product, quantity });
    }
    setQuantity(1); 
  };

  const handleCheckout = () => {
    // Replace this with navigation or actual checkout logic
    alert('Proceeding to checkout...');
  };

  const increaseQty = () => setQuantity(q => q + 1);
  const decreaseQty = () => setQuantity(q => (q > 1 ? q - 1 : 1));

  return (
    <div className={styles.productDetail}>
      <img src={product.image} alt={product.name} className={styles.productImage} />

      <div className={styles.productInfo}>
        <h1 className={styles.productTitle}>{product.name}</h1>
        <p className={styles.productPrice}>${product.price.toFixed(2)}</p>
        <div className={styles.productRating}>
          <span className={styles.stars}>
            {'★'.repeat(Math.floor(product.rating))}{'☆'.repeat(5 - Math.floor(product.rating))}
          </span>
          <span className={styles.ratingText}>{product.rating.toFixed(1)} ({product.reviews} reviews)</span>
        </div>
        <p className={styles.productDescription}>{product.description}</p>

        <div className={styles.quantityControl}>
          <button onClick={decreaseQty}>−</button>
          <span>{quantity}</span>
          <button onClick={increaseQty}>+</button>
        </div>

        <div className={styles.actionButtons}>
          <button
            className={styles.addToCartButton}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>

          <button className={styles.checkoutButton} onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
