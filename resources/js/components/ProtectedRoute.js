import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './GlobalStates';

const ProtectedRoute = ({
    children,
    redirectPath = '/'
  }) => {
    const [authContext, setAuthContext] = useContext(AuthContext);
    if(!authContext.isLoggedIn){
        return <Navigate to={redirectPath} replace />;
    }

    return children;
}
export default ProtectedRoute;