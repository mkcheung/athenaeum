import axios from 'axios';
import React, { useState, useEffect, useCallback, useContext, useRef, useMemo } from 'react';
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

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const userGridApi = useRef();

    const roleMappings = {
        Admin: 'Admin',
        Author: 'Author',
    };


const extractValues = (mappings) => {
  return Object.keys(mappings);
};

const roleOptions = extractValues(roleMappings);

    const lookupValue = (mappings, key) => {
        return mappings[key];
    };

    const lookupKey = (mappings, name) => {
        const keys = Object.keys(mappings);
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (mappings[key] === name) {
                return key;
            }
        }
    };

    const userTableColumnDefinitions = async () => {
        const tableDefinitions = [];
        tableDefinitions.push({
            headerName: 'Authors And Administrators',
            field: 'full_name',
            pinned: 'left',
            editable: false,
            width:220
        });

        userFields.forEach((userField) => {

            let colDef = '';
            let headerNames = userField.replaceAll('_',' ');
            let headerNameWords = headerNames.split(" ");
            for (let i = 0; i < headerNameWords.length; i++) {
                headerNameWords[i] = headerNameWords[i][0].toUpperCase() + headerNameWords[i].substr(1);
            }

            if(userField == 'roles'){
                colDef = {
                    headerName: 'Role',
                    valueGetter: (params) => {
                        let roleName = params.data.roles[0].name;
                        return roleName.charAt(0).toUpperCase() + roleName.slice(1);
                    },
                    valueSetter: params => {
                        params.data.roles[0].name = params.newValue.charAt(0).toLowerCase() + params.newValue.slice(1);
                        return true;
                    },
                    editable: (params) => {
                        let roleName = params.data.roles[0].name;
                        return roleName == 'superadmin' ? false : true;
                    },
                    width: 160,
                    filter: 'agTextColumnFilter',
                    valueFormatter: params => { 
                        let roleName = params.value;
                        return roleName.charAt(0).toUpperCase() + roleName.slice(1);
                    },
                    cellRenderer: (params)=>{
                        return params.value;
                    },
                    valueParser: function (params) {
                        return lookupKey(roleMappings, params.value);
                    },
                    cellEditor: 'agSelectCellEditor',
                    cellEditorParams: {
                        values: roleOptions
                    },
                    onCellValueChanged: async (e) => {
                        const { newValue, column, data } = e;

                        // TO DO: Is this a race condition? Why can't I use the token in the auth state to make 
                        // an api call??
                        let appStateData = localStorage["appState"] ? JSON.parse(localStorage["appState"]) : null;
                        await handleRoleChange(data.id, newValue, appStateData.accessToken)
                    }
                };
            } else {
                colDef = {
                    headerName: headerNameWords.join(' '),
                    field: userField,
                    editable: false,
                    width: 160,
                    filter: 'agTextColumnFilter'
                };
            }
            tableDefinitions.push(colDef);
        });

        return tableDefinitions;
    }

    const userFields = [
        'name',
        'first_name',
        'last_name',
        'email',
        'roles'
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
        userGridApi.current.sizeColumnsToFit();
    }

    const resizeGrid = () => {
        userGridApi.current.sizeColumnsToFit();
    }

    const onSelectionChanged = useCallback(() => {
        const selectedRows = userGridApi.current.getSelectedRows();

        if(selectedRows.length){
            setSelectedUserId(selectedRows[0].id);
        }
    }, []);

    const handleRoleChange = async (userId, newRole, theToken) => {

        let userData = {
            role: newRole
        };

         try {
                let results = await axios.post('/api/users/'+userId,
                    { 
                        data: userData,
                        _method: 'patch'                  
                    },
                    {   
                        headers: {
                            'Authorization': 'Bearer '+theToken,
                            'Accept': 'application/json'
                        }
                    }
                );
            } catch (error) {
                swal.fire("Error", String(error), "error");
            }
    }

    const togglePublished = async (postId, published) => {

        let post = selectedUserPosts.find(selectedUserPost => selectedUserPost.id === postId);
        published = !published;
        published = published ? 1 : 0 ;

        post['published'] = published;

        if (postId){
            
            try {
                let results = await axios.post('/api/posts/'+postId,
                    { 
                        data: post,
                        _method: 'patch'                  
                    },
                    {   
                        headers: {
                            'Authorization': 'Bearer '+authState.accessToken,
                            'Accept': 'application/json'
                        }
                    }
                );

                selectedUserPosts.forEach((selectedUserPost) => {
                    if(selectedUserPost.id === postId){
                        selectedUserPost.published = published;
                    }
                });
                setSelectedUserPosts(
                    [
                        ...selectedUserPosts,
                    ]
                );
            } catch (error) {
                swal.fire("Error", String(error), "error");
            }
        } 
    }


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
        <div></div>;
    }


    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12} style={{height: 200}}>
                    <div className="ag-theme-alpine" style={gridStyle}>
                        <AgGridReact
                            onGridReady={onUserGridReady}
                            rowData={users}
                            rowSelection={'multiple'}
                            onSelectionChanged={onSelectionChanged}
                            onGridSizeChanged={resizeGrid}
                        >
                        </AgGridReact>
                    </div><br/>
                    {postsOnDashboard}
                </Grid>
            </Grid>
        </Container>
   );
};

export default AdminDashboard;