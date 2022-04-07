import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
	Button,
	Grid,
	InputLabel,
	Modal,
  TextareaAutosize,
	TextField
} from '@material-ui/core';
import swal from 'sweetalert2';
import { useAuth } from '../GlobalStates';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths

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

const CitationModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [ modalStyle ] = useState(getModalStyle);
  const [ citationModalOpen, setOpen ] = useState(false);
  const [ selectedChapter, setSelectedChapter ] = useState(null);
  const [ citationPage, setCitationPage ] = useState(null);
  const [ citation, setCitation ] = useState('');
  const [ chapterNum, setChapterNum ] = useState(null);

  const { authState, setAuthState } = useAuth();

  const handleChapterSelect = (e) => {
    let chapter = e.target.value;
    setSelectedChapter(chapter);
  }

  const handleCitationPageChange = (e) => {
    let citationPage = e.target.value;
    setCitationPage(citationPage);
  }

  const handleCitationChange = (e) => {
    let theCitation = e.target.value;
    setCitation(theCitation);
  }

  const handleCitationSubmit = () => {
    let data = {
      book_id: props.bookIdForChInput,
      content: citation,
      chapter: selectedChapter ? selectedChapter : null,
      page: citationPage,
    }

    console.log(data);
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
      swal.fire("Done!", "Citation Added!", "success");
      props.setBookTitleForChInput('');
      props.setBookIdForChInput(null);
      setSelectedChapter(null);
      setCitationPage(null);
      setCitation('');
      setChapterNum(null)
      props.handleClose();
    })
    .catch(error => {
      console.log(error);
      props.setErrors(error.response.data.errors);
    });
  }

  const body = (
        <Grid container spacing={3}>
            <div style={modalStyle} className={classes.paper}>
            <u>
              <h2 id="simple-modal-title">
                Add Citation for {props.bookTitleForChInput}:
              </h2>
            </u>
				<form noValidate autoComplete="off">
					
					<Grid item xs={12}>
            <InputLabel htmlFor="page">Chapter:</InputLabel>
            <TextField  className="modalInputField" id="selectedChapter" type="number" aria-describedby="my-helper-text" value={selectedChapter} onChange={handleChapterSelect} />
					</Grid>
          <Grid item xs={12}>
              <InputLabel htmlFor="citationPage">Page:</InputLabel>
              <TextField  className="modalInputField" id="citationPage" aria-describedby="my-helper-text" value={citationPage} onChange={handleCitationPageChange} />
          </Grid>
          <br/>
          <Grid item xs={12}>
              <InputLabel htmlFor="page">Citation:</InputLabel>
              <TextareaAutosize id="content" rows={4} style={{width:'100%'}} aria-label="minimum height" value={citation} placeholder="Place citation here" onChange={handleCitationChange} />
          </Grid>
          <br/>
          
          <Grid item xs={12}>
              <Button variant="contained" color="primary" onClick={() => { handleCitationSubmit() }}>
                  Add Citation
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
        open={props.citationModalOpen}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default CitationModal;

