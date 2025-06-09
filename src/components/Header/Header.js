import {Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState } from 'react';
import { motion } from 'framer-motion';

import { AuthenContext } from '../../contexts/AuthenProvider';
import { ShoppingContext } from '../../contexts/ShoppingProvider';
import styles from'./Header.module.scss'
function Header() {
    const { name, logout, isAuthenticated } = useContext(AuthenContext);
    const { totalItems } = useContext(ShoppingContext);
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;
    const user = name || (state && state.user);
    const [showErrorModal, setShowErrorModal] = useState(false);

    const handleCartClick = () => {
        if (!isAuthenticated) {
            setShowErrorModal(true);
        } else {
            navigate('/cart');
        }
    };

    return (
        <>
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
                            <div className={styles.cartIcon} onClick={handleCartClick}>
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
                                {totalItems > 0 && isAuthenticated && (
                                    <motion.span
                                        className={styles.cartCount}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {totalItems}
                                    </motion.span>
                                )}
                                <span className={styles.tooltip}>View cart</span>
                            </div>
                        </li>
                        {
                            isAuthenticated || user ? (
                                <li className={styles.userItem}>
                                    <img src="/assets/images/user.png" alt="User" className={styles.userImage} />
                                    <span className={styles.userName}>{user}</span>
                                    <ul className={styles.userMenu}>
                                        <li className={styles.userMenuItem}>
                                            <button
                                                className={styles.userButton}
                                                onClick={() => navigate('/dashboard')}
                                            >
                                                Dashboard
                                            </button>
                                        </li>
                                        <li className={styles.userMenuItem}>
                                            <button
                                                className={styles.userButton}
                                                onClick={() => {
                                                    logout();
                                                    navigate('/');
                                                }}
                                            >
                                                Logout
                                            </button>
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
            {showErrorModal && (
                <div className={styles.errorModal}>
                    <div className={styles.modalContent}>
                        <p className={styles.errorMessage}>You must be logged in to view your cart.</p>
                        <button className={styles.closeButton} onClick={() => setShowErrorModal(false)}>Close</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Header;