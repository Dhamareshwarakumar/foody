import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'

import { setLoading } from '../../features/authSlice';
import { setErrors } from '../../features/errorSlice';
import { login } from '../../api/auth';

import { InlineText, Input } from '../../components';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const loading = useSelector(state => state.auth.loading);
    const { errors } = useSelector(state => state.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = e => {
        e.preventDefault();

        dispatch(setLoading(true));
        dispatch(setErrors({}));
        dispatch(login(email, password));
    }

    useEffect(() => {
        document.title = 'Login | Foody';
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    return (
        <section className='login'>
            <div className='login__img-container'></div>
            <div className='login__form-container'>
                <p className='login__form-container__title'>
                    India's #1 Food Delivery and Dining App
                </p>

                <InlineText content='Login or Signup' />

                <form className='login__form-container__form' onSubmit={handleLogin}>
                    <Input
                        type='email'
                        name="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        loading={loading}
                        error={errors?.email}
                    />

                    <Input
                        type='password'
                        name='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        loading={loading}
                        error={errors?.password}
                    />

                    <div className='form-group'>
                        <button type='submit' className={`btn btn--primary btn--block ${loading && 'btn--loading'}`}>Login</button>
                    </div>
                </form>

                <InlineText content='or' />

                <div className="login__form-container__other">
                    <button className="btn btn--outlined btn--outlined-inactive btn--round" onClick={() => toast('Google Login')}>
                        <i className="fab fa-google"></i>
                    </button>
                    <button className='btn btn--outlined btn--outlined-inactive btn--round'>
                        <i className="fa-solid fa-ellipsis"></i>
                    </button>
                </div>

                <div className="login__form-container__privacy-policy">
                    <p className='login__form-container__privacy-policy__content'>
                        By continuing, you agree to Zomato's
                        <a href='https://www.zomato.com/privacy'> Terms of Use</a> and
                        <a href='https://www.zomato.com/privacy'> Privacy Policy</a>
                    </p>
                </div>
            </div>
        </section>
    );
}

export default Login;