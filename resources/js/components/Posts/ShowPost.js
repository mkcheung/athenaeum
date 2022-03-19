import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import ImageUploader from "quill-image-uploader";
import swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BookCitationList  from './BookCitationList';
import CommentBox  from '../Comments/CommentBox';
import CommentList  from '../Comments/CommentList';
import { 
    Box,
    Button,
    Checkbox,
    Chip,
    CircularProgress,
    Container,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Input,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from '@material-ui/core';
import { useAuth } from '../GlobalStates';


const ShowPost = () => {

    const [ loading, setLoading ] = useState(true);
    const [ postId, setPostId ] = useState(null);
    const [ content, setContent ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ image, setImage ] = useState('');
    const [ open, setOpen ] = useState(false);
    const [ showCommentBox, setShowCommentBox ] = useState(false);
    const [ comments, setComments ] = useState([]);
    const [ authState,setAuthState ] = useAuth();
    const params = useParams();

    useEffect( async () => {
        const postId = (params.id) ? params.id : null;
        await loadData(postId);
    }, []);

    useEffect( async () => {
        const postId = (params.id) ? params.id : null;
        if (loading === true) {
            await loadData(postId);
        }
    });
  

    const loadData = async (postId = null) => {
        try {
            if(postId !== null){

                const postObj = await axios.get(`/api/posts/show/${postId}`, 
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                const postData = postObj.data;
                setTitle(postData['title']);
                setContent(postData['content']);
                setPostId(postData['id']);
                setImage(postData['image']);
                setComments(postData['comments']);
                setLoading(false);

            }
        } catch (error) {
            swal.fire("Error", String(error), "error");
        }
    };

    const handleCommentBoxAppear = async () => {

        const newShowCommentBoxStatus = !showCommentBox;
        setShowCommentBox(newShowCommentBoxStatus);
    };

    const handleCommentSubmit = async (commentText) => {

        const comment = {
            post_id:postId,
            commentText: commentText,
            user_id: authState.user.id,
        };

        let results = await axios.post('/api/comments/',
            comment,
            {   
                headers: {
                    'Authorization': 'Bearer '+authState.user.accessToken,
                    'Accept': 'application/json'
                }
            }
        );
        const loadedComments = results.data;
        const newShowCommentBoxStatus = !showCommentBox;
        setComments(loadedComments);
        setLoading(true);
        setShowCommentBox(newShowCommentBoxStatus);
    };

    const buttonTitle = (postId) ? 'Update' : 'Create';

    let commBox = <div></div>;

    if (showCommentBox) {
      commBox = <div>
                    <CommentBox handleCommentSubmit={handleCommentSubmit} handleCommentBoxAppear={handleCommentBoxAppear} />
                </div>
    } else {
      commBox =  (Object.keys(authState.user).length > 0) && <Button style={{float:'right'}} type="submit" variant="contained" color="primary"  onClick={handleCommentBoxAppear}>
                    Comment
                 </Button>
    }

    let listOfComments = '';

    if(comments && comments.length>0){
        listOfComments = <CommentList comments={comments}/>
    }

    let showPostDisplay = '';
    if (loading === true) {
        showPostDisplay = 
            <div style={{verticalAlign: 'top', marginLeft:'3px',marginRight:'3px',marginTop:'450px',position:'relative' }} >
                <CircularProgress style={{margin:'auto', position: 'absolute', top:0,bottom:0,left:0,right:0, }} />
            </div>
    } else {
        showPostDisplay = 
            <div>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        
                    </Grid>
                    <Grid item xs={12}>
                        <Box component="span" display="block" p={1} m={1} bgcolor="background.paper" >

                            <h4>
                                <div style={{textAlign:'center'}}>
                                    <u>
                                        {title}
                                    </u><br/>
                                    <img style={{'width':'600px'}}src={image} />
                                </div>
                            </h4>
                            <div dangerouslySetInnerHTML={{__html: content}}>
                            </div>
                        </Box>
                    </Grid>
                </Grid>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {commBox}
                    </Grid>
                </Grid>
                {listOfComments}
            </div>
    }

    return (
        <Container maxWidth="lg">
            {showPostDisplay}
        </Container>
    );
}

export default ShowPost;

