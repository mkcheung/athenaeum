import React, { useState, useEffect, createContext } from 'react';
import {
    useNavigate
} from 'react-router-dom';
import swal from 'sweetalert2';
const AuthContext = createContext();


const parseJwt = (token) => {
	try {
		return JSON.parse(atob(token.split('.')[1]));
	} catch (e) {
		return null;
	}
};

const AuthProvider = (props) => {
	const [authState, setAuthState] = useState({
		isLoggedIn:false,
		user:{},
		accessToken:'',
		permissions:[],
		isSuperAdmin:false
	});

    const navigate = useNavigate();
	let data = localStorage["appState"] ? JSON.parse(localStorage["appState"]) : null;

	// data NEEDS to be reloaded from localStorage whenever browser is reset
	// Async-Await must be used here. This Promise needs to be fulfilled
	// BEFORE we move forward or we lose the user session
	useEffect(async () => {

		if(localStorage["appState"]){
        	const decodedJwt = parseJwt(JSON.parse(localStorage["appState"])['accessToken']);

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
            	navigate(`/login`);
			} else {
				await setAuthState((prevState)=>({
					...data
				}));
			}
		} 
	}, []);

	return(
		<AuthContext.Provider value={[authState, setAuthState]}>
			{props.children}
		</AuthContext.Provider>
	);
};


export {AuthProvider, AuthContext}