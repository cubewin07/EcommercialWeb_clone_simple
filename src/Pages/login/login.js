import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'

import styles from './login.module.scss'

const loginSchema = z.object({
    username: z.string({
        required_error: 'Username is required',
    }).nonempty({ message: 'Username is required' }).min(3),
    email: z.string({
        required_error: 'Email is required',
    }).nonempty({ message: 'Email is required' }).email(),
    password: z.string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
    }).nonempty({ message: 'Password is required' }).min(8),
})

const TIMEOUT = 2000

function Login() {
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid, dirtyFields },
        watch,
        trigger
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password: '',
        }
    })
    const username = watch('username')
    const email = watch('email')
    const password = watch('password')
    const [typingTimeoutUsername, setTypingTimeoutUsername] = useState(null)
    const [typingTimeoutEmail, setTypingTimeoutEmail] = useState(null)
    const [typingTimeoutPassword, setTypingTimeoutPassword] = useState(null)
    const [showUsernameError, setShowUsernameError] = useState(false)
    const [showEmailError, setShowEmailError] = useState(false)
    const [showPasswordError, setShowPasswordError] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        let timer
        setShowUsernameError(false)
        if (typingTimeoutUsername) {
            clearTimeout(typingTimeoutUsername)
        }

        if (dirtyFields.username) {
            timer = setTimeout(() => {    
                trigger('username').then(valid => setShowUsernameError(!valid))
            }, TIMEOUT)
            setTypingTimeoutUsername(timer)
        }
        

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [username])

    useEffect(() => {
        console.log(dirtyFields);
        let timer
        setShowEmailError(false)
        if (typingTimeoutEmail) {
            clearTimeout(typingTimeoutEmail)
        }
        
        if (dirtyFields.email) {
            timer = setTimeout(() => {
                trigger('email').then(valid => setShowEmailError(!valid))
            }, TIMEOUT)
            setTypingTimeoutEmail(timer)
        }

        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [email])

    useEffect(() => {
        let timer
        setShowPasswordError(false)
        if (typingTimeoutPassword) {
            clearTimeout(typingTimeoutPassword)
        }
        
        if (dirtyFields.password) {
            timer = setTimeout(() => {
                trigger('password').then(valid => setShowPasswordError(!valid))
            }, TIMEOUT)
            setTypingTimeoutPassword(timer)
        }
        
        return () => {
            if (timer) {
                clearTimeout(timer)
            }
        }
    }, [password])

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
                            {showUsernameError && errors.username && <p className={styles.error}>{errors.username.message}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" {...register('email')} />
                            {showEmailError && errors.email && <p className={styles.error}>{errors.email.message}</p>}
                        </div>
                        <div className={styles.inputGroup}>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" {...register('password')} />
                            {showPasswordError && errors.password && <p className={styles.error}>{errors.password.message}</p>}
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