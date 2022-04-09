import React, { useState } from 'react';
import { 
    Button,
    TextareaAutosize,
} from '@material-ui/core';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths

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
                className='commentTextBox'
                minRows={5}
            />
            <div className='commentButtonContainer'>
                <Button className='commentAddButton' type="submit" variant="contained" color="primary" onClick={() => {handleCommentSubmit(comment)}}>
                    Add Comment
                </Button>
                <Button className='commentCancelButton' type="submit" variant="contained" color="primary" onClick={handleCommentBoxAppear}>
                    Cancel
                </Button>
            </div>
        </div>
    );
}
export default CommentBox;