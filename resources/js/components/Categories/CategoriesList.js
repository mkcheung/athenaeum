import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import NewCategoryModal from './NewCategoryModal';
import { 
	CircularProgress,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	Modal,
	Tooltip
} from '@material-ui/core';
import { 
	Edit as EditIcon,  
} from '@material-ui/icons';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';

const CategoriesList = () => {

	const [ dataLoading, setDataLoading ] = useState(true);
	const [ errors, setErrors ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ selectedCategoryPosts, setSelectedCategoryPosts ] = useState([]);
	const [ open, setOpen ] = useState(false);
	const [ update, setUpdate ] = useState(false);
	const [ newCategory, setNewCategory ] = useState({
		title: '',
		description: '',
		slug: ''
	});

	useEffect(()=>{
		loadData();
	}, []);

	useEffect(()=>{
		loadData();
	}, [dataLoading, categories]);


    const loadData = async () => {

        try {
			 let categoriesAndPostResults = await axios.get('/api/categories/showUserCategories', 
                {
                    headers: {
                        'Authorization': 'Bearer '+authState.accessToken,
                        'Accept': 'application/json'
                    },
	            params: {
	                userId: authState.user.id
	            }
			})
            const categoriesAndPosts = categoriesAndPostResults.data
			setDataLoading(false);
			setCategories(categoriesAndPosts);
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
    };

	const handleOpen = async () => {
		setOpen(true);
		setUpdate(false);
	};

	const handleClose = async () => {
		setOpen(false);
		setNewCategory({
			title: '',
			description: '',
			slug: ''
		});
	};

	const handleFieldChange = async (event) => {

		setNewCategory((prevState) => ({
			...prevState,
			[event.target.id]: event.target.value
		}));
	}

	const handleSubmit = async () => {

        if(update){
	        try {
				let results = await axios.post('/api/categories/'+newCategory['id'], 
	                { 
	                    ...newCategory,
	                    _method: 'patch'                  
	                },
					{
		                headers: {
		                    'Authorization': 'Bearer '+authState.accessToken,
		                    'Accept': 'application/json'
		                },
					}
				);
				swal.fire("Done!", "Category Updated!", "success");
	        } catch (error) {
	            swal.fire("Error", String(error), "error");
	        }
        } else {
	        try {
				let results = await axios.post('/api/categories', 
					{
						...newCategory,
						userId: appState.user.id	
					},
					{
		                headers: {
		                    'Authorization': 'Bearer '+authState.accessToken,
		                    'Accept': 'application/json'
		                },
					}
				);
				swal.fire("Done!", "Category Created!", "success");
	        } catch (error) {
	            swal.fire("Error", String(error), "error");
	        }
        }
        setUpdate(false);
        setDataLoading(false);
		handleClose();
        loadData();

	};

    const handleCategoryPostsClick = async (event, categoryId) => {
		event.preventDefault();

        setDataLoading(true);
		setSelectedCategoryPosts([]);

		let selectedCategory = categories.find(category => category.id === categoryId);

		setSelectedCategoryPosts(selectedCategory.posts);
    }

    const handleCategoryEdit = async (event, categoryId) => {
		event.preventDefault();


		let selectedCategory = categories.find(category => category.id === categoryId);

        setOpen(true);
        setUpdate(true);
        setNewCategory(selectedCategory);
    }

	let listOfCategories = '';
    if(categories && categories.length>0){
		listOfCategories = 
			<List style={{maxHeight:'675px', overflow:'scroll'}} aria-label="main mailbox folders">
				{categories.map(category => (
					<div key={`categoryBlock-${category.id}`}>
						<div>
							<ListItem
								key={`category-${category.id}`}
								button
								onClick={(event) => handleCategoryPostsClick(event, category.id)}
								style={{height:'75px'}}
							>
								<div>
									<u>
										<strong>
											{category.title}
										</strong>
									</u><br/>
									Description: {category.description}
								</div>
							</ListItem>
						</div>
						<div>
          					<Tooltip title="Edit Category" placement="top-start">
								<IconButton onClick={(event) => handleCategoryEdit(event, category.id)}>
									<EditIcon />
								</IconButton>
							</Tooltip>
						</div>
						<Divider />
					</div>
				))}
			</List>
	}

    let postsFromCategory = '';
    if (dataLoading === true) {
    	postsFromCategory = 
			<List >
				<div style={{verticalAlign: 'top', marginLeft:'3px',marginRight:'3px',marginTop:'50px',position:'relative' }} >
					<CircularProgress style={{margin:'auto', position: 'absolute', top:0,bottom:0,left:0,right:0, }} />
				</div>
			</List>;
    } else if(dataLoading === false && selectedCategoryPosts && selectedCategoryPosts.length>0){
        postsFromCategory =
			<List component="nav" style={{maxHeight:'675px', overflow:'scroll'}} aria-label="secondary mailbox folder">
				{selectedCategoryPosts.map(selectedCategoryPost => (
					<div key={`selectedCategoryPost-${selectedCategoryPost.id}`}>
							<Link
								to={`/post/show/${selectedCategoryPost.id}`}
								key={selectedCategoryPost.id}
							>
								<ListItem>
									<div>
                    					<h4>
											{selectedCategoryPost.title}
										</h4>
										<br/>
										<HTMLEllipsis
											unsafeHTML={selectedCategoryPost.content}
											maxLine='3'
											ellipsis='...'
											basedOn='letters'
										/>
									</div>
								</ListItem>
							</Link>
						<Divider />
					</div>
				))}
			</List>
    }

    return (
    	<Container maxWidth="lg">
	      	<Grid container spacing={3}>
		        <Grid item xs={12}>
					<div className='card-header'>
						All Categories
						<button style={{float:'right', marginTop:'-6px'}} type="button" onClick={handleOpen}>
							Create Category
						</button>
					</div>
		        </Grid>
		        <Grid item xs={6}>
					<div className='card-body'>
						{ listOfCategories }
					</div>
		        </Grid>
		        <Grid item xs={6}>
		        	{postsFromCategory}
		        </Grid>
	        </Grid>
	        <Grid item xs={12}>
	        	<NewCategoryModal open={open} update={update} newCategory={newCategory} handleFieldChange={handleFieldChange} handleSubmit={handleSubmit} handleClose={handleClose} />
	        </Grid>
	    </Container>
    );
}

export default CategoriesList;