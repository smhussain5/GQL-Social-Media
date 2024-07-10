import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, CardHeader, Stack, Typography } from '@mui/material';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useNavigate } from 'react-router-dom';
import { LikesCard } from './LikesCard';
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

    const userId = data.getSinglePost.user.id;

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
                                    {data.getSinglePost.user.username[0]}
                                </Avatar>
                            }
                            title={data.getSinglePost.user.username}
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
                        <Button color='warning' variant={data.getSinglePost.likedBy.find((obj) => obj.username === userContext.username) ? "outlined" : "contained"} disableElevation onClick={handleLike}>
                            <StarRoundedIcon />
                        </Button>
                        {
                            data.getSinglePost.user.username === userContext.username &&
                            <Button color='error' onClick={handleDelete}>
                                <DeleteRoundedIcon />
                            </Button>
                        }
                    </CardActions>
                </Card>
                <Card variant='outlined'>
                    <CardContent>
                        <LikesCard data={data} />
                    </CardContent>
                </Card>
            </Stack>
        </Box >
    )
}

export default PostDetail