import React, { useState, useEffect, useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from '../GlobalStates';

const Login = (props) => {

    const [credentials , setCredentials] = useState({
        email : "",
        password : ""
    })

    const [formSubmitting, setFormSubmit] = useState(false);
    const {loginUser,authState,setAuthState} = useAuth();
    const handleLogin = (event) => {
    
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        setFormSubmit(true);
        loginUser(email, password);
        setFormSubmit(false);
    }

    const handleChange = ((e) => {
        const {id, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]:value
        }));
    });

    useEffect(() => {
        if(authState.isSuperAdmin || authState.user.role === 'admin'){
            navigate('/admindashboard');
        } else {
            navigate('/dashboard');
        }
    }, [authState.isLoggedIn]);

    const navigate = useNavigate();

    return (
            <div className="container">
                <div className="container">

                <div id="main">

                    <form id="login-form" action="" onSubmit={(event) => handleLogin(event)} method="post">

                        <h3 style={{ padding: 15 }}>Login Form</h3>

                        <input
                            style={styles.input}
                            autoComplete="off"
                            id="email-input"
                            name="email"
                            type="text"
                            className="center-block"
                            placeholder="email"

                        />

                        <input
                            style={styles.input}
                            autoComplete="off"
                            id="password-input"
                            name="password"
                            type="password"
                            className="center-block"
                            placeholder="password"

                        />

                        <button
                            type="submit"
                            style={styles.button}
                            className="landing-page-btn center-block text-center"
                            id="email-login-btn"
                            href="#facebook"

                        >
                            Login
                        </button>

                    </form>
                </div>

            </div>
            </div>
        )
}


const styles = {

    input: {

        backgroundColor: "white",

        border: "1px solid #cccccc",

        padding: 15,

        float: "left",

        clear: "right",

        width: "80%",

        margin: 15

    },

    button: {

        height: 44,

        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)",

        border: "none",

        backgroundColor: "red",

        margin: 15,

        float: "left",

        clear: "both",

        width: "80%",

        color: "white",

        padding: 15

    },

    link: {

        width: "100%",

        float: "left",

        clear: "both",

        textAlign: "center"

    }

};


export default Login;