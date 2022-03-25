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


    const { loading, authState } = useAuth();

    // don't load the route until the authstate has been refreshed
    // we won't be able to load data into those components unless
    // the bearer token has been refreshed from the localStorage
    if (loading) {
        return "authenticating";
    }   

    if(!authState.accessToken){
        return <Navigate to={redirectPath} replace />;
    }

    if(requiredPerm && !authState.isSuperAdmin && !authState.permissions.includes(requiredPerm)){
        return <Navigate to='/dashboard' replace />;
    } 

    // when adding roles and permission, include redirect to dashboard
    // for attempts to access unauthorized routes.
    return children;
}
export default ProtectedRoute;