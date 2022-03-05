import React, { useState, useEffect ,useContext } from 'react';
import {Link, useNavigate} from "react-router-dom";
import { AuthContext } from '../GlobalStates';


const Login = (props) => {

    const [credentials , setCredentials] = useState({
        email : "",
        password : ""
    })

    const [formSubmitting, setFormSubmit] = useState(false);
    const [authState,setAuthState] = useContext(AuthContext);
    const handleLogin = (event) => {
    
        event.preventDefault();

        const email = event.target.email.value;
        const password = event.target.password.value;
        setFormSubmit(true);
        loginUser(email, password);
    }

    const loginUser = async (email, password) => {

        let userData = {
            email,
            password
        };
        let loggedInData = await axios.post("/api/login", userData);
        if (loggedInData.status == 200) {

            let { id, user, access_token } = loggedInData.data;
            let userData = {
                ...user
            };
            let appState = {
                isLoggedIn: true,
                user: userData,
                accessToken: access_token
            };

            localStorage["appState"] = JSON.stringify(appState);
            setAuthState(appState);
            navigate('/dashboard');
        } else {
            alert(`Our System Failed To Register Your Account!`);
            // this.setState({
            //     error: '',
            //     formSubmitting: false
            // })
            setFormSubmit(false);
        }
    }

    const handleChange = ((e) => {
        const {id, value} = e.target;
        setState((prevState) => ({
            ...prevState,
            [id]:value
        }));
    });

    useEffect(() => {
        navigate('/dashboard');
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