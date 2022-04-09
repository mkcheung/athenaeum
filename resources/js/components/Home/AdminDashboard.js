import axios from 'axios';
import React, { useState, useEffect, useCallback, useContext, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../GlobalStates';
import { useUserData } from '../UserContext';
import { AgGridReact } from 'ag-grid-react';
import swal from 'sweetalert2';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths
import { 
    CircularProgress,
    Container,
    Grid,
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

    const { users, setUsers } = useUserData();
    const [ selectedUserId, setSelectedUserId ] = useState(null);
    const [ selectedUser, setSelectedUser ] = useState(null);
    const [ selectedUserPosts, setSelectedUserPosts ] = useState([]); 
    const { loading, authState, setAuthState } = useAuth();
    const [ userGridReady, setUserGridReady ] = useState({
        userGrid: false
    }); 

    const gridStyle = useMemo(() => ({ height: '100%', width: '100%' }), []);

    const userGridApi = useRef();

    const roleMappings = {
        Admin: 'Admin',
        Author: 'Author',
    };

    const statusMappings = {
        Active: 'Active',
        Inactive: 'Inactive',
    };


    const extractValues = (mappings) => {
        return Object.keys(mappings);
    };

    const roleOptions = extractValues(roleMappings);
    const statusOptions = extractValues(statusMappings);

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
        const authAdminHeader = authState.isSuperAdmin ? 'Authors And Administrators' : 'Authors';

        tableDefinitions.push({
            headerName: authAdminHeader,
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
                        await handleRoleChange(data.id, newValue)
                    }
                };
            } else if (userField == 'active') {

                colDef = {
                    headerName: 'Active Status',
                    valueGetter: (params) => {
                        let activeStatus = params.data.active;
                        return activeStatus ? 'Active' : 'Inactive';
                    },
                    valueSetter: params => {
                        params.data.active = params.newValue === 'Active' ? 1 : 0;
                        return true;
                    },
                    editable: (params) => {
                        let roleName = params.data.roles[0].name;
                        return roleName == 'superadmin' ? false : true;
                    },
                    width: 160,
                    filter: 'agTextColumnFilter',
                    valueFormatter: params => { 
                        return params.value;
                    },
                    cellRenderer: (params)=>{
                        return params.value;
                    },
                    valueParser: function (params) {
                        return lookupKey(statusMappings, params.value);
                    },
                    cellEditor: 'agSelectCellEditor',
                    cellEditorParams: {
                        values: statusOptions
                    },
                    onCellValueChanged: async (e) => {
                        const { newValue, column, data } = e;
                        await handleStatusChange(data.id, newValue)
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


    let userFields = [];
    if( authState.isSuperAdmin ){
        userFields = [
            'name',
            'first_name',
            'last_name',
            'email',
            'roles',
            'active',
        ];
    } else {
        userFields = [
            'name',
            'first_name',
            'last_name',
            'email',
            'active',
        ];
    }

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

    const handleRoleChange = async (userId, newRole) => {

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
                            'Authorization': 'Bearer '+authState.accessToken,
                            'Accept': 'application/json'
                        }
                    }
                );
            } catch (error) {
                swal.fire("Error", String(error), "error");
            }
    }

    const handleStatusChange = async (userId, newStatus) => {

        let userData = {
            active: newStatus
        };
         try {
                let results = await axios.post('/api/users/'+userId,
                    { 
                        data: userData,
                        _method: 'patch'                  
                    },
                    {   
                        headers: {
                            'Authorization': 'Bearer '+authState.accessToken,
                            'Accept': 'application/json'
                        }
                    }
                );
                let newUserArray = users.filter(function( user ) {
                    return user.id !== userId;
                });
                setUsers([
                    ...newUserArray,
                    results.data
                ]);
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


    let postsOnDashboard = <div></div>;

    if(selectedUserPosts.length > 0){
        postsOnDashboard = 
        <div className="usersPosts">
            {
                selectedUserPosts.length && selectedUserPosts.map(selectedUserPost => (
                <div key={`post-${selectedUserPost.id}`} className="dshBrdUsrPst">
                    <h2>
                        <Link
                            to={`/post/show/${selectedUserPost.id}`}
                            key={selectedUserPost.id}
                            className="dshBrdUsrPstLink"
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
                    <div className='dshBrdUsrPubSwitch'>
                        <IOSSwitch
                            checked={selectedUserPost.published === 1 ? true : false}
                            onChange={() => {
                                togglePublished(selectedUserPost.id, selectedUserPost.published === 1);
                            }}
                            name="published"
                            inputProps={{ 'aria-label': 'secondary checkbox' }}
                        />
                        <Tooltip title="Delete Post(s)" placement="bottom">
                            <ColorDeleteButton className='dshBrdDelButton' variant="contained" color="secondary" onClick={()=>deleteBook(post.id)}>
                                <DeleteIcon className='dshBrdDelButtonTxt' />
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
        <Container maxWidth='lg'>
            <Grid container spacing={3}>
                <Grid item xs={12} className='dshBrdGridContainer'>
                    <div className='ag-theme-alpine' style={gridStyle}>
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