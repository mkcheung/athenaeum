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
import { useAuth, AuthProvider } from './GlobalStates';
import Footer from './Footer';
import Header from './Header';
import Dashboard from './Home/Dashboard';
import AdminDashboard from './Home/AdminDashboard';
import RecentBlog from './Home/RecentBlog';
import About from './About';
import Login from './Auth/Login';
import Register from './Auth/Register';
import NotFound from './NotFound';
import NewPost from './Posts/NewPost';
import ShowPost from './Posts/ShowPost';
import UserBookList from './Users/UserBookList';
import UserBlog from './Users/UserBlog';
import UserEdit from './Users/UserEdit';
import ProtectedRoute from './ProtectedRoute';
import NewTag from './Tags/NewTag';
import TagsList from './Tags/TagsList';
import CategoriesList from './Categories/CategoriesList';
import NewCategory from './Categories/NewCategory';

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [openMenu, setOpenMenu] = useState(false);
    const [blogAuthors, setBlogAuthors] = useState([]);
    const { authState } = useAuth();

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

    return (
        <BrowserRouter>
            <Header anchorEl={anchorEl} blogAuthors={blogAuthors} handleClick={handleClick} handleClose={handleClose} openMenu={openMenu} /> 
                <Routes>
                    <Route exact path='/' element={<RecentBlog/>} />
                    <Route exact path='/login' element={<Login/>} />
                    <Route exact path='/register' element={<Register/>}/>
                    <Route exact path='/about' element={<About/>}/>
                    <Route exact path='/user/getPosts/:id' element={<UserBlog/>} />
                    <Route exact path='/post/show/:id' element={<ShowPost/>}/>
                    <Route exact path='/admindashboard' 
                        element={
                            <ProtectedRoute>
                                <AdminDashboard/>
                            </ProtectedRoute>
                        }
                    />
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
                    <Route exact path='/post/create' 
                        element={
                            <ProtectedRoute requiredPerm="post-create">
                                <NewPost/>
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path='/post/edit/:id' 
                        element={
                            <ProtectedRoute requiredPerm="post-edit">
                                <NewPost/>
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path='/user/edit/:id' 
                        element={
                            <ProtectedRoute requiredPerm="user-edit">
                                <UserEdit/>
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path='/tag' 
                        element={
                            <ProtectedRoute requiredPerm="tag-list">
                                <TagsList/>
                            </ProtectedRoute>
                        }
                    />
                    <Route exact path='/book/getUserBooks' 
                        element={
                            <ProtectedRoute requiredPerm="book-list">
                                <UserBookList/>
                            </ProtectedRoute>
                        }
                    />
                    <Route path="*" element={<NotFound/>}/>
                </Routes>       
            <Footer/>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <AuthProvider>
        <App />
    </AuthProvider>,
    document.getElementById('app')
);