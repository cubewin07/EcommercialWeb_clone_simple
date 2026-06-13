import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthenContext } from '../../contexts/AuthenProvider';
import styles from './Register.module.scss';

function Register() {
  const { userList, registerUser, isAuthenticated } = useContext(AuthenContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    if (userList?.[username]) {
      setError('Username already taken');
      return;
    }
    // very simple email validation
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }
    // register user (store in localStorage via context)
    registerUser({ username, email, password });
    navigate('/', { replace: true });
  };

  return (
    <section className={styles.registerSection}>
      <div className={styles.registerWrapper}>
        <div className={styles.sidePanel}>
          <div className={styles.welcomeIcon}>🎉</div>
          <h2>Create Account</h2>
          <p>Join Shoppe and enjoy curated selections, exclusive offers, and a smooth checkout experience.</p>
        </div>
        <div className={styles.formPanel}>
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Register</h2>
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
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            <button type="submit" className={styles.submitButton}>Create Account</button>
            <p className={styles.switchPrompt}>
              Already have an account? <Link to="/login">Sign In</Link>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;