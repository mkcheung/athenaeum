import React, { useState } from 'react';
import { 
    Button,
    Container,
    Divider,
    TextField,
    Grid,
} from '@material-ui/core';
import ReplyList  from '../Comments/ReplyList';

const CommentList = (props) => {
    let {
        comments,
    } = props;

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={11}>
                    {comments.map(comment => (
                        <ReplyList key={`comment_replies-${comment.id}`} comment={comment} />
                    ))}
                </Grid>
            </Grid>
        </Container>
    );
}
export default CommentList;