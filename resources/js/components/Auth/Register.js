import React, { Component, useState, useEffect } from 'react';
import {Link, useNavigate} from "react-router-dom";
import ReactDOM from 'react-dom';
import FlashMessage from 'react-flash-message';
import swal from 'sweetalert2';
    
import { 
	Avatar,
	Box,
	Button,
	Checkbox,
	Container,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	InputLabel,
	Select,
	TextField
} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const Register = () => {

    const [isRegistered, setRegistered] = useState(null);
    const [error, setError] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [formSubmitting, setFormSubmit] = useState(false);
    const [user, setUser] = useState({
	    name: '',
	    first_name: '',
	    last_name: '',
	    email: '',
	    password: '',
	    password_confirmation: '',
	});
    const navigate = useNavigate();

	const handleUserChkboxToggle = (event) => {
	    setUser(prevState => ({
	        ...prevState,
	        [event.target.name]: event.target.checked
	    }));
	};

	const handleEmail = (e) => {
		e.persist();
	    setUser(prevState => ({
	        ...prevState,
	        email: e.target.value
	    }));
	}

	const handleName = (e) => {
		e.persist();
	    setUser(prevState => ({
	        ...prevState,
	        name: e.target.value
	    }));
	}

	const handleFirstName = (e) => {
		e.persist();
	    setUser(prevState => ({
	        ...prevState,
	        first_name: e.target.value
	    }));
	}

	const handleLastName = (e) => {
		e.persist();
	    setUser(prevState => ({
	        ...prevState,
	        last_name: e.target.value
	    }));
	}

	const handlePassword = (e) => {
		e.persist();
	    setUser(prevState => ({
	        ...prevState,
	        password: e.target.value
	    }));
	}

	const handlePasswordConfirm = (e) => {
		e.persist();
	    setUser(prevState => ({
	        ...prevState,
	        password_confirmation: e.target.value
	    }));
	}

	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormSubmit(true)
		let userData = user;

		try {
        	let results = await axios.post("/api/register", userData)

            swal.fire('Done!', 'User Registered!', 'success');
			
			setRegistered(true);
			setUser({
			    name: '',
			    first_name: '',
			    last_name: '',
			    email: '',
			    password: '',
			    password_confirmation: '',
			}); 
			
            navigate('/login');   
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
	}


	return (

		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div>
				<Typography component="h1" variant="h5">
					Create Your Account
				</Typography>
				<form onSubmit={(event) => handleSubmit(event)} noValidate>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="name"
						onChange={handleName}
						label="name"
						name="name"
						autoComplete="name"
						autoFocus
						value={user.name ? user.name : ''}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="first_name"
						onChange={handleFirstName}
						label="First Name"
						name="first_name"
						autoComplete="first_name"
						autoFocus
						value={user.first_name ? user.first_name : ''}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="last_name"
						onChange={handleLastName}
						label="Last Name"
						name="last_name"
						autoComplete="last_name"
						autoFocus
						value={user.last_name ? user.last_name : ''}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						onChange={handleEmail}
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						value={user.email ? user.email : ''}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						onChange={handlePassword}
						autoComplete="current-password"
						value={user.password ? user.password : ''}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password_confirmation"
						label="password_confirmation"
						type="password_confirmation"
						id="password_confirmation"
						onChange={handlePasswordConfirm}
						autoComplete="current-password"
						value={user.password_confirmation ? user.password_confirmation : ''}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
					>
						Create Account
					</Button>
				</form>
			</div>
		</Container>
	)
}
export default Register;