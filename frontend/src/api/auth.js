import axios from 'axios';
import { toast } from 'react-toastify';
import { login as loginAction, setLoading } from '../features/authSlice';
import { setErrors } from '../features/errorSlice';


export const login = (email, password) => dispatch => {
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