import axios from 'axios'
import React, { useState, useEffect, useContext } from 'react';
import swal from 'sweetalert2';
import NewTagModal  from './NewTagModal';
import { 
    Box,
    CircularProgress,
    Collapse,
    Container,
    Grid,
    IconButton,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import { useAuth } from '../GlobalStates';

import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

import { Link } from 'react-router-dom';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

function Row(props) {
    const { tag } = props;
    const [ open, setOpen ] = useState(false);

    return (
        <React.Fragment>
            <TableRow>
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    { tag.title }
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Associated Blogs</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tag.posts.map((post) => (
                                        <TableRow key={post.id}>
                                            <TableCell component="th" scope="row">
                                                    <Link
                                                        to={`/post/show/${post.id}`}
                                                        key={post.id}
                                                        style={{ textDecoration: 'none', color:'black' }}
                                                    >
                                                        {post.title}
                                                    </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
} 

const TagsList = (props) => {

    const { authState, setAuthState } = useAuth();

    const [ loading, setLoading ] = useState(true);
    const [ open, setOpenModal ] = useState(false);
    const [ tags, setTags ] = useState([]);

    const [newTag, setNewTag] = useState({
        title: '',
        description: '',
        slug: ''
    });
    const [errors, setErrors] = useState([]);

    useEffect( () => {
        if(loading){
            loadData();
        }
    },[loading]);

    const loadData = async () => {
        try {
            let tagObj = await axios.get('/api/tags/getTagsToPosts', 
            {
                headers: {
                    'Authorization': 'Bearer '+authState.accessToken,
                    'Accept': 'application/json'
                }
            });

            let postsToTags = [];
            const tagData = tagObj.data;
            setLoading(false);
            setTags(tagData);
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }
    }

    const handleFieldChange = async (event) => {
        newTag[event.target.id] = event.target.value
    }

    const handleOpen = async () => {
        setOpenModal(true);
    };

    const handleClose = async () => {
        setOpenModal(false);
    };

    const handleSubmit = async () => {

        try {
            let tagRes = await axios.post('/api/tags', 
                {
                    data: newTag,
                },
                {   
                    headers: {
                        'Authorization': 'Bearer '+authState.accessToken,
                        'Accept': 'application/json'
                    }
                }
            );
            swal.fire("Done!", "Tag Created!", "success");
            setLoading(true);
            handleClose();
        } catch (error) {
            swal.fire('Done!', String(error), 'error');
        }
    };

let test = <div></div>;
    if (loading === true) {
        test = 
            <div style={{verticalAlign: 'top', marginLeft:'3px',marginRight:'3px',marginTop:'50px',position:'relative' }} >
                <CircularProgress style={{margin:'auto', position: 'absolute', top:0,bottom:0,left:0,right:0, }} />
            </div>
    } else if(loading === false && tags && tags.length>0){
        test = <TableContainer component={Paper}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Tags</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tags.map((tag) => (
                                    <Row key={`tag-${tag.title}-${tag.id}`} tag={tag} />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
    }

    return (
        <Container maxWidth="lg">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <div className='card-header'>All Tags</div>
                    <NewTagModal open={open} handleFieldChange={handleFieldChange} handleSubmit={handleSubmit}/>
                </Grid>
                <Grid item xs={6}>
                    {test}
                </Grid>
                <Grid item xs={6}>
                    <button type="button" onClick={handleOpen}>
                        Create Tag
                    </button>
                </Grid>
            </Grid>
        </Container>
    );
}
export default TagsList;
