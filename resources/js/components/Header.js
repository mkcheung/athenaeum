import React, { useContext, useEffect } from 'react';
import { AuthContext } from './GlobalStates';
import { fade, makeStyles } from '@material-ui/core/styles';
import {
    Link,
    withRouter,
    Redirect,
    useNavigate
} from 'react-router-dom';
import { 
    AppBar,
    Button,
    IconButton,
    InputBase,
    Link as MUILINK,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Typography,
    Fade
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import { 
    Search as SearchIcon,
    PersonPin as PersonPinIcon
} from '@material-ui/icons';
import swal from 'sweetalert2';


const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    welcomeMessage: {
        paddingTop:'7px'
    },
    title: {
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
        paddingTop:'1px'
    },
    titleAndUserSelect: {
        display: 'inherit',
        flexGrow: 1,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    root: {
        boxShadow: "none",
        backgroundColor: "darkslategrey" 
    } 
}));

const Header = (props) => {
    let {
        anchorEl,
        blogAuthors,
        handleClick,
        handleClose,
        isLoggedIn,
        openMenu,
        user
    } = props;
    const classes = useStyles();
    const navigate = useNavigate();
    const [authState,setAuthState] = useContext(AuthContext);

    const handleLogOut = async () => {
// localStorage.clear();
// setAuthState({
//         isLoggedIn:false,
//         user:{},
//         accessToken:''
//     });

        try {
            let response = await axios.post('/api/logout', {},
            {
                headers: {
                    'Authorization': 'Bearer ' + authState.accessToken,
                    'Accept': 'application/json'
                }
            });
            swal.fire('Done!', 'You have logged out!', 'success');
            localStorage.clear();
            setAuthState({
                isLoggedIn:false,
                user:{},
                accessToken:''
            });
            handleClose();
            navigate(`/`);
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }

    };

    const handleInputChange = (event, value) => {
        if(value === null){
            if(isLoggedIn){
                navigate(`/dashboard`);
            } else {
                navigate(`/`);
            }
        } else {
            navigate(`/user/getPosts/${value.id}`);
        }
    }

    const handleSetUserProfile = async (event) => {
        event.preventDefault();

        //history.push(`/user/edit/${user.id}`);
    }

    let loggedInUserName = '';
    if(authState.user.full_name && authState.user.full_name.length>0){
        loggedInUserName = 
            <div className="loginDisplayColor">

                <IconButton className="loginDisplayColor" onClick={handleClick} >
                    <PersonPinIcon /> 
                    <h6 className={ classes.welcomeMessage }>
                        Welcome {authState.user.full_name}!
                    </h6>
                </IconButton>
                <Menu
                    id="fade-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={openMenu}
                    onClose={handleClose}
                    TransitionComponent={Fade}
                >
                    <MenuItem onClick={(e) => handleSetUserProfile(e)}>Profile</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                </Menu>
            </div>;
    }

    let loggedInOutNavOps = '';
    if(authState.isLoggedIn) {
        loggedInOutNavOps =
            <div className="logoutDisplay">
                <div className="about">
                    <h5>
                        <Link 
                            to='/post'
                            className="headerLink"
                        >
                        Posts
                        </Link>
                    </h5>
                </div>
                <div className="about">
                    <h5>
                        <Link 
                            to='/book/getUserBooks'
                            className="headerLink"
                        >
                        Books
                        </Link>
                    </h5>
                </div>
                <div className="headerDivider">
                    <h5>
                        <Link 
                            to='/tag'
                            className="headerLink"
                        >
                        Tags
                        </Link>
                    </h5>
                </div>
            </div>;
    } else {
        loggedInOutNavOps =
            <div className="logoutDisplay">
                <div className="about">
                    <h5>
                        <Link 
                            to='/login'
                            className="headerLink"
                        >
                        Login
                        </Link>
                    </h5>
                </div>
                <div className="about">
                    <h5>
                        <Link 
                            to='/register'
                            className="headerLink"
                        >
                        Register
                        </Link>
                    </h5>
                </div>
            </div>;
    }

    let dropdownOptions =
        <div className={classes.titleAndUserSelect}> 
            <div className={classes.search}>
                <Autocomplete
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}

                    options={blogAuthors}
                    getOptionLabel={(blogAuthor) => blogAuthor.full_name}
                    style={{ width: 300 }}
                    onChange={handleInputChange}
                    renderInput={(params) => 
                        <TextField label="Search Posts By Author" {...params} variant="outlined" />
                    }
                />
            </div>
            <div className="about">
                <h5>
                    <Link 
                        to='/about' 
                        className="headerLink"
                    >
                    About
                    </Link>
                </h5>
            </div>
            {loggedInOutNavOps}
        </div>;

  return (
    <div className={classes.grow}>
        <AppBar className={classes.root} position="static">
            <Toolbar>
                <Typography className={classes.title} variant="h6" noWrap>
                    Phronesis Project
                </Typography>
                {dropdownOptions}
                {loggedInUserName}
            </Toolbar>
        </AppBar>
    </div>
  );
}
export default Header;