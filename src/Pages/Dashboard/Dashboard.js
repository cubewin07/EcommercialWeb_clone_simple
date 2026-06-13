import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthenContext } from '../../contexts/AuthenProvider';
import { ShoppingContext } from '../../contexts/ShoppingProvider';
import styles from './Dashboard.module.scss';

function Dashboard() {
  const { isAuthenticated, name, logout } = useContext(AuthenContext);
  const { cart } = useContext(ShoppingContext);
  const navigate = useNavigate();

  const totalOrders = 3; // placeholder – replace with real data later
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
    <div className={styles.dashboardContainer}>
      {/* Sidebar */}
      <aside className={styles.sidebar}>
        <div className={styles.profilePic}> {/* placeholder avatar */} </div>
        <p className={styles.userName}>{name || 'Guest'}</p>
        <ul className={styles.navList}>
          <li onClick={() => navigate('/')}>Home</li>
          <li onClick={() => navigate('/product')}>Products</li>
          <li onClick={() => navigate('/cart')}>Cart ({cart.length})</li>
          <li onClick={() => navigate('/dashboard')}>Dashboard</li>
          <li className={styles.logout} onClick={handleLogout}>Logout</li>
        </ul>
      </aside>

      {/* Main content */}
      <section className={styles.content}>
        <h2 className={styles.greeting}>Hello, {name || 'Guest'}!</h2>
        <div className={styles.stats}>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Orders</span>
            <span className={styles.statValue}>{totalOrders}</span>
          </div>
          <div className={styles.statCard}>
            <span className={styles.statLabel}>Cart Items</span>
            <span className={styles.statValue}>{cart.length}</span>
          </div>
        </div>

        <div className={styles.recentOrders}>
          <h3>Recent Orders</h3>
          <table className={styles.ordersTable}>
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Status</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.date}</td>
                  <td className={styles[order.status?.toLowerCase()]}> {order.status} </td>
                  <td>{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;