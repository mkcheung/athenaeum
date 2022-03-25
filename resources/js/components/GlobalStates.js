
import axios from 'axios';
import React, { useState, useEffect, createContext, useContext } from 'react';
import {Link, Navigate} from "react-router-dom";
import swal from 'sweetalert2';
const AuthContext = createContext();

const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
}

const AuthProvider = (props) => {

	const [ loading, setLoading ] = useState(true);

	const [authState, setAuthState] = useState({
		isLoggedIn:false,
		user:{},
		accessToken:'',
		permissions:[],
		isSuperAdmin:false
	});


	// data NEEDS to be reloaded from localStorage whenever browser is reset
	// Async-Await must be used here. This Promise needs to be fulfilled
	// BEFORE we move forward or we lose the user session
	useEffect(async () => {
		let appStateData = localStorage["appState"] ? JSON.parse(localStorage["appState"]) : null;


		if(appStateData.isLoggedIn){
        	const decodedJwt = parseJwt(appStateData['accessToken']);

			if (decodedJwt.exp * 1000 < Date.now()) {
	            await setAuthState({
	                isLoggedIn:false,
	                user:{},
	                accessToken:'',
	                permissions:[],
	                isSuperAdmin:false
	            });
            	localStorage.clear();
            	swal.fire('Done!', 'Your session has expired. Please log back in.', 'success');
				await setLoading(false);
            	return <Navigate to={'/login'} replace />;
			} else {
				await setAuthState((prevState)=>({
					...appStateData
				}));
				await setLoading(false);
			}
		} 
	}, []);



    const loginUser = async (email, password) => {

        let userData = {
            email,
            password
        };
        let loggedInData = await axios.post("/api/login", userData);
        if (loggedInData.status == 200) {

            let { id, user, access_token, permissions, isSuperAdmin } = loggedInData.data;
            let userData = {
                ...user
            };
            let appState = {
                isLoggedIn: true,
                user: userData,
                accessToken: access_token,
                permissions: permissions,
                isSuperAdmin: isSuperAdmin
            };
            localStorage["appState"] = JSON.stringify(appState);
            await setAuthState(appState);
			await setLoading(false);
        } else {
            swal.fire("Error", 'Failed to log in. Please try again.', "error");
        }
    }

    const logOut = async () => {

        try {
            let response = await axios.post('/api/logout', {},
            {
                headers: {
                    'Authorization': 'Bearer ' + authState.accessToken,
                    'Accept': 'application/json'
                }
            });
            swal.fire('Done!', 'You have logged out!', 'success');
            localStorage.clear();
            setAuthState({
                isLoggedIn:false,
                user:{},
                accessToken:'',
                permissions: [],
                isSuperAdmin: false
            });
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }

    };

	const authContextValue = {
		loading,
		loginUser,
		logOut,
		authState,
		setAuthState
	};

	return <AuthContext.Provider value={authContextValue} {...props} />
};

const useAuth = () => useContext(AuthContext);

export {AuthProvider, useAuth}