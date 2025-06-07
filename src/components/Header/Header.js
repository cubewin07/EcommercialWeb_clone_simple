import {Link } from 'react-router-dom';
import styles from'./Header.module.scss'
function Header() {
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
                        <Link to="/cart" className={styles.navLink}>Cart</Link>
                    </li>
                    {/* <li className={styles.loginItem}>
                        <Link to="/login" className={styles.navLink}>Login</Link>
                    </li> */}
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
                </ul>    
            </nav>    
        </header>
     );
}

export default Header;