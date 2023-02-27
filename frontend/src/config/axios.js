import axios from 'axios';

// Axios Configuration (Base URL, Error Handling)
axios.defaults.baseURL = process.env.REACT_APP_BASE_URI;
axios.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    if (!error.response) {
        error['response'] = {
            data: {
                msg: error.message
            }
        }
    }
    return Promise.reject(error);
});