import { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

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

    setIsSubmitting(true);
    setTimeout(() => {
      login(username);
      if (isBrowsing) navigate(-1);
      else navigate('/', { replace: true });
    }, 400);
  };

  return (
    <motion.section
      className={styles.loginSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.loginWrapper}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Side Panel */}
        <motion.div
          className={styles.sidePanel}
          initial={{ x: -30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className={styles.welcomeIcon}
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            ✦
          </motion.div>
          <h2>Welcome Back</h2>
          <p>
            Sign in to continue shopping with <b>Shoppe</b>. Enjoy exclusive deals and a seamless experience.
          </p>
        </motion.div>

        {/* Form Panel */}
        <motion.div
          className={styles.formPanel}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <h2>Sign In</h2>

            {error && (
              <motion.p
                className={styles.error}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {error}
              </motion.p>
            )}

            <div className={styles.inputGroup}>
              <label htmlFor="username">Username</label>
              <motion.input
                id="username"
                type="text"
                value={username}
                onChange={(e) => { setUsername(e.target.value); setError(''); }}
                placeholder="Enter your username"
                required
                whileFocus={{ borderColor: 'var(--accent-teal)', boxShadow: '0 0 0 3px rgba(45, 212, 191, 0.1)' }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <motion.input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Enter your password"
                required
                whileFocus={{ borderColor: 'var(--accent-teal)', boxShadow: '0 0 0 3px rgba(45, 212, 191, 0.1)' }}
              />
            </div>

            <motion.button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? (
                <motion.span
                  className={styles.spinner}
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                >
                  ⟳
                </motion.span>
              ) : (
                'Sign In'
              )}
            </motion.button>

            <p className={styles.switchPrompt}>
              Don't have an account?{' '}
              <Link to="/register" className={styles.switchLink}>Create one</Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Login;