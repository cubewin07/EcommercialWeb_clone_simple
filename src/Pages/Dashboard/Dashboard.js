import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthenContext } from '../../contexts/AuthenProvider';
import { ShoppingContext } from '../../contexts/ShoppingProvider';
import styles from './Dashboard.module.scss';

const statVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  }),
};

const rowVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: (i) => ({
    opacity: 1, x: 0,
    transition: { delay: 0.3 + i * 0.06, duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Dashboard() {
  const { isAuthenticated, name, logout } = useContext(AuthenContext);
  const { cart } = useContext(ShoppingContext);
  const navigate = useNavigate();

  const totalOrders = 3;
  const recentOrders = [
    { id: '12345', date: '2025-06-10', status: 'Shipped', total: '$120.00' },
    { id: '67890', date: '2025-05-25', status: 'Processing', total: '$89.99' },
    { id: '24680', date: '2025-05-01', status: 'Delivered', total: '$45.50' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <motion.div
      className={styles.dashboardContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* ── Sidebar ── */}
      <motion.aside
        className={styles.sidebar}
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className={styles.sidebarHeader}>
          <motion.div
            className={styles.avatar}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
          >
            {name?.charAt(0)?.toUpperCase() || 'G'}
          </motion.div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>{name || 'Guest'}</span>
            <span className={styles.userRole}>Customer</span>
          </div>
        </div>

        <nav className={styles.navList}>
          <Link to="/" className={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
            Home
          </Link>
          <Link to="/product" className={styles.navItem}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /></svg>
            Products
          </Link>
          <Link to="/cart" className={`${styles.navItem} ${cart.length > 0 ? styles.hasBadge : ''}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.2 13.3a1 1 0 0 0 1 .7h9.4a1 1 0 0 0 1-.8L23 6H6" /></svg>
            Cart
            {cart.length > 0 && <span className={styles.badge}>{cart.length}</span>}
          </Link>
          <Link to="/dashboard" className={`${styles.navItem} ${styles.active}`}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="9" y1="9" x2="15" y2="15" /><line x1="15" y1="9" x2="9" y2="15" /></svg>
            Dashboard
          </Link>
        </nav>

        <button className={styles.logoutBtn} onClick={handleLogout}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
          Logout
        </button>
      </motion.aside>

      {/* ── Main Content ── */}
      <section className={styles.content}>
        <motion.div
          className={styles.topBar}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
        >
          <div>
            <h1 className={styles.greeting}>Welcome back, {name || 'Guest'}!</h1>
            <p className={styles.subGreeting}>Here's what's happening with your account.</p>
          </div>
        </motion.div>

        {/* ── Stats ── */}
        <div className={styles.stats}>
          {[
            { label: 'Total Orders', value: totalOrders, icon: '📦', color: 'teal' },
            { label: 'Cart Items', value: cart.length, icon: '🛒', color: 'gold' },
            { label: 'Wishlist', value: 0, icon: '❤️', color: 'rose' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              className={`${styles.statCard} ${styles[stat.color] || ''}`}
              variants={statVariants}
              custom={i}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -4, transition: { type: 'spring', stiffness: 400, damping: 25 } }}
            >
              <div className={styles.statHeader}>
                <span className={styles.statIcon}>{stat.icon}</span>
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
              <span className={styles.statValue}>{stat.value}</span>
            </motion.div>
          ))}
        </div>

        {/* ── Recent Orders ── */}
        <motion.div
          className={styles.recentOrders}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className={styles.sectionHeader}>
            <h3>Recent Orders</h3>
            <Link to="/product" className={styles.viewAllLink}>View All →</Link>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.ordersTable}>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <motion.tr
                    key={order.id}
                    variants={rowVariants}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    whileHover={{ backgroundColor: 'rgba(45, 212, 191, 0.03)' }}
                  >
                    <td className={styles.orderId}>#{order.id}</td>
                    <td className={styles.orderDate}>{order.date}</td>
                    <td>
                      <span className={`${styles.statusBadge} ${styles[order.status.toLowerCase()]}`}>
                        {order.status === 'Shipped' && '🚚 '}
                        {order.status === 'Processing' && '⚙️ '}
                        {order.status === 'Delivered' && '✅ '}
                        {order.status}
                      </span>
                    </td>
                    <td className={styles.orderTotal}>{order.total}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default Dashboard;