import { createSlice } from "@reduxjs/toolkit";
import jwt_decode from 'jwt-decode';
import { isJwtTokenExpired, setAuthToken } from '../utils';
import { toast } from 'react-toastify';


const initialState = {
    isAuthenticated: false,
    user: null,     // { id, email, role }
    loading: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            const payload = jwt_decode(action.payload);

            if (isJwtTokenExpired(payload)) {
                toast.error('Token expired, please login again.');
                return logout();
            }

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
            state.isAuthenticated = false;
            state.user = null;
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        }
    }
});

export const { login, logout, setLoading } = authSlice.actions;

export default authSlice.reducer;