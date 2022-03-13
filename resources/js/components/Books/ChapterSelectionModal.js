import React, { useState } from 'react';
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
	Select,
	TextField
} from '@material-ui/core';

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

const ChapterSelectionModal = (props) => {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  let body = '';
  if(props.books){
  	body = (
	        <Grid container spacing={3}>
	            <div style={modalStyle} className={classes.paper}>
					<h2 id="simple-modal-title">Select Chapter Citations:</h2>
					<form noValidate autoComplete="off">
						
						<Grid item xs={12}>
	            <FormControl >
	                <InputLabel htmlFor="age-native-simple">Books:</InputLabel>
	                <Select
	                    native
	                    name='book'
	                    value={props.bookSelectedId}
	                    onChange={props.handleBookChapterSelect}
	                    title='Book Select'
	                >
	                <option value='0'>None</option>
	                {
	                    Object
	                    .keys(props.books)
	                    .map(key => <option key={key} value = {props.books[key].id}>{props.books[key].title}</option>)
	                }
	                </Select>
	            </FormControl>
						</Grid>
						<br/>
						
						<Grid item xs={12}>
		          			<FormControl >
	  							<InputLabel htmlFor="age-native-simple">Chapters:</InputLabel>
								<Select
									native
	                name='chapter'
									value={props.selectedChapter}
									onChange={props.handleBookChapterSelect}
									title='Chapter Select'
								>
									<option value='0'></option>
									{
										Object
										.keys(props.chapters)
										.map(key => <option key={key} value = {props.chapters[key].chapter_number}>Ch.{props.chapters[key].chapter_number}-{props.chapters[key].chapter_title}</option>)
									}
								</Select>
		          			</FormControl>
						</Grid>
						<br/>
					</form>
				</div>
		    </Grid>
	  );
  } else {
  	body = (
	        <Grid container spacing={3}>
	            <div style={modalStyle} className={classes.paper}>
					<h2 id="simple-modal-title">Select Chapter Citations:</h2>
					<form noValidate autoComplete="off">
						
						<Grid item xs={12}>
		          			<FormControl >
	  							<InputLabel htmlFor="age-native-simple">Chapters:</InputLabel>
								<Select
									native
	                name='chapter'
									value={props.selectedChapter}
									onChange={props.handleBookChapterSelect}
									title='Chapter Select'
								>
									<option value='0'></option>
									{
										Object
										.keys(props.chapters)
										.map(key => <option key={key} value = {props.chapters[key].chapter_number}>Ch.{props.chapters[key].chapter_number}-{props.chapters[key].chapter_title}</option>)
									}
								</Select>
		          			</FormControl>
						</Grid>
						<br/>
					</form>
				</div>
		    </Grid>
	  );
  }
	  

  return (
    <div>
      <Modal
        open={props.chapterSelectionModalOpen}
        onClose={props.handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}
export default ChapterSelectionModal;

