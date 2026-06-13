import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { AuthenContext } from '../../contexts/AuthenProvider';
import { ShoppingContext } from '../../contexts/ShoppingProvider';
import styles from './Header.module.scss';

function Header() {
  const { name, logout, isAuthenticated } = useContext(AuthenContext);
  const { totalItems } = useContext(ShoppingContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const menuRef = useRef(null);

  const user = name || (location.state?.user);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleCartClick = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    } else {
      navigate('/cart');
    }
  };

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/product', label: 'Products' },
  ];

  return (
    <>
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.inner}>
          {/* Logo */}
          <Link to="/" className={styles.logo}>
            <span className={styles.logoMark}>✦</span>
            <span className={styles.logoText}>Shoppe</span>
          </Link>

          {/* Desktop Nav */}
          <nav className={styles.desktopNav}>
            <ul className={styles.navList}>
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`${styles.navLink} ${isActive(link.path) ? styles.active : ''}`}
                  >
                    {link.label}
                    {isActive(link.path) && (
                      <motion.div
                        layoutId="navIndicator"
                        className={styles.indicator}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right Section */}
          <div className={styles.actions}>
            {/* Cart */}
            <button className={styles.cartBtn} onClick={handleCartClick} aria-label="Cart">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.2 13.3a1 1 0 0 0 1 .7h9.4a1 1 0 0 0 1-.8L23 6H6" />
              </svg>
              {totalItems > 0 && isAuthenticated && (
                <motion.span
                  className={styles.cartBadge}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            {/* User / Login */}
            {isAuthenticated || user ? (
              <div className={styles.userMenu} ref={menuRef}>
                <button className={styles.userTrigger}>
                  <span className={styles.avatar}>{user?.charAt(0)?.toUpperCase() || 'U'}</span>
                  <span className={styles.userName}>{user}</span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div className={styles.dropdown}>
                  <button onClick={() => navigate('/dashboard')} className={styles.dropdownItem}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
                    Dashboard
                  </button>
                  <div className={styles.dropdownDivider} />
                  <button
                    onClick={() => { logout(); navigate('/'); }}
                    className={styles.dropdownItem}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className={styles.loginBtn}>
                Sign In
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className={`${styles.menuToggle} ${mobileMenuOpen ? styles.open : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              <span /><span /><span />
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className={styles.mobileNav}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <ul className={styles.mobileNavList}>
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className={`${styles.mobileNavLink} ${isActive(link.path) ? styles.active : ''}`}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <button className={styles.mobileNavLink} onClick={handleCartClick}>
                    Cart {totalItems > 0 && `(${totalItems})`}
                  </button>
                </li>
                {!isAuthenticated && !user && (
                  <li>
                    <Link to="/login" className={styles.mobileNavLink}>Sign In</Link>
                  </li>
                )}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.modal}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            >
              <div className={styles.modalIcon}>🔒</div>
              <h3 className={styles.modalTitle}>Sign In Required</h3>
              <p className={styles.modalText}>Please sign in to view your cart and start shopping.</p>
              <div className={styles.modalActions}>
                <button className={styles.modalCancel} onClick={() => setShowLoginModal(false)}>
                  Cancel
                </button>
                <button className={styles.modalConfirm} onClick={() => { setShowLoginModal(false); navigate('/login'); }}>
                  Sign In
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Header;