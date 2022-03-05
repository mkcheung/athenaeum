import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import ImageUploader from "quill-image-uploader";
import { Link, useNavigate, useParams } from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BookCitationList  from './BookCitationList';
import BookChapterSelectionModal from '../Books/ChapterSelectionModal';
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
import { AuthContext } from '../GlobalStates';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import '../../../css/styles.css'; // Add css for snow theme

// Quill.register("modules/imageUploader", ImageUploader);

const NewPost = () => {

    const [ books, setBooks ] = useState([]);
    const [ chapters, setChapters ] = useState([]);
    const [ citations, setCitations ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ selectedTags, setSelectedTags ] = useState([]);
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
    const [ bookSelectionModalOpen, setBookSelectionModalOpen ] = useState(false);
    const [ loading, setLoading ] = useState(true);
    const [ user, setUser ] = useState({});
    const [ chapterSelectionModalOpen, setChapterSelectionModalOpen] = React.useState(false);
    const [ authState,setAuthState ] = useContext(AuthContext);


    const { quill, quillRef } = useQuill();
    const params = useParams();

    useEffect(async () => {

        const postId = (params.id) ? params.id : null;
        const parentPostId = (params.parentId) ? params.parentId : null;
        await loadData(postId, parentPostId);

    },[]);


    const loadData = async (postId = null, parentPostId = null) => {
        let tagOptions = [];
        try {

            let tagRes = await axios.get('/api/tags', 
                {
                    headers: {
                        'Authorization': 'Bearer '+authState.accessToken,
                        'Accept': 'application/json'
                    }
                });
            let tags = tagRes.data;
            
            tags.forEach(function(tag){
                let tagIdAndTitle = {};
                tagIdAndTitle['id'] = tag.id;
                tagIdAndTitle['title'] = tag.title;
                tagOptions.push(tagIdAndTitle);
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
                            'Authorization': 'Bearer '+authState.accessToken,
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
                    'Authorization': 'Bearer '+authState.accessToken,
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

    const handleTitleChange = (e) => {
        const inputTitle = e.target.value;
        setTitle(inputTitle);
    }

    const onTagsChange = (event, values) => {
        const newSetOfTags = values;
        setSelectedTags(newSetOfTags);
    }

    const handleDelete = (id) => {
        let remainingTags = selectedTags.filter(function( obj ) {
            return obj.id !== id;
        });
        setSelectedTags(remainingTags);
    };

    const handleChkboxToggle = async (event) => {
        const publishStatus = event.target.checked;
        setPublished(publishStatus);
    };

    const onChangeImage = (e) => {
        let files = e.target.files || e.dataTransfer.files;
        if (!files.length){
            return;
        }
        createImage(files[0]);
    }

    const createImage = (file) => {
        let reader = new FileReader();
        reader.onload = (e) => {
            const theImage = e.target.result;
            setImage(theImage);
        };
        reader.readAsDataURL(file);
    }

    const handleGetCitations = async (e) => {

        e.preventDefault();
        setLoading(true);


        const bookTitleParams ={
            bookTitle: bookTitleSearchTerm
        }

        const results = await axios.get('/api/books/searchByTitle', 
            bookTitleParams,
            {   
                headers: {
                    'Authorization': 'Bearer '+authState.accessToken,
                    'Accept': 'application/json'
                }
            }
        );

        let bookCitations = (res.data[0]) ? res.data[0].citations : [] ;
        let book_title = (res.data[0]) ? res.data[0].title : [] ;

        setLoading(false);
        setBookTitle(book_title)
        setCitations(bookCitations);
    }

    const handleOpenChapterSelectionModal = async () => {
        setBookSelectionModalOpen(true);
    };

    const handleClose = async () => {
        setBookSelectionModalOpen(false);
    };

    const handleClick = (e) => {
        e.preventDefault();

        let citationBlock = e.currentTarget;

        const citationText = '"' + citationBlock.getElementsByClassName("citationText")[0].innerText + '", <i>' + citationBlock.getElementsByClassName("title")[0].innerText + '</i>, ' + citationBlock.getElementsByClassName("page")[0].innerText;

        // must focus before calling getSelection
        this.quillRef.focus();
        var range = this.quillRef.getSelection();
        
        let position = range ? range.index : 0;
        this.quillRef.insertText(position, citationBlock.getElementsByClassName("page")[0].innerText );
        this.quillRef.insertText(position, citationBlock.getElementsByClassName("title")[0].innerText + ', ', {
            'italic': true
        });
        this.quillRef.insertText(position, '"' + citationBlock.getElementsByClassName("citationText")[0].innerText + '", ', {
            'italic': false
        });
    }

    const handleBookChapterSelect = async (event) => {
        let selectorName = event.target.name;
        let bookCitations = '';
        let chapters = [];
        let citations = [];

        if(event.target.value == 0){
            setBookTitle('');
            setBookSelectedId(null);
            setChapterSelectedId(null);
            setChapters([]);
            setCitations([]);
            return;
        }

        if(selectorName === 'book'){
            bookSelectedId = event.target.value;

            let selectedBook = books.find(book => book.id == bookSelectedId);
            if(selectedBook.chapters != null && selectedBook.chapters.length > 0){
                chapters = selectedBook.chapters;

                setBookTitle(selectedBook.title);
                setBookSelectedId(bookSelectedId);
                setChapters(chapters);
            } else {
                citations = selectedBook.citations;
                setBookTitle(selectedBook.title);
                setBookSelectedId(bookSelectedId);
                setChapterSelectedId(null);
                setChapters([]);
                setCitations(citations);
            }
        }


        if(selectorName === 'chapter'){
            let chapterSelectedId = event.target.value;
            let selectedBook = books.find(book => book.id == bookSelectedId);
            let bookCitations = selectedBook.citations;
            let citations = [];

            for (let key in bookCitations) {
                if (bookCitations[key].chapter == chapterSelectedId) {
                    citations.push(bookCitations[key]);
                }
            }
            setBookTitle(selectedBook.title);
            setChapterSelectedId(chapterSelectedId);
            setCitations(citations);
        }
    };

    const buttonTitle = (postId) ? 'Update' : 'Create';
    const headerTitle = (postId) ? 'Update' : 'Create New';
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className='card-header'>{headerTitle} Post</div>
                </Grid>
                <Grid item xs={12}>
                    <form>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="name">Title:</InputLabel>
                                        <TextField 
                                            id="title" 
                                            title='title' 
                                            onChange={handleTitleChange} 
                                            value={title}
                                            style={{ width:'100%' }}
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl 
                                        style={{ width:'100%' }}
                                    >
                                        <Autocomplete
                                            multiple
                                            id="selectedTags"
                                            value={selectedTags}
                                            options={tags}
                                            getOptionLabel={(option) => option.title}
                                            onChange={onTagsChange}
                                            renderTags={(tagValue, getTagProps) =>
                                                tagValue.map((option, index) => (
                                                    <Chip
                                                        label={option.title}
                                                        onDelete={() => handleDelete(option.id)}
                                                    />
                                                ))
                                            }
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    variant="standard"
                                                    label="Tags"
                                                    placeholder="Favorites"
                                                />
                                            )}
                                        />
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox
                                                checked={published}
                                                onChange={handleChkboxToggle}
                                                name="published"
                                                color="primary"
                                            />
                                        }
                                        label="Publish"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <h2>Insert Blog Header Image</h2>
                                    <input className="input_imagem_artigo" type="file" onChange={onChangeImage} />
                                    <div className="imgPreview">
                                        { 
                                            imagePreviewUrl ?  (<img className="add_imagem" Name="add_imagem" src={imagePreviewUrl} />) : ( 'Upload image' )
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid style={{'textAlign':'center', 'marginLeft':'-85px'}} item xs={12}>
                                        <div>
                                            <img style={{'width':'400px'}} src={'temp'} />
                                        </div>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container style={{height:'775px'}}>
                                <Grid item xs={4} style={{padding:'10px'}}>  
                                    <BookCitationList 
                                        book_title={bookTitle}
                                        book_title_search_term={bookTitleSearchTerm} 
                                        handleOpenChapterSelectionModal={handleOpenChapterSelectionModal}
                                        citations={citations}
                                        handleClick={handleClick}
                                    />
                                </Grid>
                                <div className="quillPanel">
                                    <div ref={quillRef} />
                                </div>
                            </Grid>
                        </Grid>
                        <Grid container>
                            <Grid item xs={12}>
                                <Button className="newPostButton" type="submit" variant="contained" color="primary" >
                                   {buttonTitle}
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>
                <Grid item xs={12}>
                    <BookChapterSelectionModal 
                        books={books}
                        chapters={chapters}
                        bookSelectionModalOpen={bookSelectionModalOpen} 
                        bookSelectedId={bookSelectedId}
                        chapterSelectedId={chapterSelectedId}
                        handleBookChapterSelect={handleBookChapterSelect}
                        handleClose={handleClose} 
                    />
                </Grid>
            </Grid>
        </Container>
    );
}
export default NewPost;

