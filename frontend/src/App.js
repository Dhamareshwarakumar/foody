import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import './config/axios';

import {
	createBrowserRouter,
	RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';

import { login } from './features/authSlice';

import {
	Home,
	Login
} from './screens';
import {
	PageNotFound,
	ProtectedRoute
} from './components';

const App = () => {
	const dispatch = useDispatch();

	// On website reload check local storage for auth_token and login user if exists and valid
	const auth_token = localStorage.getItem('auth_token');
	if (auth_token) {
		dispatch(login(auth_token));
	}

	const rootRouter = createBrowserRouter([
		{
			path: '/login',
			element: <Login />
		},
		{
			path: '/',
			element: <ProtectedRoute><Home /></ProtectedRoute>,
			errorElement: <PageNotFound />
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