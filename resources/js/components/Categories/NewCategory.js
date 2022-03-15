
import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert2';
import { 
    Link,
    useNavigate,
    useParams 
} from 'react-router-dom';
import { 
  FormControl,
  InputLabel,
  Select,
  TextareaAutosize 
} from '@material-ui/core';

const NewCategory = () => {

    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ slug, setSlug ] = useState('');
    const [ errors, setErrors ] = useState([]);

    const navigate = useNavigate();

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        setTitle(inputTitle);
    }

    const handleDescriptionChange = (e) => {
        const newDesc = e.target.value;
        setDescription(newDesc);
    } 

    const handleSlugChange = (e) => {
        const newSlug = e.target.value;
        setSlug(newSlug);
    }

    const handleCreateNewCategory = async (event) => {
        event.preventDefault()

        const category = {
            title,
            slug,
            description
        };

        try {
            let results = await axios.post('/api/categories/', 
                { 
                    category                  
                },
                {
                    headers: {
                        'Authorization': 'Bearer '+authState.accessToken,
                        'Accept': 'application/json'
                    },
                }
            );
            swal.fire("Done!", "Category Created!", "success");
            navigate('/');
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
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
                        <div className='card-header'>Create new Category</div>
                            <div className='card-body'>
                            <form onSubmit={handleCreateNewCategory}>
                                <div className='form-group'>
                                    <div>
                                        <label htmlFor='name'>Category title</label>
                                        <input
                                            id='title'
                                            type='text'
                                            className={`form-control ${hasErrorFor('title') ? 'is-invalid' : ''}`}
                                            title='title'
                                            value={title}
                                            onChange={handleTitleChange}
                                        />
                                        {renderErrorFor('title')}
                                    </div>
                                    <div>
                                        <label htmlFor='name'>Category slug</label>
                                        <input
                                            id='slug'
                                            type='text'
                                            className={`form-control ${hasErrorFor('slug') ? 'is-invalid' : ''}`}
                                            title='slug'
                                            value={slug}
                                            onChange={handleSlugChange}
                                        />
                                        {renderErrorFor('slug')}
                                    </div>
                                    <div>
                                    <label htmlFor='name'>Content</label><br/>
                                        <TextareaAutosize
                                            id='description'
                                            title='description'
                                            rowsMax={15}
                                            aria-label="maximum height"
                                            placeholder="Maximum 15 rows"
                                            onChange={handleDescriptionChange}
                                            defaultValue="Thoughts...."
                                        />
                                        {renderErrorFor('description')}
                                    </div>
                                </div>
                                <button 
                                    className='btn btn-primary'
                                    onClick={handleCreateNewCategory}>
                                    Create
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default NewCategory;
