import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectRoute({ children, isAuthenticated }) {
    if (!isAuthenticated) {
        return <Navigate to="/signin" />;
    }

    return children;
}

export default ProtectRoute;
