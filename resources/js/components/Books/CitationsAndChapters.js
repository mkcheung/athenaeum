import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { 
    Container,
	Grid,
	List,
	ListItem,
	Divider,
	InputLabel,
	TextField
} from '@material-ui/core';
import swal from 'sweetalert2';
import { useAuth } from '../GlobalStates';
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths

const CitationsAndChapters = () => {

    const params = useParams();
    const { authState, setAuthState } = useAuth();
    const [ citations, setCitations ] = useState([]);
    const [ chapters, setChapters ] = useState([]);
    const [ title, setTitle ] = useState('');
    const [ author, setAuthor ] = useState('');

    const defaultFormFields = {
        bookId:null,
        chapterTitle:'',
        chapterPageBegin:'',
        chapterPageEnd:'',
        chapterNum:'',
    }
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {chapterTitle, chapterPageBegin, chapterPageEnd, chapterNum} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) =>{
        const {name, value} = event.target;

        setFormFields({...formFields, [name]:value});
    }

	useEffect(()=> {
        if (params.id !== null && params.id !== undefined) {
            loadData(params.id);
        }
	},[])

    const loadData = async (bookId) => {

        let selectedBook = await axios.get(`/api/books/${bookId}`, 
        {
        	headers: {
                'Authorization': 'Bearer '+authState.accessToken,
                'Accept': 'application/json'
            }
        });
        const bookData = selectedBook.data;
        const {citations, chapters, title, author_full_name} = bookData[0];
        setCitations(citations);
        setChapters(chapters);
        setTitle(title);
        setAuthor(author_full_name);
	}

	const handleChapterSubmit = async (e) => {
        e.preventDefault();
        let data = {
            book_id: params.id,
            page_begin: formFields.chapterPageBegin,
            page_end: formFields.chapterPageEnd,
            chapter_title: formFields.chapterTitle,
            chapter_number: formFields.chapterNum
        };

        try {
            const response = await axios.post('/api/chapters', { 
                    data 
                },
                {   
                    headers: {
                        'Authorization': 'Bearer ' + authState.accessToken,
                        'Accept': 'application/json'
                    },
                });

            swal.fire("Done!", "Chapter Added!", "success");
            loadData(params.id);
            resetFormFields();

        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }
	}


	const handleChapterClear = async (e) => {
        e.preventDefault();
        let data = {
            book_id: params.id,
        };
        try {
            axios.post(`/api/chapters/clearChapters/`, { 
                data 
            },
            {   
                headers: {
                    'Authorization': 'Bearer ' + authState.accessToken,
                    'Accept': 'application/json'
                }
            });

            swal.fire("Done!", "Chapters Cleared!", "success");
            setChapters([]);
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }
	}

    let listOfChapters = '';
    if(chapters){
        listOfChapters = chapters.map((chapter)=>{
            return <div>
                <div>
                    Chapter: {chapter.chapter_number}
                </div>
                <div>
                    Title: {chapter.chapter_title}
                </div>
                <div>
                    Begin Location: {chapter.page_begin}
                </div>
                <div>
                    End Location: {chapter.page_end}
                </div>
                <Divider />
            </div>
        })
    }

let listOfCitations = '';
    if(citations){
        listOfCitations = citations.map((citation)=>{
            return (
                    <div key={`selectedBookCitation-${citation.id}`}>
                        <div>
                            <u>
                                <strong>
                                    Chapter:{citation.chapter}
                                </strong>
                            </u>
                        </div>
                        <div>
                            <u>
                                <strong>
                                    Location:{citation.page}
                                </strong>
                            </u>
                        </div>
                        <ListItem>
                            "{citation.content}"
                        </ListItem>
                        <Divider />
                    </div>
            );
        })
    }
    return (
    	<Container maxWidth="lg">
            <Grid container spacing={3}>
                <form noValidate autoComplete="off" onSubmit={handleChapterSubmit}>

                    <Grid item xs={12}>
                        <InputLabel htmlFor="chapterTitle">Chapter Title:</InputLabel>
                        <TextField id="chapterTitle" aria-describedby="my-helper-text" name="chapterTitle" value={chapterTitle} onChange={handleChange} />
                    </Grid>

                    <Grid item xs={12}>
                        <InputLabel htmlFor="chapterNum">Chapter Number:</InputLabel>
                        <TextField id="chapterNum" aria-describedby="my-helper-text" name="chapterNum" value={chapterNum} onChange={handleChange} />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <InputLabel htmlFor="chapterPageBegin">Page - Begin:</InputLabel>
                        <TextField id="chapterPageBegin" aria-describedby="my-helper-text" name="chapterPageBegin" value={chapterPageBegin} onChange={handleChange} />
                    </Grid>
                    
                    <Grid item xs={12}>
                        <InputLabel htmlFor="chapterPageEnd">Page - End:</InputLabel>
                        <TextField id="chapterPageEnd" aria-describedby="my-helper-text" name="chapterPageEnd" value={chapterPageEnd} onChange={handleChange} />
                    </Grid>
                    <button>
                        Submit
                    </button>
                    <button onClick={handleChapterClear}>
                        Clear Chapters
                    </button>
                </form>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <List component="nav" className="bookCitationListItem" aria-label="secondary mailbox folder">
                        {listOfChapters}
                    </List>
                </Grid>
                <Grid item xs={6}>
                    <List component="nav" className="bookCitationListItem" aria-label="secondary mailbox folder">
                        {listOfCitations}
                    </List>
                </Grid>
            </Grid>
	    </Container>
	)
}
export default CitationsAndChapters;