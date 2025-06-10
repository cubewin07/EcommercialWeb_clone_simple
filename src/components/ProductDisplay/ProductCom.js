import { useNavigate } from "react-router-dom";

import BannerProduct from "./bannerProduct/BannerProduct.js";
import styles from './ProductCom.module.scss';

function ProductCom({ banner,id ,title, description, price, image, featured }) {
    const navigate = useNavigate();
    if (banner) {
        return <BannerProduct />
    } 

    return (
        <div 
            className={styles.productCard}
            onClick={() => navigate(`/product/${id}`, { replace: true })}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    navigate(`/product/${id}`, { replace: true });
                }
            }}
            role="button"
        >
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