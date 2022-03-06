import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import Files from 'react-files'
import { 
	Button,
	Container,
	Grid,
	Paper,
	Switch,
	Tooltip,
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
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { 
	ColorDeleteButton,
	ColorEditButton,
	IOSSwitch 
} from './../CustomComponents/CustomComponents';
import swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../GlobalStates';

const Dashboard = (props) => {

    const navigate = useNavigate();
    const params = useParams();
    const [ loading, setLoading ] = useState(true);
    const [ posts, setPosts ] = useState([]);
    const [ authState, setAuthState ] = useContext(AuthContext);

    useEffect( () => {

        if (params.id !== null && params.id !== undefined) {
            loadData(null, params.id);
        } else {
            loadData(authState.user.id);
        }
    }, [loading]);


    const loadData = async (userId=null, postId=null) => {

	    let postData = [];

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

	        setLoading(false);
	        setPosts(postData);

        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
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
					setLoading(true);
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
				setLoading(true);
	        } catch (error) {
	            swal.fire("Error", String(error), "error");
	        }
        } 
	}

    const loadPostDescendants = async (postId) => {
    	
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
		        				Posted: {post.created_at}
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
    return (

        <Container maxWidth="lg">
			<div className="container">
			{postsOnDashboard}
			</div>
			{showDescPosts}
        </Container>
    )
}
export default Dashboard;