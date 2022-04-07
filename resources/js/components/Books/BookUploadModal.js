import React, { useState, useContext } from 'react';
import Files from 'react-files'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { 
	Button,
	CircularProgress,
	Checkbox,
	FormControlLabel,
	Grid,
	InputLabel,
	Modal,
	TextField
} from '@material-ui/core';
import { useAuth } from '../GlobalStates';
import { green } from '@material-ui/core/colors';
import swal from 'sweetalert2';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths

const GreenCheckbox = withStyles({
	root: {
		color: green[400],
		'&$checked': {
			color: green[600],
		},
	},
	checked: {},
})((props) => <Checkbox color="default" {...props} />);

const rand = () => {
	return Math.round(Math.random() * 20) - 10;
}

const getModalStyle = () => {
	const top = 50 + rand();
	const left = 50 + rand();

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    height:'500px',
    width:'500px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const BookUploadModal = (props) => {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [ modalStyle ] = useState(getModalStyle);
	const [ addBookOnly, setAddBookOnly ] = useState(false);
	const [ bookTitle, setBookTitle ] = useState('');
	const [ jsonFile, setJsonFile ] = useState({});
	const [ pages, setPages ] = useState(0);
	const [ author, setAuthor ] = useState({
		author_first_name:'',
		author_middle:'',
		author_last_name:''
	});
  const { authState, setAuthState } = useAuth();


	const handleAddBook = (e) => {
		const checkStatus = e.target.checked;
		setAddBookOnly(checkStatus);
	}

	const bookTitleChange = (e) => {
		const bookTitle = e.target.value;
		setBookTitle(bookTitle);
	}

	const handleAuthorFirstNameChange = (e) => {
		let firstName = event.target.value;
		setAuthor((prevState) => ({
			...prevState,
			author_first_name:firstName
		}));
	}

	const handleAuthorMiddleNameChange = (e) => {
		let middleName = event.target.value;
		setAuthor((prevState) => ({
			...prevState,
			author_middle:middleName
		}));
	}

	const handleAuthorLastNameChange = (e) => {
		let lastName = event.target.value;
		setAuthor((prevState) => ({
			...prevState,
			author_last_name: lastName
		}));
	}

	const handlePageNumberChange = (e) => {
		let pageNumbers = e.target.value;
		setPages(pageNumbers);
	}

	const onFilesChange = (files) => {
	    const fileReader = new FileReader();

	    fileReader.onload = (event) => {
			let jsonFile = JSON.parse(event.target.result);
			let bookTitle = jsonFile.title;
			setJsonFile(jsonFile);
			setBookTitle(bookTitle);
	    };

	     fileReader.readAsText(files[0]);
	}

	const handleSubmit = async () => {

	    let data = {
	    	...author,
	    	bookTitle,
	    	jsonFile, 
	    	pages,
	    	userId: authState.user.id
	    }

        try {
			const results = await axios.post('/api/books', { 
	        	data 
	        },
	        {   
	        	headers: {
	                'Authorization': 'Bearer ' + authState.accessToken,
	                'Accept': 'application/json'
	            },
	        });

	        setAuthor({
			    author_first_name: '',
			    author_middle: '',
			    author_last_name: '',
	        });
	        setAddBookOnly(false);
	        setBookTitle('');
	        setPages(0);
			swal.fire("Done!", "Book Citations Uploaded!", "success");
			props.handleClose();
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
			props.handleClose();
        }
	};

	let bookLoadingDisplay = '';

	let bookTitleDisplay = '';
	let fileUploadComponent = '';
	let handleSubmitButtonTitle = '';

	if(addBookOnly===true){
		bookTitleDisplay = 
			<Grid item xs={12}>
				<InputLabel htmlFor="title">Title:</InputLabel>
				<TextField id="bookTitle" aria-describedby="my-helper-text" value={bookTitle} onChange={bookTitleChange} />
			</Grid>;
		fileUploadComponent='';
		handleSubmitButtonTitle='Add Book';
	} else {
		bookTitleDisplay = 
			<Grid item xs={12}>
				<InputLabel htmlFor="title">Title:</InputLabel>
				{bookTitle}
			</Grid>;

		fileUploadComponent = <div className="files modalInputFileUploadSpace">
			<Files
				className='files-dropzone'
				onChange={onFilesChange}
				onError={props.onFilesError}
				accepts={['.json', '.pdf']}
				multiple
				maxFiles={3}
				maxFileSize={10000000}
				minFileSize={0}
				clickable
			>
				Drop json file here or click to upload
			</Files>
		</div>;

		handleSubmitButtonTitle='Upload Citations';
	}

	if(props.modalLoading == true){
  		bookLoadingDisplay = <CircularProgress style={{margin:'auto', position: 'absolute', top:0,bottom:0,left:0,right:0, }} />;
	} else {
  		bookLoadingDisplay = <div style={modalStyle} className={classes.paper}>
				<u>
					<h2 id="simple-modal-title">
						Add New Book and Citations
					</h2>
				</u>
				<form noValidate autoComplete="off">
					
					<Grid item xs={12}>
						<FormControlLabel
							control={<GreenCheckbox checked={addBookOnly} onChange={handleAddBook} name="add_book_only" />}
							label="Add Book Only:"
						/>
					
						{bookTitleDisplay}
						<br/>
						
						<Grid item xs={12}>
							<InputLabel htmlFor="author_first_name">Author First Name:</InputLabel>
							<TextField className="modalInputField" id="author_first_name" aria-describedby="my-helper-text" value={author.author_first_name} onChange={handleAuthorFirstNameChange} />
						</Grid>
						
						<Grid item xs={12}>
							<InputLabel htmlFor="author_middle">Author Middle:</InputLabel>
							<TextField className="modalInputField" id="author_middle" aria-describedby="my-helper-text" value={author.author_middle} onChange={handleAuthorMiddleNameChange} />
						</Grid>
						
						<Grid item xs={12}>
							<InputLabel htmlFor="author_last_name">Author Last Name:</InputLabel>
							<TextField className="modalInputField" id="author_last_name" aria-describedby="my-helper-text" value={author.author_last_name} onChange={handleAuthorLastNameChange} />
						</Grid>
						
						<Grid item xs={12}>
							<InputLabel htmlFor="pages">Pages:</InputLabel>
							<TextField className="modalInputField" id="pages" aria-describedby="my-helper-text" onChange={handlePageNumberChange} />
						</Grid>
						<br/>
				        {fileUploadComponent}
					</Grid>
					<br/>
					
					<Grid item xs={12}>
						<Button variant="contained" color="primary" onClick={() => { handleSubmit() }}>
							{handleSubmitButtonTitle}
						</Button>
					</Grid>
					<br/>
				</form>
			</div>;
  }

	const body = (
		<Grid container spacing={3}>
		    {bookLoadingDisplay}
		</Grid>
	);

	return (
		<div>
			<Modal
				open={props.modalOpen}
				onClose={props.handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
export default BookUploadModal;