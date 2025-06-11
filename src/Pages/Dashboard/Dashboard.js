import { useContext } from "react";
import { ShoppingContext } from "../../contexts/ShoppingProvider";
import { AuthenContext } from "../../contexts/AuthenProvider";
import styles from './Dashboard.module.scss';

function Dashboard() {
    const { isAuthenticated, name } = useContext(AuthenContext);
    const { cart } = useContext(ShoppingContext);

    const totalOrders = 3; // Example, replace with actual logic
    const recentOrders = [
        { id: '12345', date: '2025-06-10', status: 'Shipped', total: '$120.00' },
        { id: '67890', date: '2025-05-25', status: 'Processing', total: '$89.99' },
        { id: '24680', date: '2025-05-01', status: 'Delivered', total: '$45.50' },
    ]; // Example data

    return (
        <div className={styles.dashboardContainer}>
            <aside className={styles.sidebar}>
                <div className={styles.profilePic}></div>
                <p className={styles.userName}>{name || 'User Name'}</p>
                <ul className={styles.navList}>
                    <li>Profile</li>
                    <li>Orders</li>
                    <li>Addresses</li>
                    <li>Settings</li>
                    <li>Logout</li>
                </ul>
            </aside>

            <section className={styles.content}>
                <h2>Overview</h2>
                <h1>Hello, {name}</h1>

                <div className={styles.buttons}>
                    <button>{totalOrders} Orders</button>
                    <button>Saved Items</button>
                    <button>Account Settings</button>
                </div>

                <div className={styles.recentOrders}>
                    <h3>Recent Orders</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {recentOrders.map(order => (
                                <tr key={order.id}>
                                <td data-label="ID">{order.id}</td>
                                <td data-label="Date">{order.date}</td>
                                <td data-label="Status">{order.status}</td>
                                <td data-label="Total">{order.total}</td>
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
