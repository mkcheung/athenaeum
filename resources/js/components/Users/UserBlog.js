import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { 
    Button,
    Chip,
    Grid,
    InputLabel,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    TextField,
    TextareaAutosize,
} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Link, useParams } from 'react-router-dom';
import HTMLEllipsis from 'react-lines-ellipsis/lib/html';
import { makeStyles } from '@material-ui/core/styles';
import '../../../css/styles.css'; // TODO: convert to utilize absolute paths

const UserBlog = (props) => {

    const [ tagOptions, setTagOptions ] = useState([]);
    const [ selectedTags, selectTags ] = useState([]);
    const [ posts, setPosts ] = useState([]);
    const [ user, setUser ] = useState([]);

    const params = useParams();

    useEffect( () => {
        async function loadData(userId){
            let userObj = await axios.get('/api/users/showUserBlogPosts', 
            {
                headers: {
                    'Accept': 'application/json'
                },
                params: {
                    userId: userId
                }
            });

            let userData = userObj.data;
            setUser(userData[0]);
            setPosts(userData[0]['posts']);
        }
        loadData(params.id);
    }, [params.id]);


    useEffect( () => {
        async function loadTagsOptions(){
            let tagOptions = [];

            let tagRes = await axios.get('/api/tags/showTags', 
                {
                    headers: {
                        'Accept': 'application/json'
                    }
                });
            let tags = tagRes.data;
            
            tags.forEach(function(tag){
                let tagIdAndTitle = {};
                tagIdAndTitle['id'] = tag.id;
                tagIdAndTitle['value'] = tag.title;
                tagOptions.push(tagIdAndTitle);
                setTagOptions(tagOptions);
            });
        }
        loadTagsOptions();
    }, []);

    const handleTagSelection = async (event, values) => {
        selectTags(values);
    }

    const handleTagSubmit = async () => {

        let userId = params.id;
        let userObj = await axios.get('/api/users/showUserBlogPosts', 
        {
            headers: {
                'Accept': 'application/json'
            },
            params: {
                userId: userId,
                tags: selectedTags
            }
        });

        let userData = userObj.data;
        setUser(userData[0]);
        setPosts(userData[0]['posts']);
    }

    const formatDate = (incomingDate) => {
        let humanReadableDate = new Date(incomingDate);
        return humanReadableDate.toLocaleString();
    }

    let userBlogEntries = <div></div>;
    if(posts.length > 0){
        userBlogEntries = 
            <div>
                {
                    posts.length && posts.map(post => (
                    <div key={`userpost-${post.id}`}>
                        <h2>
                            <Link
                                to={`/post/show/${post.id}`}
                                className="blogLink"
                                key={post.id}
                            >
                                {post.title}
                            </Link>
                        </h2>
                            <HTMLEllipsis
                                unsafeHTML={post.content}
                                maxLine='3'
                                ellipsis='...'
                                basedOn='letters'
                            />
                        Author: {user.full_name}
                        <br/>
                        Posted: {formatDate(post.created_at)}
                        <hr/>
                    </div>
                ))}
            </div>
    }

    return (
        <div className="root">
            <Grid container spacing={3}>
                <Grid item xs={1}>
                </Grid>
                <Grid item xs={8}>
                    {userBlogEntries}
                </Grid>
                <Grid item xs={3}>
                    <div className="tagContainer">
                        <Autocomplete
                            id='tags'
                            freeSolo
                            multiple
                            options={tagOptions}
                            getOptionLabel={(tagOption) => tagOption.value}
                            renderInput={(params) => 
                                <TextField 
                                    {...params} 
                                    label="Search Posts With Tags:"
                                />
                            }
                            onChange={handleTagSelection}
                        />
                    </div>
                    <Chip
                        label='Search'
                        onClick={() => handleTagSubmit()}
                    />
                </Grid>
            </Grid>
        </div>
    )
}
export default UserBlog;

