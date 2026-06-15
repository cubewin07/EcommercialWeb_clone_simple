import { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthenContext } from '../../contexts/AuthenProvider';
import styles from './Register.module.scss';

function Register() {
  const { userList, registerUser, isAuthenticated } = useContext(AuthenContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/', { replace: true });
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !email || !password) {
      setError('All fields are required');
      return;
    }
    if (userList?.[username]) {
      setError('Username already taken');
      return;
    }
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      setError('Invalid email address');
      return;
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      registerUser({ username, email, password });
      navigate('/', { replace: true });
    }, 400);
  };

  return (
    <motion.section
      className={styles.registerSection}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className={styles.registerWrapper}
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
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          >
            ✨
          </motion.div>
          <h2>Join Shoppe</h2>
          <p>
            Create an account and enjoy curated selections, exclusive offers, and a smooth checkout experience.
          </p>
        </motion.div>

        {/* Form Panel */}
        <motion.div
          className={styles.formPanel}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <form className={styles.registerForm} onSubmit={handleSubmit}>
            <h2>Create Account</h2>

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
                placeholder="Choose a username"
                required
                whileFocus={{ borderColor: 'var(--accent-purple)', boxShadow: '0 0 0 3px rgba(167, 139, 250, 0.1)' }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="email">Email</label>
              <motion.input
                id="email"
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                required
                whileFocus={{ borderColor: 'var(--accent-purple)', boxShadow: '0 0 0 3px rgba(167, 139, 250, 0.1)' }}
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="password">Password</label>
              <motion.input
                id="password"
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="Min 8 characters"
                required
                whileFocus={{ borderColor: 'var(--accent-purple)', boxShadow: '0 0 0 3px rgba(167, 139, 250, 0.1)' }}
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
                'Create Account'
              )}
            </motion.button>

            <p className={styles.switchPrompt}>
              Already have an account?{' '}
              <Link to="/login" className={styles.switchLink}>Sign In</Link>
            </p>
          </form>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

export default Register;