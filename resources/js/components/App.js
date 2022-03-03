import React, 
    { 
        useEffect,
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
import { AuthProvider } from './GlobalStates';
import Footer from './Footer';
import Header from './Header';
import Dashboard from './Home/Dashboard';
import RecentBlog from './Home/RecentBlog';
import About from './About';
import Login from './Auth/Login';
import Register from './Auth/Register';
import NewPost from './Posts/NewPost';
import PostsLists from './Posts/PostsLists';
import UserBookList from './Users/UserBookList';
import ProtectedRoute from './ProtectedRoute';

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [openMenu, setOpenMenu] = useState(false);
    const [blogAuthors, setBlogAuthors] = useState([]);

    useEffect(async () => {

        let blogAuthors = [];
        let authorRes = await axios.get('/api/users/showAuthors', 
            {
                headers: {
                    'Accept': 'application/json'
                }
            });

        authorRes.data.forEach(function(author){
            let temp = {};
            temp['id'] = author.id;
            temp['full_name'] = author.full_name;
            blogAuthors.push(temp);
        });

        setBlogAuthors(blogAuthors);
    }, []);

    const handleClick = (event) => {
        event.preventDefault();
        setOpenMenu(true);
        setAnchorEl(event.target);
    };

    const handleClose = () => {
        setOpenMenu(false);
        setAnchorEl(null);
    };


    // let role = user.roles ? user.roles[0] : '';
    return (
        <BrowserRouter>
            <AuthProvider>
                <Header anchorEl={anchorEl} blogAuthors={blogAuthors} handleClick={handleClick} handleClose={handleClose} openMenu={openMenu} /> 
                    <Routes>
                        <Route exact path='/' element={<RecentBlog/>} />
                        <Route exact path='/login' element={<Login/>} />
                        <Route exact path='/register' element={<Register/>}/>
                        <Route exact path='/about' element={<About/>}/>
                        <Route exact path='/dashboard' 
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path='/dashboard/:id' 
                            element={
                                <ProtectedRoute>
                                    <Dashboard/>
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path='/post' 
                            element={
                                <ProtectedRoute>
                                    <PostsLists/>
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path='/post/create' 
                            element={
                                <ProtectedRoute>
                                    <NewPost/>
                                </ProtectedRoute>
                            }
                        />
                        <Route exact path='/book/getUserBooks' 
                            element={
                                <ProtectedRoute>
                                    <UserBookList/>
                                </ProtectedRoute>
                            }
                        />
                    </Routes>       
                <Footer/>
            </AuthProvider>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);