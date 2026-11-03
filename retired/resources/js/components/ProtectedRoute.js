import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './GlobalStates';
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

    return children;
}
export default ProtectedRoute;