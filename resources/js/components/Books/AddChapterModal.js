import React, { useState, useContext } from 'react';
import Files from 'react-files'
import { makeStyles } from '@material-ui/core/styles';
import { 
	Button,
	Container,
	FormControl,
	FormHelperText,
	Grid,
	Input,
	InputLabel,
	Modal,
	Paper,
	TextField
} from '@material-ui/core';
import { AuthContext } from '../GlobalStates';
import swal from 'sweetalert2';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
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

const AddChapterModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [ modalStyle ] = useState(getModalStyle);
  const [ chapterNum, setChapterNum ] = useState(null);
  const [ chapterModalOpen, setOpen ] = useState(false);
  const [ chapterTitle, setChapterTitle ] = useState('');
  const [ chapterPageBegin, setChapterPageBegin ] = useState(null);
  const [ chapterPageEnd, setChapterPageEnd ] = useState(null);

  const [ authState, setAuthState ] = useContext(AuthContext);

	const handleChapterSubmit = async () => {

    let data = {
    	book_id: props.bookIdForChInput,
    	page_begin: chapterPageBegin,
    	page_end: chapterPageEnd,
    	chapter_title: chapterTitle,
    	chapter_number: chapterNum
    };

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
				swal.fire("Done!", "Chapter Added!", "success");
				props.setBookIdForChInput(null);
				setChapterPageBegin(null);
				setChapterPageEnd(null);
    		setChapterTitle('');
    		setChapterNum(null);
      	props.handleClose();
		})
		.catch(error => {
			props.setErrors(error.response.data.errors);
		});
	}
  const handleChapterNumChange = (e) => {
    let chapterNum = e.target.value;
    setChapterNum(chapterNum);
  }

  const handleChapterTitleChange = (e) => {
    let chapterTitle = e.target.value;
    setChapterTitle(chapterTitle);
  }

  const handleChPageBeginChange = (e) => {
    let pageBegin = e.target.value;
    setChapterPageBegin(pageBegin);
  }

  const handleChPageEndChange = (e) => {
    let pageEnd = e.target.value;
    setChapterPageEnd(pageEnd);
  }

  const body = (
        <Grid container spacing={3}>
            <div style={modalStyle} className={classes.paper}>
				<h2 id="simple-modal-title">Add Chapter</h2>
				<form noValidate autoComplete="off">
					
					<Grid item xs={12}>
					
						<Grid item xs={12}>
							<InputLabel htmlFor="title">Title:</InputLabel>
							{props.bookTitleForChInput}
						</Grid>
						<br/>
						
						<Grid item xs={12}>
							<InputLabel htmlFor="chapterNum">Chapter #:</InputLabel>
							<TextField id="chapterNum" aria-describedby="my-helper-text" value={chapterNum} onChange={handleChapterNumChange} />
						</Grid>

						<Grid item xs={12}>
							<InputLabel htmlFor="chapterTitle">Chapter Title:</InputLabel>
							<TextField id="chapterTitle" aria-describedby="my-helper-text" value={chapterTitle} onChange={handleChapterTitleChange} />
						</Grid>
						
						<Grid item xs={12}>
							<InputLabel htmlFor="chapterPageBegin">Page - Begin:</InputLabel>
							<TextField id="chapterPageBegin" aria-describedby="my-helper-text" value={chapterPageBegin} onChange={handleChPageBeginChange} />
						</Grid>
						
						<Grid item xs={12}>
							<InputLabel htmlFor="chapterPageEnd">Page - End:</InputLabel>
							<TextField id="chapterPageEnd" aria-describedby="my-helper-text" value={chapterPageEnd} onChange={handleChPageEndChange} />
						</Grid>
					</Grid>
					<br/>
					
					<Grid item xs={12}>
						<Button variant="contained" color="primary" onClick={() => { handleChapterSubmit() }}>
							Create Chapter Entry
						</Button>
					</Grid>
					<br/>
				</form>
			</div>
	    </Grid>
  );

  return (
    <div>
      <Modal
        open={props.chapterModalOpen}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default AddChapterModal;


