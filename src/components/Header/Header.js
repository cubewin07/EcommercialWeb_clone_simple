import {Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { motion } from 'framer-motion';

import { AuthenContext } from '../../contexts/AuthenProvider';
import { ShoppingContext } from '../../contexts/ShoppingProvider';
import styles from'./Header.module.scss'
function Header() {
    const { name, logout, isAuthenticated } = useContext(AuthenContext);
    const { cartItems } = useContext(ShoppingContext);
    const navigate = useNavigate();

    return ( 
        <header className={styles.header}>
            <div className={styles.logo}>
                <Link to="/" className={styles.logoLink}>
                    <img src="/assets/images/ShopLogo.png" alt="MyShop Logo" className={styles.logoImage} />
                </Link>
            </div>
            <nav className={styles.nav}>
                <ul className={styles.navList}>
                    <li className={styles.navItem}>
                        <Link to="/" className={styles.navLink}>Home</Link>
                    </li>
                    <li className={styles.navItem}>
                        <Link to="/product" className={styles.navLink}>Products</Link>
                    </li>
                    <li className={styles.navItem}>
                    <div className={styles.cartIcon} onClick={() => navigate('/cart')}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={styles.cartSvg}
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="9" cy="21" r="1" />
                            <circle cx="20" cy="21" r="1" />
                            <path d="M1 1h4l2.2 13.3a1 1 0 0 0 1 .7h9.4a1 1 0 0 0 1-.8L23 6H6" />
                        </svg>
                        {cartItems && cartItems.length > 0 && (
                            <motion.span
                                key={cartItems.length}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                className={styles.cartCount}
                            >
                            {cartItems.length}
                          </motion.span>
                        )}
                        <span className={styles.tooltip}>View cart</span>
                    </div>
                        {/* <Link to="/cart" className={styles.navLink}>Cart</Link> */}
                    </li>
                    {
                        isAuthenticated ? (
                            <li className={styles.userItem}>
                                <img src="/assets/images/user.png" alt="User" className={styles.userImage} />
                                <span className={styles.userName}>John Doe</span>
                                <ul className={styles.userMenu}>
                                    <li className={styles.userMenuItem}>
                                        <Link to="/dashboard" className={styles.navLink}>Dashboard</Link>
                                    </li>
                                    <li className={styles.userMenuItem}>
                                        <Link to="/logout" className={styles.navLink}>Logout</Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <li className={styles.loginItem}>
                                <Link to="/login" className={styles.navLink}>Login</Link>
                            </li>
                        )

                            
                    }
                    
                    
                </ul>    
            </nav>    
        </header>
     );
}

export default Header;