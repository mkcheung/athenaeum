import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import swal from 'sweetalert2';
import { AuthContext } from '../GlobalStates';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { 
    Button,
    Checkbox,
    Chip,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';

const UserEdit = () => {

    const [ authState, setAuthState ] = useContext(AuthContext);

    const [user, setUser] = useState({
        name: '',
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '',
        is_admin:false,
        role_id:0
    });

    useEffect(()=>{
        setUser({
            name:authState.user.name,
            first_name:authState.user.first_name,
            last_name:authState.user.last_name,
            email:authState.user.email,
            password:authState.user.password,
            role_id:authState.user.role_id,
        });
    },[]);

    const handleNameChange = (e) => {
        let newName = e.target.value;

        setUser((prevState)=>({
            ...prevState,
            name:newName
        }));
    }

    const handleFirstNameChange = (e) => {
        let newFirstName = e.target.value;
        setUser((prevState)=>({
            ...prevState,
            first_name:newFirstName
        }));
    }

    const handleLastNameChange = (e) => {
        let newLastName = e.target.value;
        setUser((prevState) => ({
            ...prevState,
            last_name:newLastName
        }));
    }

    const handleEmailChange = (e) => {
        let newEmail = e.target.value;
        setUser((prevState) => ({
            ...prevState,
            email:newEmail
        }));
    }


   const handleUserProfileUpdate = async (event, updatedUser) => {
        event.preventDefault();

        let user = updatedUser;
        user['full_name'] = user['first_name'] + ' ' + user['last_name'];
        if (user.id){

            try {
                let results = await axios.post('/api/users/'+user.id,
                    { 
                        data: user,
                        _method: 'patch'                  
                    },
                    {   
                        headers: {
                            'Authorization': 'Bearer '+authState.access_token,
                            'Accept': 'application/json'
                        }
                    }
                );


                let state = localStorage["appState"];
                let AppState = JSON.parse(state);
                let userPriorState = AppState.user;

                let userNewState = {
                    ...userPriorState,
                    ...user
                }
                let newAppState = {
                    isLoggedIn: true,
                    user: userNewState,
                    accessToken: authState.access_token
                };
                localStorage["appState"] = JSON.stringify(newAppState);
                setAuthState(newAppState);

                swal.fire("Done!", "User Updated.", "success");
            } catch (error) {
                swal.fire('Done!', String(error), 'error');
            }
        }
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className='card-header'>User Profile</div>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={(e) => handleUserProfileUpdate(e, user)}>
                        <Grid container>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="name">Username:</InputLabel>
                                <TextField 
                                    id="name" 
                                    title='name' 
                                    onChange={handleNameChange} 
                                    value={user.name}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={6}>
                                <InputLabel htmlFor="first_name">First Name:</InputLabel>
                                <TextField 
                                    id="first_name" 
                                    title='first_name' 
                                    onChange={handleFirstNameChange} 
                                    value={user.first_name}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <InputLabel htmlFor="last_name">Last Name:</InputLabel>
                                <TextField 
                                    id="last_name" 
                                    title='last_name' 
                                    onChange={handleLastNameChange} 
                                    value={user.last_name}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <InputLabel htmlFor="email">Email:</InputLabel>
                                <TextField 
                                    id="email" 
                                    title='email' 
                                    onChange={handleEmailChange} 
                                    value={user.email}
                                />
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Button  style={{float:'right'}} type="submit" variant="contained" color="primary" >
                                   Update
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default UserEdit;

