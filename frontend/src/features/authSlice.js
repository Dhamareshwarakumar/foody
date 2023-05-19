import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';
import { isJwtTokenExpired, setAuthToken } from '../utils';
import { toast } from 'react-toastify';


const initialState = {
    isAuthenticated: false,
    user: null,     // { id, email, role }
    loading: false,
    formType: 'login',   // login / register / otp / fogotPassword / resetPassword //
    hash: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const payload = jwt_decode(action.payload);

            setAuthToken(action.payload);

            state.isAuthenticated = true;
            state.user = {
                id: payload.id,
                email: payload.email,
                role: payload.role
            };
            state.loading = false;
        },
        logout: (state) => {
            console.log('Logout Called');
            state.isAuthenticated = false;
            state.user = null;

            console.log('Removing Auth Token')
            localStorage.removeItem('auth_token');
            setAuthToken();
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setFormType: (state, action) => {
            if (['login', 'register', 'otp', 'forgotPassword', 'resetPassword'].includes(action.payload)) {
                state.formType = action.payload;
            }
        },
        setHash: (state, action) => {
            state.hash = action.payload;
        }
    }
});

export const { login, logout, setLoading, setFormType, setHash } = authSlice.actions;

export default authSlice.reducer;