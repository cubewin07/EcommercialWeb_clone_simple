import { useState, useEffect, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useLocation, replace } from 'react-router-dom'
import {TextField, Button, styled} from '@mui/material'

import styles from './login.module.scss'
import { AuthenContext } from '../../contexts/AuthenProvider'


const CustomTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#2e2e2e' : '#fcf8e3',
  borderRadius: 8,
  color: theme.palette.text.primary,

  '& .MuiOutlinedInput-root': {
    backgroundColor: theme.palette.mode === 'dark' ? '#2e2e2e' : '#fcf8e3',
    '& fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#666' : '#e1dcb8',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.mode === 'dark' ? '#f0a202' : '#f4ca58',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#f0a202',
    },
  },

  '& input': {
    color: theme.palette.text.primary,
    padding: '1.4rem 1.2rem 1.6rem 1.2rem',
    fontSize: '1.4rem',
  },

  '& label.MuiInputLabel-root': {
    fontSize: '1.4rem',
    color: theme.palette.text.primary,
  },

  '& label.Mui-focused': {
    fontSize: '1.2rem',
    transform: 'translate(14px, -9px) scale(1)',
    backgroundColor: theme.palette.mode === 'dark' ? '#2e2e2e' : '#fcf8e3',
    padding: '0 4px',
  },

  '& .MuiFormHelperText-root': {
  backgroundColor: theme.palette.mode === 'dark' ? '#2e2e2e' : '#fff', // fully white/light background
  fontSize: '1.1rem',
  color: theme.palette.error.main,
  padding: '4px 8px',
  margin: '4px 0 0 0',
  borderRadius: 6,
  display: 'inline-block',
}
}));

const TIMEOUT = 2000

function Login() {
    const {userList, setIsAuthenticated, login} = useContext(AuthenContext)
    const location = useLocation()
    const state = location?.state;
    const isBrowsing = state?.isBrowsing
    const { 
        register, 
        handleSubmit, 
        formState: { errors, isValid, dirtyFields },
        watch,
        trigger
    } = useForm({
        mode: 'all',
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
    }, [email, username])

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
    }, [password, username, email])

    const onSubmit = (data) => {
        login(data.username)
        if(isBrowsing)
            navigate(-1, {replace: true})
        navigate('/', {state:{user: data.username}, replace: true})
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
                        <CustomTextField
                            label="Username"
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            {...register('username', {
                                required: 'This field cannot be empty',
                                minLength: {
                                    value: 3,
                                    message: 'Must have at least 3 characters'
                                },
                                validate: value => {
                                    console.log('Running');
                                    return userList?.[value] || 'Wrong username, please register'
                                }
                            })}
                            error={showUsernameError && !!errors.username}
                            helperText={showUsernameError && errors.username ? errors.username.message : ''}
                        />
                        <CustomTextField
                            label="Email"   
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            {...register('email', {
                                required: 'This field cannot be empty',
                                email: 'Invalid email',
                                validate: value => {
                                    if(userList[username])
                                        return userList[username].email === value || "Wrong email"
                                    else {
                                        if(username.trim() === '')
                                            return 'Please enter your username'
                                        else
                                            return 'Your username has not registerd'
                                    }
                                        
                                }
                            })}
                            error={showEmailError && !!errors.email}
                            helperText={showEmailError && errors.email ? errors.email.message : ''}
                        />
                        <CustomTextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            margin='normal'
                            {...register('password', {
                                required: 'This field cannot be empty',
                                minLength: {
                                    value: 8,
                                    message: 'Must have at least 8 characters'
                                },
                                validate: value => {
                                    if(username.trim() === '')
                                        return 'Please enter your username'
                                    return userList?.[username].password === value || "Wrong password"
                                }
                            })}
                            error={showPasswordError && !!errors.password}
                            helperText={showPasswordError && errors.password ? errors.password.message : ''}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            // disabled={!isValid}
                            className={styles.submitButton}
                        >
                            Login
                        </Button>
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