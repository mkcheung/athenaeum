import axios from 'axios'
import React, { Component, useState, useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import ImageUploader from "quill-image-uploader";
import Swal from 'sweetalert2';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
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
    PlaylistAdd as PlaylistAddIcon
} from '@material-ui/icons';
import 'quill/dist/quill.snow.css'; // Add css for snow theme

// Quill.register("modules/imageUploader", ImageUploader);

const NewPost = () => {

    const [ books, setBooks ] = useState([]);
    const [ chapters, setChapters ] = useState([]);
    const [ citations, setCitations ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ selectedtags, setSelectedTags ] = useState([]);
    const [ errors, setErrors ] = useState([]);
    const [ bookSelectedId, setBookSelectedId ] = useState(null);
    const [ chapterSelectedId, setChapterSelectedId ] = useState(null);
    const [ parentPostId, setParentPostId ] = useState(null);
    const [ postId, setPostId ] = useState(null);
    const [ bookSelectedModalOpen, setbookSelectedModalOpen ] = useState(false);
    const [ bookTitle, setBookTitle ] = useState('');
    const [ bookTitleSearchTerm, setBookTitleSearchTerm ] = useState('');
    const [ content, setContent ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ slug, setSlug ] = useState('');
    const [ published, setPublished ] = useState(false);
    const [ open, setOpen ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ imagePreviewUrl, setImagePreviewUrl ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState({});

    const { quill, quillRef } = useQuill();
    const params = useParams();

    useEffect(async () => {

        let state = localStorage["appState"];
        let appState = JSON.parse(state);
        setUser(appState.user)

        const postId = (params.id) ? params.id : null;
        const parentPostId = (params.parentId) ? params.parentId : null;
        await loadData(postId, parentPostId);

    },[]);


    const loadData = async (postId = null, parentPostId=null) => {
        let tagOptions = [];
        try {

            let tagRes = await axios.get('/api/tags', 
                {
                    headers: {
                        'Authorization': 'Bearer '+user.accessToken,
                        'Accept': 'application/json'
                    }
                });
            let tags = tagRes.data;
            
            tags.forEach(function(tag){
                let temp = {};
                temp['id'] = tag.id;
                temp['title'] = tag.title;
                tagOptions.push(temp);
            });

            let newState = {
                loading:false,
                tags: tagOptions,
                user_id:user.id,
                parentPostId:parentPostId
            };

            if(postId !== null){
                let postObj = await axios.get('/api/posts/'+postId, 
                    {
                        headers: {
                            'Authorization': 'Bearer '+user.accessToken,
                            'Accept': 'application/json'
                        }
                    }
                );

                let postData = postObj.data;
                setTitle(postData['title']);
                setContent(postData['content']);
                setPostId(postData['id']);
                setImage(postData['image']);
                setSelectedTags(postData['tags']);
                setPublished(postData['published'] ? true : false);

            }

            let userBooks = await axios.get('/api/books/showUserBooks', 
            {
                headers: {
                    'Authorization': 'Bearer '+user.accessToken,
                    'Accept': 'application/json'
                },
                params: {
                    userId: user.id
                }
            });

            const books = userBooks.data;
            setBooks(books);

        } catch (error) {
            console.log(error);
        }
    };



    const buttonTitle = (postId) ? 'Update' : 'Create';
    const headerTitle = (postId) ? 'Update' : 'Create New';
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className='card-header'>DummyPost</div>
                </Grid>
                <Grid item xs={12}>
                    <form>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="name">Title:</InputLabel>
                                </Grid>
                            </Grid>
                        </Grid>
                        <div style={{height:'725px', maxHeight:'725px', overflow:'scroll'}}>
                            <div ref={quillRef} />
                        </div>
                        <Grid container>
                            <Grid item xs={12}>
                                <Button style={{float:'right'}} type="submit" variant="contained" color="primary" >
                                   {buttonTitle}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>
                </Grid>
            </Grid>
        </Container>
    );
}
export default NewPost;

