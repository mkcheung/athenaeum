import React from 'react';
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
import '../../../css/styles.css'; // TODO: apply absolute paths

const BookCitationList = (props) => {

	let {book_title, chapter_title, citations, handleCitationInsertion, handleOpenChapterSelectionModal} = props; 
    let bookTitleDisplay = book_title ? <Grid item xs={12}>
                <div className="citationChapterTitle">
                    <InputLabel><strong>Title:</strong> <u>{book_title}</u></InputLabel>
                </div>
            </Grid> : 
            '';

    let chapterTitleDisplay = chapter_title ? <Grid item xs={12}>
                <div className="citationChapterTitle">
                    <InputLabel><strong>Chapter Title:</strong> <u>{chapter_title}</u></InputLabel>
                </div>
            </Grid> : 
            '';


	const body = (
        <Grid container spacing={3} style={{paddingRight:10}}>
            <Grid item xs={12} className='card-header'>
                <span className="citationButtonHeader">
                    Citations:
                </span>
                <Button id="citationSubmit" variant="contained" color="primary" onClick={() => handleOpenChapterSelectionModal()}>
                    Search
                </Button>
            </Grid>
            {bookTitleDisplay}
            {chapterTitleDisplay}
            <Grid container className="citationContainer">
                <Grid item xs={12}>
                    <ul className="citationContainerList">
                    {
                        citations && citations.map(citation => (
                        <li key={citation.id} onClick={(e) => handleCitationInsertion(e)}>
                            <div className="page">
                                <u>Page: {citation.page}</u>
                            </div>
                            <p className="citationText">
                                {citation.content}
                            </p>
                        </li>
                    ))}
                    </ul>
                </Grid>
            </Grid>
	    </Grid>
	);

  return (
    <div>
        {body}
    </div>
  );
}
export default BookCitationList;

