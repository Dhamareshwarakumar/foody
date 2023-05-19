import axios from 'axios';
import { toast } from 'react-toastify';
import { login as loginAction, setFormType, setLoading, setHash } from '../features/authSlice';
import { setErrors } from '../features/errorSlice';


export const login = (email, password) => dispatch => {
    dispatch(setLoading(true));
    dispatch(setErrors({}));

    axios.post('/auth/login', { email, password })
        .then(res => {
            toast.success(res.data.msg);
            localStorage.setItem('auth_token', res.data.token.split(' ')[1]);
            dispatch(loginAction(res.data.token.split(' ')[1]));
        })
        .catch(err => {
            toast.error(err.response.data.msg);

            if (err.response.data.err) {
                dispatch(setErrors(err.response.data.err));
            }
        })
        .finally(() => dispatch(setLoading(false)));
}

export const register = (email, password) => dispatch => {
    dispatch(setLoading(true));
    dispatch(setErrors({}));

    axios.post('/auth/register', { email, password })
        .then(res => {
            toast.success(res.data.msg);
            dispatch(setHash(res.data.data.hash));
            console.log(res.data.data.hash);
            dispatch(setFormType('otp'));
        })
        .catch(err => {
            toast.error(err.response.data.msg);

            if (err.response.data.err) {
                dispatch(setErrors(err.response.data.err));
            }
        })
        .finally(() => dispatch(setLoading(false)));
}

export const verifyOtp = (email, otp, hash) => dispatch => {
    dispatch(setLoading(true));
    dispatch(setErrors({}));

    axios.post('/auth/verify-otp', { email, otp, hash })
        .then(res => {
            toast.success(res.data.msg);
            localStorage.setItem('auth_token', res.data.token.split(' ')[1]);
            dispatch(loginAction(res.data.token.split(' ')[1]));
        })
        .catch(err => {
            toast.error(err.response.data.msg);

            if (err.response.data.err) {
                dispatch(setErrors(err.response.data.err));
            }
        })
        .finally(() => dispatch(setLoading(false)));
}

export const forgotPassword = (email) => dispatch => {
    dispatch(setLoading(true));
    dispatch(setErrors({}));

    axios.post('/auth/forgot-password', { email })
        .then(res => {
            toast.success(res.data.msg);
            dispatch(setHash(res.data.data.hash));
            dispatch(setFormType('resetPassword'));
        })
        .catch(err => {
            toast.error(err.response.data.msg);

            if (err.response.data.err) {
                dispatch(setErrors(err.response.data.err));
            }
        })
        .finally(() => dispatch(setLoading(false)));
}

export const resetPassword = (email, password, otp, hash) => dispatch => {
    dispatch(setLoading(true));
    dispatch(setErrors({}));

    axios.post('/auth/reset-password', { email, password, otp, hash })
        .then(res => {
            toast.success(res.data.msg);
            localStorage.setItem('auth_token', res.data.token.split(' ')[1]);
            dispatch(loginAction(res.data.token.split(' ')[1]));
        })
        .catch(err => {
            toast.error(err.response.data.msg);

            if (err.response.data.err) {
                dispatch(setErrors(err.response.data.err));
            }
        })
        .finally(() => dispatch(setLoading(false)));
}

export const oauthLogin = (accessToken, provider) => dispatch => {
    dispatch(setLoading(true));
    dispatch(setErrors({}));

    axios.post('/auth/google', { accessToken })
        .then(res => {
            toast.success(res.data.msg);
            localStorage.setItem('auth_token', res.data.token.split(' ')[1]);
            dispatch(loginAction(res.data.token.split(' ')[1]));
        })
        .catch(err => {
            toast.error(err.response.data.msg);
        })
        .finally(() => dispatch(setLoading(false)));
}