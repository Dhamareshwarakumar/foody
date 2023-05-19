import React, { useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './config/axios';

import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { isJwtTokenExpired } from './utils';
import { toast } from 'react-toastify';
import { login, logout } from './features/authSlice';

import {
	Home,
	Login,
	SuperAdmin,
	RestaurantAdmin,
	RegisterRestaurant
} from './screens';
import {
	PageNotFound,
	ProtectedRoute
} from './components';
import jwt_decode from 'jwt-decode';

const App = () => {
	const dispatch = useDispatch();
	const role = useSelector(state => state.auth.user?.role);

	// On website reload check local storage for auth_token and login user if exists and valid
	useEffect(() => {
		const auth_token = localStorage.getItem('auth_token');

		if (auth_token) {
			const payload = jwt_decode(auth_token);
			if (isJwtTokenExpired(payload)) {
				toast.error('Token expired, please login again.');
				dispatch(logout());
			} else {
				dispatch(login(auth_token));
			}
		}
	}, [dispatch]);

	const rootRouter = createBrowserRouter([
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/',
			element: <ProtectedRoute><Home /></ProtectedRoute>,
			errorElement: <PageNotFound />
		},
		{
			path: '/admin',
			element: role === 4 ? <ProtectedRoute roles={[4]}><SuperAdmin /></ProtectedRoute> : role === 2 ? <ProtectedRoute roles={[2]}><RestaurantAdmin /></ProtectedRoute> : <PageNotFound />,
			errorElement: <PageNotFound />
		},
		{
			path: '/register-restaurant',
			element: <ProtectedRoute roles={[0]}><RegisterRestaurant /></ProtectedRoute>,
		}
	]);

	return (
		<>
			<RouterProvider router={rootRouter} />
			<ToastContainer
				position='bottom-right'
				autoClose={3000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	)
}

export default App