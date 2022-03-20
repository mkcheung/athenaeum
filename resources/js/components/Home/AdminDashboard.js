import axios from 'axios';
import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../GlobalStates';
import { AgGridReact } from 'ag-grid-react';
import swal from 'sweetalert2';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths
import { 
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip,
} from '@material-ui/core';
import { 
    Delete as DeleteIcon,
    List as ListIcon,
    PlaylistAdd as PlaylistAddIcon
} from '@material-ui/icons';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { formatDate } from '../Helper/Helper';
import { 
    ColorDeleteButton,
    ColorEditButton,
    IOSSwitch 
} from './../CustomComponents/CustomComponents';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AdminDashboard = () => {

    const [ users, setUsers ] = useState([]);
    const [ selectedUserId, setSelectedUserId ] = useState(null);
    const [ selectedUser, setSelectedUser ] = useState(null);
    const [ selectedUserPosts, setSelectedUserPosts ] = useState([]); 
    const { authState, setAuthState } = useAuth();
    const [ userGridReady, setUserGridReady ] = useState({
        userGrid: false
    }); 
    const [ loading, setLoading ] = useState(true);

    const userGridApi = useRef();

    const userTableColumnDefinitions = async () => {
        const tableDefinitions = [];
        tableDefinitions.push({
            headerName: 'Authors And Administrators',
            field: 'full_name',
            pinned: 'left',
            editable: false,
            width: 300,
        });

        userFields.forEach((userField) => {

            let headerNames = userField.replaceAll('_',' ');
            let headerNameWords = headerNames.split(" ");
            for (let i = 0; i < headerNameWords.length; i++) {
                headerNameWords[i] = headerNameWords[i][0].toUpperCase() + headerNameWords[i].substr(1);
            }

            let colDef = {
                headerName: headerNameWords.join(' '),
                field: userField,
                editable: false,
                width:100
            };
            tableDefinitions.push(colDef);
        });

        return tableDefinitions;
    }

    const userFields = [
        'name',
        'first_name',
        'last_name',
        'email'
    ];

    useEffect( () => {
        // TO DO: Find out why this is necessary....what is causing this to authDashboard to 
        // load prematurely?? Find out why AuthState is not always reliable for the protected route
        // The reload doesn't always happen prior to this.
        if(authState.accessToken){
            loadData();
        }
    }, [authState.accessToken]);

    useEffect(() => {
        if( userGridReady.userGrid ){
            updateUserTableColumnDefs();
        }
    }, [userGridReady.userGrid])

    useEffect(() => {
        if( userGridReady.userGrid ){
            updateUserTableColumnDefs();
        }
    }, [userGridReady.userGrid])

    useEffect(() => {
        if(selectedUserId) {
            loadUserDataAndPosts();
        }
    }, [selectedUserId])

    const updateUserTableColumnDefs = useCallback(async () => {
        const userTableColDefs = await userTableColumnDefinitions();
        if( userGridApi.current ){
            userGridApi.current.setColumnDefs(userTableColDefs);
        }
    }, [users])

   const loadData = async () => {

        let userData = [];
        try {
            const userObj = await axios.get('/api/users',
                {   
                    headers: {
                        'Authorization': 'Bearer '+authState.accessToken,
                        'Accept': 'application/json'
                    }
                }
            );
            userData = userObj.data;
            console.log('userData', userData);
            setLoading(false);
            setUsers(userData);
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
    }

    const loadUserDataAndPosts = async () => {

        let postData = [];
        try {
            const postObj = await axios.get('/api/posts/getUserPosts', 
            {
                headers: {
                    'Authorization': 'Bearer '+authState.accessToken,
                    'Accept': 'application/json'
                },
                params: {
                    userId: selectedUserId
                }
            });
            postData = postObj.data;
            let theSelectedUser = users.find(user => user.id === selectedUserId);
            setSelectedUser(theSelectedUser);
            setSelectedUserPosts(postData);
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
        
    }

    const onUserGridReady = (params) => {
        userGridApi.current = params.api;
        setUserGridReady((prevState) => ({
            ...prevState,
            userGrid:true
        }));
    }

    const onSelectionChanged = useCallback(() => {
        const selectedRows = userGridApi.current.getSelectedRows();

        if(selectedRows.length){
            setSelectedUserId(selectedRows[0].id);
        }
    }, []);

    const checkboxSelection = (params) => {

        console.log(params.data.roles[0].name);
        return true;
    };

    const checkbox = (params) => {
        return params.node.group === true;
    };

    const showDescendantPosts = false;

    let postsOnDashboard = <div></div>;

    if(selectedUserPosts.length > 0){
        postsOnDashboard = 
        <div className="usersPosts">
            {
                selectedUserPosts.length && selectedUserPosts.map(selectedUserPost => (
                <div key={`post-${selectedUserPost.id}`} style={{padding:20}}>
                    <h2>
                        <Link
                            to={`/post/show/${selectedUserPost.id}`}
                            key={selectedUserPost.id}
                            style={{ textDecoration: 'none', color:'black' }}
                        >
                            {selectedUserPost.title}
                        </Link>
                    </h2>
                    <HTMLEllipsis
                        unsafeHTML={selectedUserPost.content}
                        maxLine='3'
                        ellipsis='...'
                        basedOn='letters'
                    />
                    Author: {selectedUserPost.user.full_name}
                    <br/>
                    Posted: {formatDate(selectedUserPost.created_at)}
                    <div style={{float:'right', top:'-27px', position:'relative'}}>
                        <IOSSwitch
                            checked={selectedUserPost.published === 1 ? true : false}
                            onChange={() => {
                                togglePublished(selectedUserPost.id, selectedUserPost.published === 1);
                            }}
                            name="published"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        {
                            (showDescendantPosts === false && selectedUserPost.descendant_post_id !== null )&& 

                                <ColorEditButton style={{marginRight:'10px', height:'47px', top:'-1px'}} variant="contained" color="primary" onClick={()=>loadPostDescendants(post.id)}>
                                    <ListIcon style={{color:'white'}} />
                                </ColorEditButton>
                        }
                        <Tooltip title="Delete Post(s)" placement="bottom">
                            <ColorDeleteButton style={{height:'47px', top:'-1px'}} variant="contained" color="secondary" onClick={()=>deleteBook(post.id)}>
                                <DeleteIcon style={{color:'white'}} />
                            </ColorDeleteButton>
                        </Tooltip>
                    </div>
                    <hr/>
                </div>
            ))}
        </div>
    } else {

        postsOnDashboard = 
        <div>No posts yet.</div>;
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={5}>
                    <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
                        <AgGridReact
                            onGridReady={onUserGridReady}
                            rowData={users}
                            rowSelection={'multiple'}
                            onSelectionChanged={onSelectionChanged}
                        >
                        </AgGridReact>
                    </div>
                    {postsOnDashboard}
                </Grid>
                <Grid item xs={7}>
                </Grid>
            </Grid>
        </Container>
   );
};

export default AdminDashboard;