import axios from 'axios';
import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../GlobalStates';

const PostsLists = () => {

    const [posts, setPosts] = useState([]);
    const [authState,setAuthState] = useContext(AuthContext);

    useEffect(async () => {
        let posts = await axios.get('/api/posts', {
            headers: {
                'Authorization': 'Bearer ' + authState.accessToken,
                'Accept': 'application/json'
            }
        });
        const data = posts.data ? posts.data : [];
    }, []);

    return (
        <div className='container py-4'>
            <div className='row justify-content-center'>
                <div className='col-md-8'>
                    <div className='card'>
                        <div className='card-header'>All Posts</div>
                            <div className='card-body'>
                            <ul className='list-group list-group-flush'>
                                {posts.map(post => (
                                <Link
                                    className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
                                    to={`/post/show/${post.id}`}
                                    key={post.id}
                                >
                                    {post.name}
                                    <span className='badge badge-primary badge-pill'>
                                        {post.tasks_count}
                                    </span>
                                </Link>
                                ))}
                            </ul>
                            <Link className='btn btn-primary btn-sm mb-3' to='/post/create'>
                                Create new post
                            </Link>
                            <br/>
                            <Link className='btn btn-primary btn-sm mb-3' to='/category/create'>
                                Create new category
                            </Link>
                            <br/>
                            <Link className='btn btn-primary btn-sm mb-3' to='/tag/create'>
                                Create new tag
                            </Link>
                            <br/>
                            </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PostsLists;