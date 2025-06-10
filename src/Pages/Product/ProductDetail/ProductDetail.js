import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import { ShoppingContext } from '../../../contexts/ShoppingProvider';
import styles from './ProductDetail.module.scss'


function ProductDetail() {
    const { productId } = useParams();
    const { updateQuantity, addToCart, cart } = useContext(ShoppingContext);

    // return (  

    // );
}

export default ProductDetail;