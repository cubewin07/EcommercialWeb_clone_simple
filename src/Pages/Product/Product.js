import ProductCom from '../../components/ProductDisplay/ProductCom';
import styles from './Product.module.scss';
import {products} from '../../Products/Data.js'; // Assuming you have a JSON file with product data



function Product() {
    return (
        <div className={styles.productPage}>
            <h1 className={styles.pageTitle}>Our Products</h1>
            <div className={styles.productGrid}>
                {products.map(product => (
                    <ProductCom
                        key={product.id}
                        id={product.id}
                        title={product.name}
                        description={product.description}
                        price={product.price}
                        image={product.image}
                        featured={product.featured}
                    />
                ))}
            </div>
        </div>
    );
}

export default Product;