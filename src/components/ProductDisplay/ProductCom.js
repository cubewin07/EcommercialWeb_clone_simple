import BannerProduct from "./bannerProduct/BannerProduct.js";
import styles from './ProductCom.module.scss';

function ProductCom({ banner, title, description, price, image, featured }) {
    if (banner) {
        return <BannerProduct />
    } 

    return (
        <div className={styles.productCard}>
            {featured && <span className={styles.hotTag}>Hot</span>}
            <img src={image} alt={title} className={styles.productImage} />
            <div className={styles.productDetails}>
                <h2 className={styles.productTitle}>{title}</h2>
                <p className={styles.productDescription}>{description}</p>
                <p className={styles.productPrice}>${price.toFixed(2)}</p>
            </div>
        </div>
    );
}

export default ProductCom;