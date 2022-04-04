import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Files from 'react-files'
import { 
	Button,
    Chip,
	Container,
	Grid,
	Paper,
	Switch,
	Tooltip,
    TextField,
} from '@material-ui/core';
import { 
	Delete as DeleteIcon,
	Edit as EditIcon,
	List as ListIcon,
	PlaylistAdd as PlaylistAddIcon
} from '@material-ui/icons';
import { 
	makeStyles
} from '@material-ui/core/styles';
import Autocomplete from '@material-ui/lab/Autocomplete';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { 
	ColorDeleteButton,
	ColorEditButton,
	IOSSwitch 
} from './../CustomComponents/CustomComponents';
import swal from 'sweetalert2';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { formatDate } from '../Helper/Helper';
import { useAuth } from '../GlobalStates';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths


const Dashboard = (props) => {

  	let location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    const [ dataLoading, setDataLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);
    const [ tagOptions, setTagOptions ] = useState([]);
    const [ selectedTags, selectTags ] = useState([]);
    const { authState, setAuthState } = useAuth();

    useEffect( () => {

        if (params.id !== null && params.id !== undefined) {
            loadData(null, params.id);
        } else {
            loadData(authState.user.id);
        }
    }, [dataLoading, location]);


    const loadData = async (userId=null, postId=null) => {

	    let postData = [];
        let tagOptions = [];

        try {
	    	if(postId !== null){
		        const postObj = await axios.get('/api/posts/getPostAndDecendants', 
		        {
		        	headers: {
		                'Authorization': 'Bearer '+authState.accessToken,
		                'Accept': 'application/json'
		            },
		            params: {
		                postId: postId
		            }
		        });
			    postData = postObj.data;
	    	} else {
		        const postObj = await axios.get('/api/posts/getUserPosts', 
		        {
		        	headers: {
		                'Authorization': 'Bearer '+authState.accessToken,
		                'Accept': 'application/json'
		            },
		            params: {
		                userId: userId
		            }
		        });
			    postData = postObj.data;
	    	}


            let tagOptions = [];

            let tagRes = await axios.get('/api/tags/showTags', 
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            let tags = tagRes.data;
            
            tags.forEach(function(tag){
                let tagItem = {};
                tagItem['id'] = tag.id;
                tagItem['value'] = tag.title;
                tagOptions.push(tagItem);
            });

	        setDataLoading(false);
            setTagOptions(tagOptions);
	        setPosts(postData);

        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
    }

    const handleTagSelection = async (event, values) => {
        selectTags(values);
    }

    const handleTagSubmit = async () => {

        let recentPostRes = await axios.get('/api/posts/getRecentPosts', 
        {
            headers: {
                'Accept': 'application/json'
            },
            params: {
                tags: selectedTags,
                user_id: authState.user.id
            }
        });

        let posts = recentPostRes.data;
        setPosts(posts);
    }

	const deleteBook = async (postId) => {

    	const userId = authState.user.id;

		swal.fire({
			title: "Are you sure?",
			text: "This will delete the blog post.",
			icon: "warning",
  			showCancelButton: true,
			confirmButtonText: 'Yes, please delete',
			cancelButtonText: 'Cancel',
			dangerMode: true,
		})
		.then(async willDelete => {
			try {
				if (willDelete) {
					await axios.delete(`/api/posts/${postId}`,
			        {   
			        	headers: {
			                'Authorization': 'Bearer '+authState.accessToken,
			                'Accept': 'application/json'
			            },
			        });

					swal.fire("Deleted!", "Post deleted!", "success");
					setDataLoading(true);
				}
	        } catch (error) {
	            swal.fire("Error", String(error), "error");
	        }
		});
	};

	const togglePublished = async (postId, published) => {

    	const userId = authState.user.id;
        
		let post = posts.find(post => post.id === postId);
		published = !published;
		published = published ? 1 : 0 ;

        post['published'] = published;

        let successMsg = post.published ? 'published.' : 'set to private.';

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
				setDataLoading(true);
	        } catch (error) {
	            swal.fire("Error", String(error), "error");
	        }
        } 
	}

    const loadPostDescendants = async (postId) => {
    	
        setDataLoading(true);
        navigate(`/dashboard/${postId}`);
	}

    const redirectToEdit = async (postId) => {

		navigate(`/post/edit/${postId}`);
	}

    const redirectToAddChapter = async (postId) => {
		navigate(`/post/create/chapter/${postId}`);
	}

    const showDescendantPosts = false;//props.match.params.id ? true : false;

    let postsOnDashboard = <div></div>;
    let showDescPosts = <div></div>;

	if(posts.length > 0){
        postsOnDashboard = 
        <div>
            {
                posts.length && posts.map(post => (
        		<div key={`post-${post.id}`}>
                    <h2>
						<Link
							to={`/post/show/${post.id}`}
							key={post.id}
							style={{ textDecoration: 'none', color:'black' }}
						>
							{post.title}
						</Link>
        			</h2>
					<HTMLEllipsis
						unsafeHTML={post.content}
						maxLine='3'
						ellipsis='...'
						basedOn='letters'
					/>
        			Author: {post.user.full_name}
    				<br/>
    				Posted: {formatDate(post.created_at)}
        			<div style={{float:'right', top:'-27px', position:'relative'}}>
							<IOSSwitch
								checked={post.published === 1 ? true : false}
								onChange={() => {
									togglePublished(post.id, post.published === 1);
								}}
								name="published"
								inputProps={{ 'aria-label': 'secondary checkbox' }}
							/>
						{
							(showDescendantPosts === false && post.descendant_post_id !== null )&& 

								<ColorEditButton style={{marginRight:'10px', height:'47px', top:'-1px'}} variant="contained" color="primary" onClick={()=>loadPostDescendants(post.id)}>
									<ListIcon style={{color:'white'}} />
								</ColorEditButton>
						}
						{
							(showDescendantPosts === false && post.descendant_post_id == null) &&
					            <Tooltip title="Add Chapter" placement="bottom">
					                <ColorEditButton style={{marginRight:'10px', height:'47px', top:'-1px'}} variant="contained" color="primary" onClick={()=>redirectToAddChapter(post.id)}>
					                    <PlaylistAddIcon style={{color:'white'}} />
					                </ColorEditButton>
					            </Tooltip>
						}
	  					<Tooltip title="Edit Post" placement="bottom">
							<ColorEditButton style={{marginRight:'10px', height:'47px', top:'-1px'}} variant="contained" color="primary" onClick={()=>redirectToEdit(post.id)}>
								<EditIcon style={{color:'white'}} />
							</ColorEditButton>
						</Tooltip>
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


	if (showDescendantPosts === true) {
		showDescPosts = <div className="container">
				<Tooltip title="Add Chapter" placement="bottom">
				<Button style={{height:'47px', top:'-1px', float:'right'}} variant="contained" color="primary" onClick={()=>redirectToAddChapter(props.match.params.id)}>
					<PlaylistAddIcon style={{color:'white'}} />
				</Button>
			</Tooltip>
		</div>
	}

	let postCategoryTagControls = '';
	if (authState.isSuperAdmin){

		postCategoryTagControls = 
	        <div className="tagContainer">
	        	<div className='chiefOpsControls'>
		            <Link className='link-secondary' to='/post/create'>
		                Create new post
		            </Link>
	        	</div>
	        	<div className='chiefOpsControls'>
		            <Link className='link-secondary' to='/category/create'>
		                Create new category
		            </Link>
	        	</div>
	        	<div className='chiefOpsControls'>
		            <Link className='link-secondary' to='/tag/create'>
		                Create new tag
		            </Link>
	        	</div>
	        </div> ;
	} else {
		let createPostControl = 
	            <Link className='link-secondary' to='/post/create'>
	                Create new post
	            </Link>;
	    let createCategoryControl = (authState.permissions && authState.permissions.includes('category-create')) ? <Link className='link-secondary' to='/category/create'>
	                Create new category
	            </Link> : '';
	    let createTagControl = (authState.permissions && authState.permissions.includes('tag-create')) ? 
	            <Link className='link-secondary' to='/tag/create'>
	                Create new tag
	            </Link> : '';

	    postCategoryTagControls =
	        <div className="tagContainer">
	        	{createPostControl}
	            <br/>
	        	{createCategoryControl}
	            <br/> 
	        	{createTagControl}
	        </div>;

	}

    return (
        <Grid container spacing={3}>
            <Grid item xs={1}>
            </Grid>
        	<Grid item xs={8}>
				{postsOnDashboard}
				{showDescPosts}
            </Grid>
            <Grid item xs={1}>
            	{postCategoryTagControls}
                <div className="tagContainer">
                    <Autocomplete
                        id='tags'
                        freeSolo
                        multiple
                        options={tagOptions}
                        getOptionLabel={(tagOption) => tagOption.value}
                        renderInput={(params) => 
                            <TextField 
                                {...params} 
                                label="Search Posts With Tags:"
                            />
                        }
                        onChange={handleTagSelection}
                    />
                </div>
                <Chip
                    label='Search'
                    onClick={() => handleTagSubmit()}
                />
            </Grid>
        </Grid>
    )
}
export default Dashboard;