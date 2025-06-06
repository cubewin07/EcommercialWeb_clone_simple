import { useState } from 'react';
import styles from './FeaturedProducts.module.scss';

const FeaturedProductsData = [
    {
        id: 1,
        name: "Product 1",
        price: "$19.99",
        image: "/assets/images/product1.jpg"
    },
    {
        id: 2,
        name: "Product 2",
        price: "$29.99",
        image: "/assets/images/product2.jpg"
    },
    {
        id: 3,
        name: "Product 3",
        price: "$39.99",
        image: "/assets/images/product3.jpg"
    },
    {
        id: 4,
        name: "Product 4",
        price: "$49.99",
        image: "/assets/images/product4.jpg"
    },
    {
        id: 5,
        name: "Product 5",
        price: "$59.99",
        image: "/assets/images/product5.jpg"
    },
    {
        id: 6,
        name: "Product 6",
        price: "$69.99",
        image: "/assets/images/product6.jpg"
    }
];

function FeaturedProducts() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const productsPerPage = 3;

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

    return (
            <section className={styles.featuredProducts}>
                <h2 className={styles.title}>Featured Products</h2>
                <div className={styles.productList}>
                    <div
                        className={styles.productWrapper}
                        style={{ transform: `translateX(-${(currentIndex / productsPerPage) * 100}%)` }}
                    >
                        {FeaturedProductsData.map((product) => (
                            <div key={product.id} className={styles.productCard}>
                                <div className={styles.productImage}>
                                    <span className={styles.hotTag}>Hot</span>
                                    <img src={product.image} alt={product.name} />
                                </div>
                                <h3 className={styles.productName}>{product.name}</h3>
                                <p className={styles.productPrice}>{product.price}</p>
                                <button className={styles.addToCartButton}>Add to Cart</button>
                            </div>
                        ))}
                    </div>
                </div>
                <button className={`${styles.navigationButton} ${styles.prevButton}`} onClick={handlePrev}>
                    &lt;
                </button>
                <button className={`${styles.navigationButton} ${styles.nextButton}`} onClick={handleNext}>
                    &gt;
                </button>
            </section>
      );
}

export default FeaturedProducts;