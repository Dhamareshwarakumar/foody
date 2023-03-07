import React, { useState, useEffect } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify'

import { setFormType } from '../../features/authSlice';
import { setErrors } from '../../features/errorSlice';
import { login, register, verifyOtp, forgotPassword, resetPassword } from '../../api/auth';

import { InlineText, Input } from '../../components';


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const { loading, formType, hash } = useSelector(state => state.auth);
    const { errors } = useSelector(state => state.error);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');


    const handleSubmit = e => {
        e.preventDefault();

        // Validation
        if (formType === 'register' || formType === 'resetPassword') {
            if (password !== confirmPassword) {
                dispatch(setErrors({ confirmPassword: 'Passwords do not match' }));
                toast.error('Passwords do not match');
                return;
            }
        } else if (formType === 'forgotPassword') {
            if (!email) {
                dispatch(setErrors({ email: 'Email is required' }));
                toast.error('Validation Error');
                return;
            }
        }

        if (formType === 'login') {
            dispatch(login(email, password));
        } else if (formType === 'register') {
            dispatch(register(email, password));
        } else if (formType === 'otp') {
            dispatch(verifyOtp(email, otp, hash));
        } else if (formType === 'forgotPassword') {
            dispatch(forgotPassword(email));
        } else if (formType === 'resetPassword') {
            dispatch(resetPassword(email, password, otp, hash));
        }
    }

    const handleFormType = (name) => {
        setConfirmPassword('');
        setPassword('');
        dispatch(setErrors({}));
        dispatch(setFormType(name));
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

                <form className='login__form-container__form' onSubmit={handleSubmit}>
                    {/* login           :: email,   password                                */}
                    {/* register        :: email,   password,   confirm password            */}
                    {/* forgotPassword  :: email                                            */}
                    {/* otp             :: email,                                   otp     */}
                    {/* resetPassword   ::          password,   confirm password,   otp     */}

                    {formType !== 'resetPassword' && (
                        <Input
                            type='email'
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            loading={formType === 'otp' ? true : loading}
                            error={errors?.email}
                        />
                    )}

                    {formType !== 'otp' && formType !== 'forgotPassword' && (
                        <Input
                            type='password'
                            name='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            loading={loading}
                            error={errors?.password}
                        />
                    )}

                    {(formType === 'register' || formType === 'resetPassword') && (
                        <Input
                            type='password'
                            name='confirm-password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            loading={loading}
                            error={errors?.confirmPassword}
                        />
                    )}

                    {(formType === 'otp' || formType === 'resetPassword') && (
                        <Input
                            type='number'
                            name='otp'
                            placeholder='Enter OTP'
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            loading={loading}
                            error={errors?.otp}
                        />
                    )}

                    <div className='form-group'>
                        <button type='submit' className={`btn btn--primary btn--block ${loading && 'btn--loading'}`}>
                            {/* for login: Login */}
                            {/* for register: Register */}
                            {/* for forgotPassword: Send OTP */}
                            {/* for otp and resetPassword: Submit */}
                            {formType === 'login' ? 'Login' : formType === 'register' ? 'Register' : formType === 'forgotPassword' ? 'Send OTP' : 'Submit'}
                        </button>
                    </div>
                    <div className="login__form-container__form__register">
                        {formType === 'login' ? (
                            <>
                                <p onClick={() => handleFormType('register')}>not an user? register here...</p>
                                <p onClick={() => handleFormType('forgotPassword')}>forgot password</p>
                            </>
                        ) : formType === 'register' || formType === 'forgotPassword' ? (
                            <p onClick={() => handleFormType('login')}>already registered? login here...</p>
                        ) : (
                            ''
                        )}
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

                {formType === 'register' && (
                    <div className="login__form-container__privacy-policy">
                        <p className='login__form-container__privacy-policy__content'>
                            By continuing, you agree to Zomato's
                            <a href='https://www.zomato.com/privacy'> Terms of Use</a> and
                            <a href='https://www.zomato.com/privacy'> Privacy Policy</a>
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}

export default Login;