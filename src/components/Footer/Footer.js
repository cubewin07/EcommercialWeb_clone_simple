import styles from './Footer.module.scss';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        
        <div className={styles.section}>
          <p>&copy; {new Date().getFullYear()} MyShop.</p>
          <p>All rights reserved.</p>
        </div>

        <div className={styles.section}>
          <p>Contact us:</p>
          <a href="mailto:tanthang071208@gmail.com">tanthang071208@gmail.com</a>
        </div>

        <div className={styles.section}>
          <p>Follow us:</p>
          <ul className={styles.socialLinks}>
            <li><a href="https://www.facebook.com" className={styles.socialLink}>Facebook</a></li>
            <li><a href="https://www.twitter.com" className={styles.socialLink}>Twitter</a></li>
            <li><a href="https://www.instagram.com" className={styles.socialLink}>Instagram</a></li>
          </ul>
        </div>
        
      </div>
    </footer>
  );
}

export default Footer;
