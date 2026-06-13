import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthenContext } from '../../contexts/AuthenProvider';
import styles from './login.module.scss';

function Login() {
  const { userList, login, isAuthenticated } = useContext(AuthenContext);
  const navigate = useNavigate();
  const location = useLocation();
  const isBrowsing = location.state?.isBrowsing;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Both fields are required');
      return;
    }
    if (!userList?.[username]) {
      setError('User not found – please register');
      return;
    }
    if (userList[username].password !== password) {
      setError('Incorrect password');
      return;
    }
    login(username);
    if (isBrowsing) navigate(-1);
    else navigate('/', { replace: true });
  };

  return (
    <section className={styles.loginSection}>
      <div className={styles.loginWrapper}>
        <div className={styles.sidePanel}>
          <div className={styles.welcomeIcon}>🛒</div>
          <h2>Welcome Back!</h2>
          <p>
            Sign in to continue shopping with <b>Shoppe</b>. Enjoy exclusive deals and a seamless experience.
          </p>
        </div>
        <div className={styles.formPanel}>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <p className={styles.error}>{error}</p>}
            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>Sign In</button>
            <p className={styles.switchPrompt}>
              Don't have an account? <Link to="/register">Register</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;