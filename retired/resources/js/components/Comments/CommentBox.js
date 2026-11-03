import React, { useState } from 'react';
import { 
    Button,
    TextField,
    TextareaAutosize,
} from '@material-ui/core';

const CommentBox = (props) => {
    const [comment, setComment] = useState("");

    let {
        handleCommentBoxAppear,
        handleCommentSubmit
    } = props;
    return (
        <div>
            <TextareaAutosize 
                id='comment' 
                title='comment' 
                onChange={e => setComment(e.target.value)} 
                value={comment}
                style = {{width:'1225px'}}
                rowsMin={5}
            />
            <div style = {{marginTop:'50px'}}>
                <Button style={{float:'right'}} type="submit" variant="contained" color="primary" onClick={() => {handleCommentSubmit(comment)}}>
                    Add Comment
                </Button>
                <Button style={{float:'right', marginRight:'10px'}} type="submit" variant="contained" color="primary" onClick={handleCommentBoxAppear}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
export default CommentBox;