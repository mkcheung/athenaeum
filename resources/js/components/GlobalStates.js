import React, { useState, useEffect, createContext } from 'react';
const AuthContext = createContext();

const AuthProvider = (props) => {
	const [authState, setAuthState] = useState({
		isLoggedIn:false,
		user:{},
		accessToken:'',
		permissions:[],
		isSuperAdmin:false
	});

	let data = localStorage["appState"] ? JSON.parse(localStorage["appState"]) : null;

	// data NEEDS to be reloaded from localStorage whenever browser is reset
	// Async-Await must be used here. This Promise needs to be fulfilled
	// BEFORE we move forward or we lose the user session
	useEffect(async () => {
		if(localStorage["appState"]){
			await setAuthState((prevState)=>({
				...data
			}));
		} 
	}, []);

	return(
		<AuthContext.Provider value={[authState, setAuthState]}>
			{props.children}
		</AuthContext.Provider>
	);
};


export {AuthProvider, AuthContext}