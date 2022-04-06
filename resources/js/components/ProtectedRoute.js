import { Navigate } from 'react-router-dom';
import { useAuth } from './GlobalStates';
import { useUserData } from './UserContext';

const ProtectedRoute = ({
    children,
    redirectPath = '/login',
    requiredPerm
  }) => {


    const { loading, authState, signalTimeOut } = useAuth();
    const { usersLoading } = useUserData();

    // don't load the route until the authstate has been refreshed.
    // we won't be able to load data into those components unless
    // the bearer token has been refreshed from the localStorage.
    // ditto with the users that need to be accessed
    // -- if it times out, we don't want to load the users.
    // let the route just fall through by setting signalTimeOut
    // to true
    if (!(signalTimeOut) && (loading || usersLoading)) {
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