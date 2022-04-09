import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'
import { useQuill } from 'react-quilljs';
import { 
    useNavigate,
    useParams 
} from 'react-router-dom';
import Autocomplete from '@material-ui/lab/Autocomplete';
import BookCitationList  from './BookCitationList';
import BookChapterSelectionModal from '../Books/ChapterSelectionModal';
import { 
    Button,
    Checkbox,
    Chip,
    Container,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    TextField,
} from '@material-ui/core';
import swal from 'sweetalert2';
import { useAuth } from '../GlobalStates';
import 'quill/dist/quill.snow.css'; // Add css for snow theme
import '../../../css/styles.css'; // TODO: apply absolute paths

const NewPost = () => {

    const [ books, setBooks ] = useState([]);
    const [ chapters, setChapters ] = useState([]);
    const [ citations, setCitations ] = useState([]);
    const [ tags, setTags ] = useState([]);
    const [ selectedTags, setSelectedTags ] = useState([]);
    const [ bookSelectedId, setBookSelectedId ] = useState(null);
    const [ chapterSelectedId, setChapterSelectedId ] = useState(null);
    const [ chapterSelectedTitle, setChapterSelectedTitle ] = useState(null);
    const [ parentPostId, setParentPostId ] = useState(null);
    const [ postId, setPostId ] = useState(null);
    const [ bookTitle, setBookTitle ] = useState(null);
    const [ bookTitleSearchTerm, setBookTitleSearchTerm ] = useState('');
    const [ content, setContent ] = useState('');
    const [ title, setTitle ] = useState('');
    const [ published, setPublished ] = useState(false);
    const [ image, setImage ] = useState('');
    const [ bookSelectionModalOpen, setBookSelectionModalOpen ] = useState(false);
    const [ dataLoading, setDataLoading ] = useState(true);
    const { authState, setAuthState } = useAuth();


    const { quill, quillRef } = useQuill();
    const params = useParams();
    const navigate = useNavigate();

    useEffect(async () => {
        const postId = (params.id) ? params.id : null;
        const parentPostId = (params.parentId) ? params.parentId : null;
        await loadData(postId, parentPostId);
    },[]);

    useEffect(() => {
        if (quill) {
            quill.setText(content);
        }
    }, [quill,content]);

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

            setDataLoading(false);
            setTags(tagOptions);
            setParentPostId(parentPostId);

            if(postId !== null){
                let postObj = await axios.get('/api/posts/show/'+postId, 
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
                    userId: authState.user.id
                }
            });

            const books = userBooks.data;
            setBooks(books);

        } catch (error) {
            swal.fire('Done!', String(error), 'error');
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
        setDataLoading(true);

        const bookTitleParams ={
            bookTitle: bookTitleSearchTerm
        }

        try {
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
            setDataLoading(false);
            setBookTitle(book_title)
            setCitations(bookCitations);
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }
    }

    const handleOpenChapterSelectionModal = async () => {
        setBookSelectionModalOpen(true);
    };

    const handleClose = async () => {
        setBookSelectionModalOpen(false);
    };

    const handleCitationInsertion = (e) => {
        e.preventDefault();

        let citationBlock = e.currentTarget;

        const citationText = '"' + citationBlock.getElementsByClassName("citationText")[0].innerText + '", <i>' + citationBlock.getElementsByClassName("title")[0].innerText + '</i>, ' + citationBlock.getElementsByClassName("page")[0].innerText;

        // must focus before calling getSelection
        quill.focus();
        let range = quill.getSelection();
        
        let position = range ? range.index : 0;
        quill.insertText(position, citationBlock.getElementsByClassName("page")[0].innerText );
        quill.insertText(position, citationBlock.getElementsByClassName("title")[0].innerText + ', ', {
            'italic': true
        });
        quill.insertText(position, '"' + citationBlock.getElementsByClassName("citationText")[0].innerText + '", ', {
            'italic': false
        });
    }

    const handleBookChapterSelect = async (event) => {
        let selectorName = event.target.name;
        let bookCitations = '';

        if(event.target.value == 0){
            setBookTitle('');
            setBookSelectedId(null);
            setChapterSelectedId(null);
            setChapters([]);
            setCitations([]);
            return;
        }

        if(selectorName === 'book'){
            let selectedBookId = event.target.value;

            let selectedBook = books.find(book => book.id == selectedBookId);
            if(selectedBook.chapters != null && selectedBook.chapters.length > 0){
                const chapters = selectedBook.chapters;

                setBookTitle(selectedBook.title);
                setBookSelectedId(selectedBookId);
                setChapterSelectedId(null);
                setChapterSelectedTitle(null);
                setChapters(chapters);
            } else {
                const citationsFromBook = selectedBook.citations;
                setBookTitle(selectedBook.title);
                setBookSelectedId(selectedBookId);
                setChapterSelectedId(null);
                setChapterSelectedTitle(null);
                setChapters([]);
                setCitations(citationsFromBook);
            }
        }


        if(selectorName === 'chapter'){
            let chapterSelectedId = event.target.value;
            let selectedBook = books.find(book => book.id == bookSelectedId);
            let bookCitations = selectedBook.citations;
            let citationsFromChapter = [];

            let selChapter = chapters.find((chapter)=>{
                return chapter.chapter_number == chapterSelectedId
            });
            for (let key in bookCitations) {
                if (bookCitations[key].chapter == chapterSelectedId) {
                    citationsFromChapter.push(bookCitations[key]);
                }
            }
            setBookTitle(selectedBook.title);
            setChapterSelectedTitle(selChapter.chapter_title);
            setChapterSelectedId(chapterSelectedId);
            setCitations(citationsFromChapter);
        }
    };

    const handleCreateUpdatePost = async (event) => {
        event.preventDefault();
        
        const incomingContentFromQuill = quill.getText();
        const post = {
            id: postId ? postId : null,
            title: title,
            published: published,
            content: incomingContentFromQuill,
            selectedTags: selectedTags,
            user_id: authState.user.id,
            parentPostId,
            image
        };

        try {

            if (postId){
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

                swal.fire("Done!", "Post Updated.", "success");
            } else {

                let results = await axios.post('/api/posts/',
                    post,
                    {   
                        headers: {
                            'Authorization': 'Bearer '+authState.accessToken,
                            'Accept': 'application/json'
                        }
                    }
                );
                swal.fire("Done!", "Post Created.", "success");
                setPostId(results.data.data.id);
                navigate(`/post/edit/${results.data.data.id}`);
            }
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }
    }


    const buttonTitle = (postId) ? 'Update' : 'Create';
    const headerTitle = (postId) ? 'Update' : 'Create New';
    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className='card-header'>{headerTitle} Post</div>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleCreateUpdatePost}>
                        <Grid container>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <InputLabel htmlFor="name">Title:</InputLabel>
                                        <TextField 
                                            id="title" 
                                            title='title' 
                                            onChange={handleTitleChange} 
                                            value={title}
                                            className='newPostInputs'
                                        />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl 
                                        className='newPostInputs'
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
                                </Grid><br/>
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
                                </Grid><br/>
                                <Grid container className="newPostImageContainer">
                                    <Grid item xs={6}>
                                        <h4>Insert Blog Header Image</h4>
                                        <input className="input_imagem_artigo" type="file" onChange={onChangeImage} />
                                    </Grid>
                                    <Grid item xs={6} className="newPostImgContRtPane">
                                        <Grid className='newPostImgContRtPaneContent' item xs={12}>
                                            <div>
                                                <img className='newPostImgContRtPaneImg' src={image} />
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                            <Grid container className="newPostBookCitationContainer">
                                <Grid item xs={4} className="newPostBookCitationContent">  
                                    <BookCitationList 
                                        book_title={bookTitle}
                                        chapter_title={chapterSelectedTitle}
                                        book_title_search_term={bookTitleSearchTerm} 
                                        handleGetCitations={handleGetCitations}
                                        handleOpenChapterSelectionModal={handleOpenChapterSelectionModal}
                                        citations={citations}
                                        handleCitationInsertion={handleCitationInsertion}
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
                        chapterSelectionModalOpen={bookSelectionModalOpen} 
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

