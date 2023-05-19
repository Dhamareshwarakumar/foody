import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';


const ProtectedRoute = ({ children, roles }) => {
    const navigate = useNavigate();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const user = useSelector(state => state.auth.user);
    const loading = useSelector(state => state.auth.loading);

    useEffect(() => {
        loading || isAuthenticated || navigate('/login');
    }, [isAuthenticated, navigate, loading]);

    useEffect(() => {
        loading || ((roles.length && !roles.includes(user?.role)) && navigate('/'));
    }, [roles, user, navigate, loading]);

    return loading ? <h1>Loading...</h1> : children;
};

ProtectedRoute.defaultProps = {
    roles: []
}

ProtectedRoute.propTypes = {
    children: PropTypes.element.isRequired,
    roles: PropTypes.arrayOf(PropTypes.number)
}

export default ProtectedRoute;