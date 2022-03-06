import { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './GlobalStates';
import { useJwt } from "react-jwt";

const ProtectedRoute = ({
    children,
    redirectPath = '/'
  }) => {
    const [ authState, setAuthState ] = useContext(AuthContext);

    const { decodedToken, isExpired } = useJwt(authState.accessToken);

    useEffect(async ()=>{
        if(isExpired){
            await setAuthState({
                isLoggedIn:false,
                user:{},
                accessToken:''
            });
        }
    }, [isExpired]);

    if(!authState.isLoggedIn){
        return <Navigate to={redirectPath} replace />;
    }

    // when adding roles and permission, include redirect to dashboard
    // for attempts to access unauthorized routes.

    return children;
}
export default ProtectedRoute;