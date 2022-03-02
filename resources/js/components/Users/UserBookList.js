import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import Header from './../Header';
import Footer from './../Footer';
import BookUploadModal from './../Books/BookUploadModal';
import AddChapterModal from './../Books/AddChapterModal';
import ChapterSelectionModal from './../Books/ChapterSelectionModal';
import CitationModal from './../Books/CitationModal';
import { Link, Redirect } from 'react-router-dom';
import { withRouter } from "react-router";

import {unstable_batchedUpdates} from 'react-dom';
import { 
	Button,
	CircularProgress,
	Collapse,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Paper,
	TextareaAutosize,
	Tooltip,
} from '@material-ui/core';
import { 
	AddComment as AddCommentIcon,  
	AddToQueue as AddToQueueIcon,
	Bookmarks as BookmarksIcon,
	CloudUpload as CloudUploadIcon,
	Delete as DeleteIcon,
	ExpandLess,
	ExpandMore,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';
import { AuthContext } from '../GlobalStates';

const UserBookList = () => {

    const [ loading, setLoading ] = useState(true);
    const [ addBookOnly, setAddBookOnly ] = useState(false);
    const [ modalLoading, setModalLoading ] = useState(false);
    const [ deleteInProgress, setDeleteInProgress ] = useState(false);
    const [ books, setBooks ] = useState([]);
    const [ content, setContent ] = useState('');
    const [ chapters, setChapters ] = useState([]);
    const [ user, setUser ] = useState({});
    const [ selectedBookCitations, setSelectedBookCitations ] = useState([]);
    const [ selectedBookId, setSelectedBookId ] = useState(null);
    const [ selectedChapter, setSelectedChapter ] = useState(null);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ citationPage, setCitationPage ] = useState(null);
    const [ author_first_name, setAuthorFirstName ] = useState('');
    const [ author_middle, setAuthorMiddleName ] = useState('');
    const [ author_last_name, setAuthorLastName ] = useState('');
    const [ bookIdForChInput, setBookIdForChInput ] = useState(null);
    const [ bookTitleForChInput, setBookTitleForChInput ] = useState('');
    const [ chapterModalOpen, setChapterModalOpen ] = useState(false);
    const [ citationModalOpen, setCitationModalOpen ] = useState(false);
    const [ chapterSelectionModalOpen, setChapterSelectionModalOpen] = useState(false);
    const [ chapterNum, setChapterNum ] = useState(null);
    const [ chapterTitle, setChapterTitle ] = useState('');
    const [ chapterPageBegin, setChapterPageBegin ] = useState(null);
    const [ chapterPageEnd, setChapterPageEnd ] = useState(null);
    const [ errors, setErrors ] = useState('');

    const [authState,setAuthState] = useContext(AuthContext);
	useEffect(()=> {
	    loadData();
	},[])


	useEffect(()=> {
	    loadData();
	},[selectedBookCitations, loading, modalLoading])


	const handleOpen = async () => {
		setModalOpen(!modalOpen);
	};

	const handleOpenChapterInput = async (bookId) => {
		const { 
			books
		} = this.state;
		let selectedBook = books.find(book => book.id === bookId);

		this.setState({ 
			bookTitleForChInput: selectedBook['title'],
			bookIdForChInput: selectedBook['id'],
			chapterModalOpen:true, 
		});
	};

	const handleOpenAddCitationInput = async (bookId) => {
		const { 
			books
		} = this.state;
		let selectedBook = books.find(book => book.id === bookId);

		this.setState({ 
			bookTitleForChInput: selectedBook['title'],
			bookIdForChInput: selectedBook['id'],
			citationModalOpen: true, 
			chapters: selectedBook.chapters ? selectedBook.chapters : [],
			bookIdForChInput: bookId
		});
	};

	const handleOpenChapterSelectionModal = async (bookId, chapters) => {

        unstable_batchedUpdates(() => {
        	setChapters(chapters);
	        setChapterSelectionModalOpen(true);
	        setSelectedBookId(bookId);
     	});
	};

	const assignChapters = async (bookId) => {


		axios.post('/api/citations/assignChapters', { 
        	bookId 
        },
        {   
        	headers: {
                'Authorization': 'Bearer ' + authState.accessToken,
                'Accept': 'application/json'
            },
        })
		.then(response => {
			swal("Done!", "Citation Chapters Assigned!", "success");
			this.loadData();
		})
		.catch(error => {
			setErrors(error.response.data.errors);
		});
	};

	const deleteBook = async (bookId) => {


		swal({
			title: "Are you sure?",
			text: "This will delete the book as well as all citations and chapters.",
			icon: "warning",
			dangerMode: true,
		})
		.then(willDelete => {

			const { 
				token
			} = this.state;

			this.setState({
				deleteInProgress:true
			});

			if (willDelete) {
				axios.delete(`/api/books/${bookId}`,
		        {   
		        	headers: {
		                'Authorization': 'Bearer ' + authState.accessToken,
		                'Accept': 'application/json'
		            },
		        })
				.then(response => {
					swal("Deleted!", "Book has been deleted!", "success");
					this.loadData();
				})
				.catch(error => {
					this.setState({
				    	errors: error.response.data.errors
					});
				});
			}
		});
	};

	const handleClose = async () => {
		setModalOpen(false);
		setChapterModalOpen(false);
		setCitationModalOpen(false);
		setChapterSelectionModalOpen(false);
	};

    const onFilesChange = (files) => {
        console.log(files);
    }

    const onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

	const handleChapterSubmit = async () => {
        const { 
        	bookIdForChInput,
        	chapterPageBegin,
        	chapterPageEnd,
        	chapterTitle,
        	chapterNum,
        	token
        } = this.state;

        let data = {
        	bookIdForChInput,
        	chapterPageBegin,
        	chapterPageEnd,
        	chapterTitle,
        	chapterNum
        }

		axios.post('/api/chapters', { 
        	data 
        },
        {   
        	headers: {
                'Authorization': 'Bearer ' + authState.accessToken,
                'Accept': 'application/json'
            },
        })
        .then(response => {
			swal("Done!", "Chapter Added!", "success");
            this.setState({
			    bookIdForChInput: null,
			    chapterPageBegin: null,
			    chapterPageEnd: null,
			    chapterTitle: '',
            	chapterNum: null

            });
			handleClose();
		})
		.catch(error => {
			setErrors(error.response.data.errors);
		});
	}

	const handleCitationSubmit = async () => {
        const { 
		    bookTitleForChInput,
		    bookIdForChInput,
		    selectedChapter,
		    citationPage,
		    content,
        	token
        } = this.state;

        let data = {
        	book_id: bookIdForChInput,
        	content: content,
		    chapter: selectedChapter ? selectedChapter : null,
		    page: citationPage,
        }

		axios.post('/api/citations', { 
        	data 
        },
        {   
        	headers: {
                'Authorization': 'Bearer ' + authState.accessToken,
                'Accept': 'application/json'
            },
        })
        .then(async response => {
			swal("Done!", "Citation Added!", "success");
            this.setState({
			    bookTitleForChInput: '',
			    bookIdForChInput: null,
			    selectedChapter: null,
			    citationPage: null,
			    content: '',
            	chapterNum: null

            });
        	await this.loadData();
			handleClose();
		})
		.catch(error => {
			setErrors(error.response.data.errors);
		});
	}

	const handleFieldChange = async (event) => {

		setState({
			...state,
            [event.target.id]: event.target.value,
		});
	}

    const handleBookListClick = async (event, bookId) => {
		event.preventDefault();

        await this.setState({
            loading: true,
            selectedBookCitations: []
        });

		let { 
			books
		} = this.state;

		let selectedBook = books.find(book => book.id === bookId);

        await this.setState({
            selectedBookCitations: selectedBook.citations
        });
    }

    const handleChapterSelect = async (event) => {

		let { 
			books,
			selectedBookId
		} = this.state;

		let selectedChapterId = event.target.value;
		let bookCitations = '';
		let citations = [];
	    for (let key in books) {
	        if (books[key].id == selectedBookId && books[key].chapters) {
	            bookCitations = books[key].citations;
	            break;
	        }
	    }
	    for (let key in bookCitations) {

	        if (bookCitations[key].chapter == selectedChapterId) {
	            citations.push(bookCitations[key]);
	        }
	    }

        this.setState({
			selectedChapter:selectedChapterId,
			selectedBookCitations: citations,
			chapterSelectionModalOpen: false
        });
    };


    const loadData = async () => {

    	console.log('loading user books', authState.user.id);
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
        unstable_batchedUpdates(() => {
	        setLoading(false);
	        setDeleteInProgress(false);
	        setBooks(books);
     	});
        return books;
	}

	let listOfBooks = '';

    if(books && books.length>0){
		listOfBooks = 
			<List component="nav" style={{maxHeight:'675px', overflow:'scroll'}} aria-label="main mailbox folders">
				{books.map(book => (

					<div key={`citationSource-${book.id}`}>
						<div>
							<ListItem
								key={`book-${book.id}`}
								button
								onClick={(event) => handleBookListClick(event, book.id)}
								style={{height:'75px'}}
							>
								<div>
									<u>
										<strong>
											{book.title}
										</strong>
									</u><br/>
									By: {book.author_full_name}
								</div>
							</ListItem>
						</div>
						<div>
          					<Tooltip title="Add Citation" placement="top-start">
								<IconButton onClick={()=>handleOpenAddCitationInput(book.id)}>
									<AddCommentIcon />
								</IconButton>
							</Tooltip>
          					<Tooltip title="Add Chapter" placement="top-start">
								<IconButton onClick={()=>handleOpenChapterInput(book.id)}>
									<AddToQueueIcon />
								</IconButton>
							</Tooltip>
          					<Tooltip title="Process Citations with Chapters" placement="top-start">
								<IconButton onClick={()=>assignChapters(book.id)}>
									<BookmarksIcon />
								</IconButton>
							</Tooltip>
          					<Tooltip title="Delete Book" placement="top-start">
								<IconButton onClick={()=>deleteBook(book.id)}>
									<DeleteIcon />
								</IconButton>
							</Tooltip>
							{ (book.chapters.length > 0) ? <Button variant="outlined" onClick={()=> handleOpenChapterSelectionModal(book.id, book.chapters)} >Chapters</Button> : '' }
						</div>
						<Divider />
					</div>
				))}
			</List>
		}

        let citationsFromBook = '';
        if (loading === true) {
        	citationsFromBook = 
				<List >
					<div style={{verticalAlign: 'top', marginLeft:'3px',marginRight:'3px',marginTop:'50px',position:'relative' }} >
						<CircularProgress style={{margin:'auto', position: 'absolute', top:0,bottom:0,left:0,right:0, }} />
					</div>
				</List>;
        } else if(loading === false && selectedBookCitations && selectedBookCitations.length>0){
	        citationsFromBook =
				<List component="nav" style={{maxHeight:'675px', overflow:'scroll'}} aria-label="secondary mailbox folder">
					{selectedBookCitations.map(selectedBookCitation => (
						<div key={`selectedBookCitation-${selectedBookCitation.id}`}>
							<div>
								<u>
									<strong>
										Page:{selectedBookCitation.page}
									</strong>
								</u>
							</div>
							<ListItem>
								"{selectedBookCitation.content}"
							</ListItem>
							<Divider />
						</div>
					))}
				</List>
        }

        let generalBookCitationDisplay = '';
        if(deleteInProgress === true){
			generalBookCitationDisplay = 
        		<Grid container spacing={3}>
			        <Grid item xs={12}>
			        	<CircularProgress style={{margin:'auto', position: 'absolute', top:0,bottom:0,left:0,right:0, }} />
			        </Grid>
		        </Grid>;
        } else {
        	generalBookCitationDisplay = 
        		<Grid container spacing={3}>
			        <Grid item xs={12}>
						<div className='card-header'>
							Books
							<Button style={{float:'right', marginTop:'-6px'}} startIcon={<CloudUploadIcon />} onClick={handleOpen}>
								Upload Citations
							</Button>
						</div>
			        </Grid>
			        <Grid item xs={6}>
			        	{listOfBooks}
			        </Grid>
			        <Grid item xs={6}>
			        	{citationsFromBook}
			        </Grid>
			        <Grid item xs={12}>
		        		<BookUploadModal 
		        			modalOpen={modalOpen} 
		        			handleClose={handleClose} 
		        			onFilesChange={onFilesChange} 
		        			onFilesError={onFilesError} 
		        			handleOpen={handleOpen}
		        			modalLoading={modalLoading} 
		        			setErrors={setErrors}
		        		/>
			        </Grid>
			        <Grid item xs={12}>
		        		<AddChapterModal 
		        			bookTitleForChInput={bookTitleForChInput} 
		        			bookIdForChInput={bookIdForChInput} 
		        			handleFieldChange={handleFieldChange} 
		        			chapterModalOpen={chapterModalOpen} 
		        			chapterNum={chapterNum}
		        			chapterPageBegin={chapterPageBegin}
		        			chapterPageEnd={chapterPageEnd} 
		        			chapterTitle={chapterTitle} 
		        			handleChapterSubmit={handleChapterSubmit} 
		        			handleClose={handleClose} 
		        		/>
			        </Grid>
			        <Grid item xs={12}>
		        		<ChapterSelectionModal 
		        			chapters={chapters}
		        			chapterSelectionModalOpen={chapterSelectionModalOpen} 
		        			selectedChapter={selectedChapter}
		        			handleChapterSelect={handleChapterSelect}
		        			handleClose={handleClose} 
		        		/>
			        </Grid>
			        <Grid item xs={12}>
		        		<CitationModal 
		        			chapters={chapters}
		        			bookTitleForChInput={bookTitleForChInput}
		        			citationModalOpen={citationModalOpen} 
		        			content={content}
		        			citationPage={citationPage}
		        			bookIdForChInput={bookIdForChInput}
		        			handleClose={handleClose} 
		        			handleFieldChange={handleFieldChange} 
		        			handleCitationSubmit={handleCitationSubmit}
		        		/>
			        </Grid>
		        </Grid>;
        }

    return (
    	<Container maxWidth="lg">
			{generalBookCitationDisplay}
	    </Container>
	)
}
export default UserBookList;