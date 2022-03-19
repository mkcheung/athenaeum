import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
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

export default function RegisterContainer() {
    const [isRegistered, setRegistered] = useState(null);
    const [error, setError] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [formSubmitting, setFormSubmit] = useState(false);
    const [user, setUser] = useState({
	    name: '',
	    email: '',
	    password: '',
	    password_confirm: '',
	    is_admin:false,
	    role_id:0
	});
    const [roles, setRoles] = useState([]);

    const loadData = async () => {

        let roleOptions = [];
        try {
            // let rolesRes = await axios.get('/api/roles');
            // let roles = rolesRes.data;
            // roles.forEach(function(role){
            //     let temp = {};
            //     temp['id'] = role.id;
            //     temp['value'] = role.name;
            //     roleOptions.push(temp);
            // });

            // setRoles(roleOptions);
        } catch (error) {
            swal.fire({
                icon: 'error',
                title: error,
                showConfirmButton: false,
                timer: 2000,
            });
        }
    };

	useEffect(() => {
		loadData();
	}, []);

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

	const handleChange = (e) => {
		e.persist();
	    setUser(prevState => ({
	        ...prevState,
	        role_id: e.target.value
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
	        password_confirm: e.target.value
	    }));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormSubmit(true)
		let userData = user;
		axios.post("/api/register", userData)
		.then(response => {
			return response;
		}).then(json => {
			if (json.data.success) {
				let userData = {
					id: json.data.id,
					name: json.data.name,
					email: json.data.email,
					activation_token: json.data.activation_token,
				};
				let appState = {
					isRegistered: true,
					user: userData
				};
				swal.fire(
					'Alright!',
					'User Registered!',
					'success'
				)
				localStorage["appState"] = JSON.stringify(appState);
				setRegistered(appState.isRegistered);
				setUser(appState.user);
			} else {
	            swal.fire({
	                icon: 'error',
	                title: `Our System Failed To Register Your Account!`,
	                showConfirmButton: false,
	                timer: 2000,
	            });
			}
		}).catch(error => {

			if (error.response) {
				// The request was made and the server responded with a status code that falls out of the range of 2xx
				let err = error.response.data;
				setError(err.message);
				setErrorMsg(err.errors);
				setFormSubmit(false);
			} else if (error.request) {
				// The request was made but no response was received `error.request` is an instance of XMLHttpRequest in the browser and an instance of http.ClientRequest in node.js
				let err = error.request;
				setErrorMsg(err);
				setFormSubmit(false);
			} else {
				// Something happened in setting up the request that triggered an Error
				let err = error.message;
				setErrorMsg(err);
				setFormSubmit(false);
			}
		}).finally(
			setError('')
		);
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
						label="Name"
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
						name="password_confirm"
						label="password_confirm"
						type="password_confirm"
						id="password_confirm"
						onChange={handlePasswordConfirm}
						autoComplete="current-password"
						value={user.password_confirm ? user.password_confirm : ''}
					/>
					<FormControlLabel
						control={
							<Checkbox 
	                            checked={user.is_admin ? user.is_admin : false}
	                            onChange={handleUserChkboxToggle}
                				id='is_admin'
	                            name="is_admin"
	                            color="primary"
                        	/>
                        }
						label="Admin"
					/>
					<br/>
                    <FormControl >
                        <InputLabel htmlFor="age-native-simple">Role:</InputLabel>
                        <Select
                            native
                            onChange={handleChange}
                            title='role_id'
                            inputProps={{
                                name: 'age',
                                id: 'age-native-simple',
                            }}
							value={user.role_id ? user.role_id : ''}
                        >
                        <option value='0'></option>
                        {
                            Object
                            .keys(roles)
                            .map(key => <option key={key} value = {roles[key].id}>{roles[key].value}</option>)
                        }
                        </Select>
                    </FormControl>
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