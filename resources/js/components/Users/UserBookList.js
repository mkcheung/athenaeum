import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import BookUploadModal from './../Books/BookUploadModal';
import ChapterSelectionModal from './../Books/ChapterSelectionModal';
import CitationModal from './../Books/CitationModal';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths

import {unstable_batchedUpdates} from 'react-dom';
import { 
	Button,
	CircularProgress,
	Container,
	Divider,
	Grid,
	IconButton,
	List,
	ListItem,
	Tooltip,
} from '@material-ui/core';
import { 
	AddComment as AddCommentIcon,  
	AddToQueue as AddToQueueIcon,
	Bookmarks as BookmarksIcon,
	CloudUpload as CloudUploadIcon,
	Delete as DeleteIcon,
} from '@material-ui/icons';
import { useAuth } from '../GlobalStates';

const UserBookList = () => {

    const [ dataLoading, setDataLoading ] = useState(true);
    const [ modalLoading, setModalLoading ] = useState(false);
    const [ deleteInProgress, setDeleteInProgress ] = useState(false);
    const [ books, setBooks ] = useState([]);
    const [ chapters, setChapters ] = useState([]);
    const [ selectedBookCitations, setSelectedBookCitations ] = useState([]);
    const [ selectedBookId, setSelectedBookId ] = useState(null);
    const [ selectedBook, setSelectedBook ] = useState(null);
    const [ selectedChapterId, setSelectedChapterId ] = useState(null);
    const [ selectedChapter, setSelectedChapter ] = useState(null);
    const [ modalOpen, setModalOpen ] = useState(false);
    const [ bookIdForChInput, setBookIdForChInput ] = useState(null);
    const [ bookTitleForChInput, setBookTitleForChInput ] = useState('');
    const [ citationModalOpen, setCitationModalOpen ] = useState(false);
    const [ chapterSelectionModalOpen, setChapterSelectionModalOpen] = useState(false);
    const [ errors, setErrors ] = useState('');

    const { authState, setAuthState } = useAuth();
    const navigate = useNavigate();
	
	useEffect(()=> {
	    loadData();
	},[])


	useEffect(()=> {
	    loadData();
	},[selectedBookCitations, dataLoading, modalLoading])


	const handleOpen = async () => {
		setModalOpen(!modalOpen);
	};

	const handleOpenAddCitationInput = async (bookId) => {

		let selectedBook = books.find(book => book.id === bookId);
		let chaptersSpecificToBook = selectedBook.chapters ? selectedBook.chapters : [];
		setBookIdForChInput(selectedBook['id']);
		setBookTitleForChInput(selectedBook['title']);
		setCitationModalOpen(true);
		setChapters(chaptersSpecificToBook);
		setBookIdForChInput(bookId);
	};

	const handleOpenChapterSelectionModal = async (bookId, chapters) => {

        unstable_batchedUpdates(() => {
        	setChapters(chapters);
	        setChapterSelectionModalOpen(true);
	        setSelectedBookId(bookId);
     	});
	};

	const deleteBook = async (bookId) => {
		swal.fire({
			title: "Are you sure?",
			text: "This will delete the book as well as all citations and chapters.",
			icon: "warning",
  			showCancelButton: true,
			confirmButtonText: 'Yes, please delete',
			cancelButtonText: 'Cancel',
			dangerMode: true,
		})
		.then(async willDelete => {

	        setDeleteInProgress(true);

			try {
				if (willDelete) {
					axios.delete(`/api/books/${bookId}`,
			        {   
			        	headers: {
			                'Authorization': 'Bearer ' + authState.accessToken,
			                'Accept': 'application/json'
			            },
			        });

					swal.fire("Deleted!", "Post deleted!", "success");
	        		setDeleteInProgress(false);
	        		loadData();
				}
	        } catch (error) {
	            swal.fire("Error", String(error), "error");
	        }
		});
	};

	const handleClose = async () => {
		setModalOpen(false);
		setCitationModalOpen(false);
		setChapterSelectionModalOpen(false);
	};

    const onFilesChange = (files) => {
        console.log(files);
    }

    const onFilesError = (error, file) => {
        console.log('error code ' + error.code + ': ' + error.message)
    }

	const handleFieldChange = async (event) => {

		setState({
			...state,
            [event.target.id]: event.target.value,
		});
	}

    const handleBookListClick = async (event, bookId) => {
		event.preventDefault();
		let theSelectedBook;
		theSelectedBook = books.find((book)=> {
			return book.id == bookId;
		});

		setSelectedBookId(bookId);
		setSelectedBook(theSelectedBook);
		setSelectedChapterId(null);
		setSelectedChapter(null)
    }

    useEffect(()=>{
    	if(selectedBookId){
			setDataLoading(true);
			let selectedBook = books.find(book => book.id === selectedBookId);
			setSelectedBookCitations(selectedBook.citations);
			setDataLoading(false);
    	}
    },[selectedBookId])

    const handleChapterSelect = async (event) => {

		let selChapterId = event.target.value;
		let selChapter = event.target.value;

		if(selChapterId != selectedChapterId){
			setSelectedChapterId(null);
			setSelectedChapter(null)
		}

		let bookCitations = '';
		let citations = [];
	    for (let key in books) {
	        if (books[key].id == selectedBookId && books[key].chapters) {
	            bookCitations = books[key].citations;
	            break;
	        }
	    }
	    for (let key in bookCitations) {

	        if (bookCitations[key].chapter ==  selChapterId) {
	            citations.push(bookCitations[key]);
	        }
	    }

		let theSelectedBook;
		theSelectedBook = books.find((book)=> {
			return book.id == selectedBookId;
		});

	    selChapter = chapters.find((chapter)=>{
	    	return chapter.chapter_number == selChapterId
	    });

		setSelectedBookId(selectedBookId);
		setSelectedBook(theSelectedBook);
		setSelectedChapterId(selChapterId);
		setSelectedChapter(selChapter)
		setSelectedBookCitations(citations)
		setChapterSelectionModalOpen(false);
    };


    const loadData = async () => {

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
	        setDataLoading(false);
	        setDeleteInProgress(false);
	        setBooks(books);
     	});
        return books;
	}

	let listOfBooks = '';

    if(books && books.length>0){
		listOfBooks = 
			<List component="nav" className="listOfBooks" aria-label="main mailbox folders">
				{books.map(book => (

					<div key={`citationSource-${book.id}`}>
						<div>
							<ListItem
								key={`book-${book.id}`}
								button
								onClick={(event) => handleBookListClick(event, book.id)}
								className="listOfBooksItem"
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
							<Tooltip title="Process Citations with Chapters" placement="top-start">
							  <IconButton onClick={()=> navigate(`/book/citationsAndChapters/${book.id}`)}>
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
        if (dataLoading === true) {
        	citationsFromBook = 
				<List>
					<div className="bookCitationList" >
						<CircularProgress className="circularProgress" />
					</div>
				</List>;
        } else if(dataLoading === false && selectedBookCitations && selectedBookCitations.length>0){
        	let selBookTitle = selectedBook ? selectedBook.title : '';
        	let selBookChapterTitle = selectedChapter ? selectedChapter.chapter_title : '';
	        citationsFromBook =
				<List component="nav" className="bookCitationListItem" aria-label="secondary mailbox folder">
					<ListItem
						key={`selectedbook-${selectedBookId}`}
					>
						<div className="bookCitationBookTitle">
							<u>
								<strong>
									{selBookTitle}
								</strong>
							</u><br/>
						</div>
					</ListItem>
					<ListItem
						key={`selectedbookchtitle-${selectedBookId}`}
					>
						<div className="bookCitationChapterTitle">
							<u>
								<strong>
									{selBookChapterTitle}
								</strong>
							</u><br/>
						</div>
					</ListItem>
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
			        	<CircularProgress className="circularProgress" />
			        </Grid>
		        </Grid>;
        } else {
        	generalBookCitationDisplay = 
        		<Grid container spacing={3}>
			        <Grid item xs={12}>
						<div className='card-header'>
							Books
							<Button className="citationUploadButton" startIcon={<CloudUploadIcon />} onClick={handleOpen}>
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
		        		<ChapterSelectionModal 
		        			bookIdForChInput={bookIdForChInput}
		        			chapters={chapters}
		        			chapterSelectionModalOpen={chapterSelectionModalOpen} 
		        			selectedChapterId={selectedChapterId}
		        			handleBookChapterSelect={handleChapterSelect}
		        			handleClose={handleClose} 
		        		/>
			        </Grid>
			        <Grid item xs={12}>
		        		<CitationModal 
		        			chapters={chapters}
		        			bookTitleForChInput={bookTitleForChInput}
		        			setBookTitleForChInput={setBookTitleForChInput}
		        			citationModalOpen={citationModalOpen} 
		        			bookIdForChInput={bookIdForChInput}
		        			setBookIdForChInput={setBookIdForChInput}
		        			handleClose={handleClose} 
		        			setErrors={setErrors}
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