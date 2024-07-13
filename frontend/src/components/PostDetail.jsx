import {
    useContext,
    useState
} from "react";
import AuthContext from "../context/AuthContext";
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardHeader,
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemButton,
    Stack,
    Typography
} from '@mui/material';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import moment from 'moment';
import { GET_POST_BY_ID } from "../pages/Post";
import { gql, useMutation } from '@apollo/client';

const LIKE_POST = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId)
    }
`;

const DELETE_POST = gql`
    mutation DeletePost($postId: ID!) {
        deleteSinglePost(postId: $postId)
    }
`;

export const PostDetail = ({ data }) => {

    const [likePostMutation, { error: likeError }] = useMutation(LIKE_POST, {
        refetchQueries: [
            GET_POST_BY_ID
        ],
    });

    const [deletePostMutation, { error: deleteError }] = useMutation(DELETE_POST);

    const navigateTo = useNavigate();

    const { userContext } = useContext(AuthContext);

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const userId = data.getSinglePost.user.id;
    const likedByObject = data.getSinglePost.likedBy;
    const likesCount = data.getSinglePost.likedBy.length;

    const postUsername = data.getSinglePost.user.username;
    const isMyPost = data.getSinglePost.user.username === userContext.username;

    const handleLike = async () => {
        try {
            await likePostMutation({
                variables: {
                    "postId": data.getSinglePost.id
                }
            });
        } catch (error) {
            alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
        }
    };

    const handleDelete = async () => {
        if (confirm("Are you sure? This action cannot be undone!")) {
            try {
                await deletePostMutation({
                    variables: {
                        "postId": data.getSinglePost.id
                    }
                });
                navigateTo(-1);
            } catch (error) {
                alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
            }
        } else {
            return;
        }
    }

    return (
        <Box>
            <Stack direction={'column'} spacing={2}>
                <Card variant='outlined'>
                    <CardActionArea>
                        <CardHeader
                            avatar={
                                <Avatar variant='circular' sx={{ bgcolor: 'primary.main' }}>
                                    {postUsername[0]}
                                </Avatar>
                            }
                            title={postUsername}
                            subheader={moment(Number(data.getSinglePost.createdAt)).calendar()}
                            onClick={() => { navigateTo(`/users/${userId}`) }}
                        />
                    </CardActionArea>
                    <CardContent>
                        <Typography>
                            {data.getSinglePost.body}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <ButtonGroup color={'warning'}>
                            <Button variant={data.getSinglePost.likedBy.find((obj) => obj.username === userContext.username) ? "outlined" : "contained"} disableElevation onClick={handleLike}>
                                <StarRoundedIcon />
                            </Button>
                            <Button variant='contained' disableElevation onClick={likesCount !== 0 && handleClickOpen}>
                                {likesCount}
                            </Button>
                        </ButtonGroup>
                        {
                            isMyPost &&
                            <Button color='error' onClick={handleDelete}>
                                <DeleteRoundedIcon />
                            </Button>
                        }
                    </CardActions>
                </Card>
                <Dialog open={open} onClose={handleClose} fullWidth scroll="paper">
                    <DialogTitle>
                        {'Likes'}
                    </DialogTitle>
                    <DialogContent dividers>
                        <List>
                            {
                                likedByObject.map((user) => {
                                    return (
                                        <ListItem key={user.id}>
                                            <ListItemAvatar>
                                                <Avatar variant='circular'>
                                                    {user.username[0]}
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText primary={user.username} />
                                            <Button component={RouterLink} to={`/users/${user.id}`} startIcon={<AccountBoxRoundedIcon />}>
                                                Profile
                                            </Button>
                                        </ListItem>
                                    )
                                })
                            }
                        </List>
                    </DialogContent>
                </Dialog>
            </Stack>
        </Box >
    )
}

export default PostDetail