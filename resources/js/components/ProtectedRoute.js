import { useContext, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './GlobalStates';
import { useJwt } from "react-jwt";
import swal from 'sweetalert2';

const ProtectedRoute = ({
    children,
    redirectPath = '/login',
    requiredPerm
  }) => {
    let data = localStorage["appState"] ? JSON.parse(localStorage["appState"]) : null;

    if(!data){
        return <Navigate to={redirectPath} replace />;
    }

    if(requiredPerm && !data.isSuperAdmin && !data.permissions.includes(requiredPerm)){
        return <Navigate to='/dashboard' replace />;
    } 

    // when adding roles and permission, include redirect to dashboard
    // for attempts to access unauthorized routes.
    return children;
}
export default ProtectedRoute;