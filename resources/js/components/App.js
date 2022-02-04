import React, 
    { 
        useState,
        useContext
    } from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter,
    Link,
    Route,
    Routes,
    HashRouter,
    Redirect,
    __RouterContext,
} from "react-router-dom";
import Footer from './Footer';
import Header from './Header';
import Dashboard from './Home/Dashboard';
import RecentBlog from './Home/RecentBlog';
import About from './About';
import Login from './Auth/Login';
import Register from './Auth/Register';

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [openMenu, setOpenMenu] = useState(false);
    const [blogAuthors, setBlogAuthors] = useState([]);
    const [formSubmitting, setFormSubmit] = useState(false);


    const handleClick = (event) => {
        event.preventDefault();
        setOpenMenu(true);
        setAnchorEl(event.target);
    };

    const handleClose = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    };

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

console.log('loginUser', loggedInData);
            // let { id, name, full_name, first_name, last_name, email, token, roles, permissions, rolesAndPermissions, userSpecificPermissions } = loggedInData.data;
        let { id, name, email, token } = loggedInData.data;
console.log('loginUser', token);
            let userData = {
                id,
                name,
                email,
                token,
            };
            let appState = {
                isLoggedIn: true,
                user: userData
            };
console.log('appState', appState);
            localStorage["appState"] = JSON.stringify(appState);
            // this.setState({
            //     isLoggedIn: appState.isLoggedIn,
            //     user: appState.user,
            //     error: ''
            // });
            console.log('as loggedin: ', appState.isLoggedIn);
            setLoggedIn(appState.isLoggedIn);
            setUser(appState.userData);
        } else {
            alert(`Our System Failed To Register Your Account!`);
            // this.setState({
            //     error: '',
            //     formSubmitting: false
            // })
            setFormSubmit(false);
        }
    }


    // let role = user.roles ? user.roles[0] : '';
    return (
        <BrowserRouter>
            <Header anchorEl={anchorEl} blogAuthors={blogAuthors} token={user.access_token} user={user} isLoggedIn={loggedIn} handleClick={handleClick} handleClose={handleClose} openMenu={openMenu} /> 
                <Routes>
                    <Route exact path='/' element={<RecentBlog/>} />
                    <Route exact path='/login' element={<Login handleLogin={handleLogin} isLoggedIn={loggedIn} />}/>
                    <Route exact path='/register' element={<Register/>}/>
                    <Route exact path='/about' element={<About/>}/>
                    <Route exact path='/dashboard' element={<Dashboard/>}/>
                    <Route exact path='/dashboard/:id' element={<Dashboard/>}/>
                </Routes>       
            <Footer/>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);