import { useContext } from 'react';

import ProductCom from '../../components/ProductDisplay/ProductCom';
import styles from './Product.module.scss';
import {products} from '../../Products/Data.js'; // Assuming you have a JSON file with product data
import ToolTipWrapper from '../../components/ToolTip/ToolTipWrapper.js';
import { ShoppingContext } from '../../contexts/ShoppingProvider.js';
import ProductTooltipCard from './TooltipCard/TooltipCard.js';

function Product() {
    const {cart} = useContext(ShoppingContext)
    return (
        <div className={styles.productPage}>
            <h1 className={styles.pageTitle}>Our Products</h1>
            <div className={styles.productGrid}>
                {products.map(product => {
                    const productInCart = cart.filter( cartProducts => cartProducts.id === product.id)
                    const quantity = productInCart.length !== 0 ? productInCart[0].quantity : 0
                    return (
                        <ToolTipWrapper 
                            key={product.id}
                            tooltipText={<ProductTooltipCard 
                            rating={product.rating} reviews={product.reviews} 
                            quantity={quantity} 
                        />}>
                            <ProductCom
                                key={product.id}
                                id={product.id}
                                title={product.name}
                                description={product.description}
                                price={product.price}
                                image={product.image}
                                featured={product.featured}
                            />
                        </ToolTipWrapper>
                    )
                })}
            </div>
        </div>
    );
}

export default Product;