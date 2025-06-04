
import styles from './Footer.module.scss';
function Footer() {
    return ( 
        <footer className={styles.footer}>
            <div className={styles.footerContent}>
                <p>&copy; {new Date().getFullYear()} MyShop. All rights reserved.</p>
                <p>Contact us: <a href="mailto:tanthang071208@gmail.com"> </a> </p>
                <p>Follow us on social media:</p>
                <ul className={styles.socialLinks}>
                    <li><a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Facebook</a></li>
                    <li><a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter</a></li>
                    <li><a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a></li>
                </ul>
            </div>
        </footer>
      );
}

export default Footer;