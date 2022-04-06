import React, 
    { 
        useEffect,
        useState,
    } from 'react';
import ReactDOM from 'react-dom';
import { 
    BrowserRouter,
    Route,
    Routes,
    __RouterContext,
} from "react-router-dom";
import { useAuth, AuthProvider } from './GlobalStates';
import { useUserData, UserProvider } from './UserContext';
import Footer from './Footer';
import Header from './Header';
import Dashboard from './Home/Dashboard';
import AdminDashboard from './Home/AdminDashboard';
import RecentBlog from './Home/RecentBlog';
import About from './About';
import Login from './Auth/Login';
import Register from './Auth/Register';
import CitationsAndChapters from './Books/CitationsAndChapters';
import NotFound from './NotFound';
import NewPost from './Posts/NewPost';
import ShowPost from './Posts/ShowPost';
import UserBookList from './Users/UserBookList';
import UserBlog from './Users/UserBlog';
import UserEdit from './Users/UserEdit';
import ProtectedRoute from './ProtectedRoute';
import TagsList from './Tags/TagsList';

const App = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({});
    const [openMenu, setOpenMenu] = useState(false);
    const [blogAuthors, setBlogAuthors] = useState([]);
    const { authState } = useAuth();
    const { users, usersLoading } = useUserData();

    // when users are altered, they affect the authors.
    // reload the authors in the dropdown accordingly.
    useEffect(async () => {
        let blogAuthors = [];
        let authorRes = await axios.get('/api/users/showAuthors', 
            {
                headers: {
                    'Accept': 'application/json'
                }
            });

        authorRes.data.forEach(function(author){
            let authorObj = {};
            authorObj['id'] = author.id;
            authorObj['full_name'] = author.full_name;
            blogAuthors.push(authorObj);
        });
        setBlogAuthors(blogAuthors);
    }, [users]);

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
                    <Route exact path='/post/create/chapter/:parentId/' 
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
                    <Route exact path='/book/citationsAndChapters/:id' 
                        element={
                            <ProtectedRoute requiredPerm="book-list">
                                <CitationsAndChapters/>
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
        <UserProvider>
            <App />
        </UserProvider>,
    </AuthProvider>,
    document.getElementById('app')
);