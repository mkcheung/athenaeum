import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { 
	Button,
	Grid,
	InputLabel,
	Modal,
	TextField
} from '@material-ui/core';
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

const NewTagModal = (props) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);

  const body = (
        <Grid container spacing={3}>
            <div style={modalStyle} className={classes.paper}>
            <u>
              <h2 id="simple-modal-title">
                New Tag
              </h2>
            </u>
				<form noValidate autoComplete="off">
					
					<Grid item xs={12}>
						<InputLabel htmlFor="title">Tag Name:</InputLabel>
						<TextField className="modalInputField" id="title" aria-describedby="my-helper-text" onChange={props.handleFieldChange} />
					</Grid>
					<br/>
					
					<Grid item xs={12}>
						<Button variant="contained" color="primary" onClick={() => { props.handleSubmit() }}>
							Create Tag
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
            open={props.open}
            onClose={props.handleClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            {body}
        </Modal>
    </div>
    );
}
export default NewTagModal;