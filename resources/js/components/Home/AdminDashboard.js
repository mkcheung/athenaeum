import axios from 'axios';
import React, { useState, useEffect, useCallback, useContext, useRef } from 'react';
import { useAuth } from '../GlobalStates';
import { AgGridReact } from 'ag-grid-react';
import swal from 'sweetalert2';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const AdminDashboard = () => {

    const [ users, setUsers ] = useState([]);
    const [ userPosts, setUserPosts ] = useState([]); 
    const { authState, setAuthState } = useAuth();
    const [ userGridReady, setUserGridReady ] = useState({
        userGrid: false
    }); 
    const [ loading, setLoading ] = useState(true);

    const userGridApi = useRef();

    const [rowData] = useState([
        {make: "Toyota", model: "Celica", price: 35000},
        {make: "Ford", model: "Mondeo", price: 32000},
        {make: "Porsche", model: "Boxter", price: 72000}
    ]);

    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ])

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

            const colDef = {
                headerName: headerNameWords.join(' '),
                field: userField,
                editable: false,
                width:100
            }
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
        // TODO: Find out why this is necessary....what is causing this to authDashboard to 
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
            setLoading(false);
            setUsers(userData);
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

   return (
       <div className="ag-theme-alpine" style={{height: 400, width: 1000}}>
           <AgGridReact
                onGridReady={onUserGridReady}
                rowData={users}
                columnDefs={columnDefs}>
           </AgGridReact>
       </div>
   );
};

export default AdminDashboard;