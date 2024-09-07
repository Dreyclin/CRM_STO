import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import { checkAuth } from '../features/auth/authThunks';

const ProtectedRoute: React.FC = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth())
    })

    if (!user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};

export default ProtectedRoute;