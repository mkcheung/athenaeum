
import axios from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import {Link, Navigate} from "react-router-dom";
import { useAuth, loading } from './GlobalStates';
import swal from 'sweetalert2';
const UserContext = createContext();

const UserProvider = (props) => {

	const [ usersLoading, setUsersLoading ] = useState(true);
    const { loading, authState } = useAuth();
    const [ users, setUsers ] = useState([]);

    // we need the token
    // make sure the auth context finishes loading (loading=false)
    // before we load our users
	useEffect(async () => {
        let userData = [];
        try {
            if(!loading){
                const userObj = await axios.get('/api/users',
                {   
                    headers: {
                        'Authorization': 'Bearer '+authState.accessToken,
                        'Accept': 'application/json'
                    },
                    params: {
                        isSuperAdmin: authState.isSuperAdmin
                    }
                });
                userData = userObj.data;
                setUsers(userData);
                setUsersLoading(false);
            }
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
	}, [loading]);

    const clearUsers = async () => {
        setUsers([]);
    };

	const userContextValue = {
        clearUsers,
		usersLoading,
		users,
		setUsers
	};

	return <UserContext.Provider value={userContextValue} {...props} />
};

const useUserData = () => useContext(UserContext);

export {UserProvider, useUserData}