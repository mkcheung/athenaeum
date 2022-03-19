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

    const userTableColumnDefinitions = () => {
        const tableDefinitions = [];
        tableDefinitions.push({
            headerName: 'Authors And Administrators',
            field: 'full_name',
            pinned: 'left',
            editable: false,
            width: 300,
        });

        userFields.forEach((userField) => {
            const colDef = {
                headerName: userField,
                field: userField,
                editable: false,
                width:100
            }
            tableDefinitions.push[colDef];
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
        console.log('admin dashboard loading useEffect',loading, authState)
        // TODO: Find out why this is necessary....what is causing this to authDashboard to 
        // load prematurely?? Find out why AuthState is not always reliable for the protected route
        // The reload doesn't always happen prior to this.
        if(authState.accessToken){
            loadData();
        }
   }, [loading]);

   useEffect(() => {
        if( userGridReady.userGrid ){
            updateUserTableColumnDefs();
        }
   }, [updateUserTableColumnDefs])

    const updateUserTableColumnDefs = useCallback(() => {
        const userTableColDefs = userTableColumnDefinitions();

        if( userGridApi.current ){
            userGridApi.current.setColumnDefs(userTableColDefs);
        }
        console.log(userGridApi);
    }, [users])

   const loadData = async () => {

                console.log('admin dashboard loading loadData', authState)
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
            console.log(userData);
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
       <div className="ag-theme-alpine" style={{height: 400, width: 600}}>
           <AgGridReact
                onGridReady={onUserGridReady}
                rowData={rowData}
                columnDefs={columnDefs}>
           </AgGridReact>
       </div>
   );
};

export default AdminDashboard;