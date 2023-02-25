import axios from 'axios';

export const isJwtTokenExpired = (tokenPayload) => Date.now() / 1000 > tokenPayload.exp;

export const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = token;
    } else {
        delete axios.defaults.headers.common['Authorization'];
    }
}