import axios from 'axios';
import React, { useState, useContext } from 'react';
import { 
    Chip,
    Button,
    TextareaAutosize,
} from '@material-ui/core';
import { useAuth } from '../GlobalStates';

const ReplyBox = (props) => {
    const [reply, setReply] = useState("");
    const { authState, setAuthState } = useAuth();

    const handleReplyChange = (e) => {
        let replyInput = e.target.value;
        setReply(replyInput)
    };

    let {
        commentId,
        handleReplyBoxAppear,
        handleReplySubmit
    } = props;
    return (
        <div>
            <TextareaAutosize
                id='reply' 
                title='reply' 
                onChange={handleReplyChange} 
                value={reply}
                style = {{ width:'100%', marginLeft:'60px'}}
                rowsMin={5}
            />
            <div style = {{marginTop:'25px'}}>
                <Chip size='small' label='Add Reply' style={{float:'right', marginLeft:'15px'}} onClick={() => handleReplySubmit(reply, commentId)}/>
                <Chip size='small' label='Cancel' style={{float:'right', marginRight:'10px'}} onClick={() => handleReplyBoxAppear(false)}/>
            </div>
        </div>
    );
}
export default ReplyBox;