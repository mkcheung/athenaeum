import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert2';
import { 
    Link,
    useNavigate,
    useParams 
} from 'react-router-dom';
import { useAuth } from '../GlobalStates';
// import { AgGridColumn, AgGridReact } from 'ag-grid-react';

// var gridOptions = {
//     columnDefs: [
//         { headerName: 'Make', field: 'make' },
//         { headerName: 'Model', field: 'model' },
//         { headerName: 'Price', field: 'price' }
//     ],
//     rowData: [
//         { make: 'Toyota', model: 'Celica', price: 35000 },
//         { make: 'Ford', model: 'Mondeo', price: 32000 },
//         { make: 'Porsche', model: 'Boxter', price: 72000 }
//     ]
// };

const NewTag = () => {

    const [ title, setTitle ] = useState('');
    const [ errors, setErrors ] = useState([]);
    const { authState, setAuthState } = useAuth();
    const navigate = useNavigate();

    const handleCreateNewTag = async (event) => {
        event.preventDefault()


        const tag = {
            title: title,
        }

        try {
            let results = await axios.post('/api/tags',
                {
                    data: tag,

                },
                {   
                    headers: {
                        'Authorization': 'Bearer '+authState.accessToken,
                        'Accept': 'application/json'
                    }
                }
            );
            swal.fire("Done!", "Tag Created!", "success");
            navigate('/');
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
    }

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        setTitle(inputTitle);
    }

    const hasErrorFor = (field) => {
        return !!errors[field]
    }

    const renderErrorFor = (field) => {
        if (hasErrorFor(field)) {
            return (
                <span className='invalid-feedback'>
                    <strong>{errors[field][0]}</strong>
                </span>
            )
        }
    }


    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-6'>
                    <div className='card'>
                        <div className='card-header'>Create new Tag</div>
                        <div className='card-body'>
                            <form onSubmit={handleCreateNewTag}>
                                <div className='form-group'>
                                    <label htmlFor='name'>Tag title</label>
                                    <input
                                        id='title'
                                        type='text'
                                        classtitle={`form-control ${hasErrorFor('title') ? 'is-invalid' : ''}`}
                                        title='title'
                                        value={title}
                                        onChange={handleTitleChange}
                                    />
                                    {renderErrorFor('title')}
                                </div>
                                    <button 
                                        className='btn btn-primary'
                                        onClick={handleCreateNewTag}
                                    >
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewTag