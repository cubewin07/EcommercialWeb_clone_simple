import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* Brand */}
        <div className={styles.brand}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}>✦</span>
            <span className={styles.logoText}>Shoppe</span>
          </Link>
          <p className={styles.tagline}>
            Curated products for a curated life. Quality meets design.
          </p>
        </div>

        {/* Links */}
        <div className={styles.links}>
          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Shop</h4>
            <ul className={styles.linkList}>
              <li><Link to="/product" className={styles.link}>All Products</Link></li>
              <li><Link to="/product" className={styles.link}>Featured</Link></li>
              <li><Link to="/product" className={styles.link}>New Arrivals</Link></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Account</h4>
            <ul className={styles.linkList}>
              <li><Link to="/login" className={styles.link}>Sign In</Link></li>
              <li><Link to="/register" className={styles.link}>Register</Link></li>
              <li><Link to="/dashboard" className={styles.link}>Dashboard</Link></li>
            </ul>
          </div>

          <div className={styles.linkGroup}>
            <h4 className={styles.linkTitle}>Connect</h4>
            <ul className={styles.linkList}>
              <li>
                <a href="mailto:tanthang071208@gmail.com" className={styles.link}>
                  Contact
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Facebook
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.link}>
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.newsletter}>
          <h4 className={styles.linkTitle}>Stay in the loop</h4>
          <p className={styles.newsletterText}>
            Get early access to new arrivals and exclusive offers.
          </p>
          <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className={styles.input}
              aria-label="Email for newsletter"
            />
            <button type="submit" className={styles.submitBtn}>→</button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <div className={styles.bottomInner}>
          <p className={styles.copyright}>
            © {year} Shoppe. All rights reserved.
          </p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Facebook">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="Instagram">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className={styles.social} aria-label="X / Twitter">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;