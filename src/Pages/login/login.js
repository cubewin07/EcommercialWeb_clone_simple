import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'

import styles from './login.module.scss'

const loginSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }).min(3),
    email: z.string({
        required_error: 'Email is required',
    }).email(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }).min(8),
})

function Login() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: zodResolver(loginSchema)
    })
    const navigate = useNavigate()

    const onSubmit = (data) => {
        console.log(data)
        navigate('/')
    }

    return (  
        <section className={styles.loginSection}>
            <div className={styles.loginWrapper}>
                <div className={styles.sidePanel}>
                    <div className={styles.welcomeIcon}>🛍️</div>
                    <h2>Welcome Back!</h2>
                    <p>Sign in to continue shopping with <b>MyShop</b>.<br/>Enjoy exclusive deals and a seamless experience.</p>
                </div>
                <div className={styles.formPanel}>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.loginForm}>
                        <h2>Login</h2>
                        <div className={styles.inputGroup}>
                            <label htmlFor="username">Username</label>
                            <input type="username" id="username" {...register('username')} />
                            {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" {...register('email')} />
                            {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" {...register('password')} />
                            {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                        </div>
                        <button type="submit">Login</button>
                        <div className={styles.socialLogin}>
                            <span>or login with</span>
                            <button type="button" className={styles.googleBtn}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png" alt="Google" /> Google
                            </button>
                            <button type="button" className={styles.facebookBtn}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg" alt="Facebook" /> Facebook
                            </button>
                        </div>
                        <p>Don't have an account? <Link to="/register">Register</Link></p>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Login;