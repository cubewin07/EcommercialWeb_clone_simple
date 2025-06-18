import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FeaturedProducts.module.scss';
import NavigationButton from './NavigationButton/NavigationButton.js';
import { ShoppingContext } from '../../../contexts/ShoppingProvider.js';
import { AuthenContext } from '../../../contexts/AuthenProvider.js';

const FeaturedProductsData = [
    {
        id: 1,
        name: 'Product 1',
        price: 29.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product1.jpg`,
        description: 'This is a great product.',
        featured: true,
        rating: 5,
        reviews: 100,
      },
      {
        id: 2,
        name: 'Product 2',
        price: 39.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product2.jpg`,
        description: 'This product is even better.',
        featured: true,
        rating: 4.9,
        reviews: 134,
      },
      {
        id: 3,
        name: 'Product 3',
        price: 49.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product3.jpg`,
        description: 'You will love this product.',
        featured: true,
        rating: 5,
        reviews: 134,
      },
      {
        id: 4,
        name: 'Product 4',
        price: 59.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product4.jpg`,
        description: 'This is the best product we offer.',
        featured: true,
        rating: 5,
        reviews: 45,
      },
      {
        id: 5,
        name: 'Product 5',
        price: 69.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product5.jpg`,
        description: "An amazing product that you can't miss.",
        featured: true,
        rating: 5,
        reviews: 49,
      },
      {
        id: 6,
        name: 'Product 6',
        price: 79.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product6.jpg`,
        description: 'A product that combines quality and value.',
        featured: true,
        rating: 5,
        reviews: 108,
      },
      {
        id: 7,
        name: 'Product 7',
        price: 89.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product7.jpg`,
        description: 'A premium product for discerning customers.',
        rating: 4.8,
        reviews: 130,
      },
      {
        id: 8,
        name: 'Product 8',
        price: 99.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product8.jpg`,
        description: 'An exclusive product with limited availability.',
        rating: 4.7,
        reviews: 14,
      },
      {
        id: 9,
        name: 'Product 9',
        price: 109.99,
        image: `${process.env.PUBLIC_URL}/assets/images/product9.jpg`,
        description: 'A product that sets new standards.',
        rating: 4.5,
        reviews: 190,
      }
];

function FeaturedProducts() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
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

    const handleProductClick = (product) => {
        navigate(`/product/${product.id}`);
    };

    const handleAdding = (e, product) => {
        e.stopPropagation(); // Prevent navigation when clicking the button
        if (isAuthenticated) {
            addToCart({
                id: product.id,
                name: product.name,
                price: parseFloat(product.price.toString().replace('$', '')),
                image: product.image,
                quantity: 1
            });
        } else {
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleLogin = () => {
        setShowModal(false);
        navigate('/login');
    };

    return (
        <>
            <section className={styles.featuredProducts}>
                <h2 className={styles.title}>Featured Products</h2>
                <div className={styles.productList}>
                    <div
                        className={styles.productWrapper}
                        style={{
                            transform: `translateX(-${
                                (currentIndex / productsPerPage === 0
                                    ? 0
                                    : (currentIndex / productsPerPage) * 100 + (1.7 * currentIndex / 3))
                            }%)`
                        }}
                    >
                        {FeaturedProductsData.map((product) => (
                            <div 
                                key={product.id} 
                                className={styles.productCard}
                                onClick={() => handleProductClick(product)}
                            >
                                <div className={styles.productImage}>
                                    <span className={styles.hotTag}>Hot</span>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.productPrice}>${product.price}</p>
                                <button 
                                    className={styles.addToCartButton} 
                                    onClick={(e) => handleAdding(e, product)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <NavigationButton
                    disabled={currentIndex >= FeaturedProductsData.length - 3}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    type="next"
                />
                <NavigationButton
                    disabled={currentIndex < productsPerPage}
                    handleNext={handleNext}
                    handlePrev={handlePrev}
                    type="prev"
                />
            </section>

            {/* Login Modal */}
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <h3>Login Required</h3>
                            <button className={styles.closeButton} onClick={closeModal}>
                                ×
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <p>Please log in to add items to your cart.</p>
                        </div>
                        <div className={styles.modalFooter}>
                            <button className={styles.cancelButton} onClick={closeModal}>
                                Cancel
                            </button>
                            <button className={styles.loginButton} onClick={handleLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FeaturedProducts;