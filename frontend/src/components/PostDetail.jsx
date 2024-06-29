import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Avatar, Box, Button, Card, CardActionArea, CardActions, CardContent, Stack, Typography } from '@mui/material';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { useNavigate } from 'react-router-dom';
import { LikesCard } from './LikesCard';
import { CommentsCard } from './CommentsCard';
import moment from 'moment';
import { gql, useMutation } from '@apollo/client';

const LIKE_POST = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId)
    }
`;

export const PostDetail = ({ data, refetch }) => {

    const [likePostMutation, { error }] = useMutation(LIKE_POST);

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
            refetch();
        } catch (error) {
            alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
        }
    };

    return (
        <Box>
            <Stack direction={'column'} spacing={2}>
                <Card variant='outlined'>
                    <CardContent>
                        <Stack direction={'column'} spacing={2}>
                            <CardActionArea onClick={() => { navigateTo(`/users/${userId}`) }}>
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <Avatar variant='circular' sx={{ bgcolor: 'primary.main' }}>
                                        {data.getSinglePost.user.username[0]}
                                    </Avatar>
                                    <Typography variant='body1' fontWeight={'bold'}>
                                        {data.getSinglePost.user.username}
                                    </Typography>
                                </Stack>
                            </CardActionArea>
                            <Typography variant='h4'>
                                {data.getSinglePost.body}
                            </Typography>
                            <Box>
                                <Stack direction={'row-reverse'} spacing={2} alignItems={'center'}>
                                    <Typography variant='subtitle2'>
                                        {moment(Number(data.getSinglePost.createdAt)).calendar()}
                                    </Typography>
                                    <TimelapseRoundedIcon sx={{ color: 'info.main' }} />
                                </Stack>
                            </Box>
                        </Stack>
                    </CardContent>
                    <CardActions>
                        <Button color='warning' variant={data.getSinglePost.likedBy.find((obj) => obj.username === userContext.username) ? "outlined" : "contained"} startIcon={<StarRoundedIcon />} disableElevation onClick={handleLike}>
                            {data.getSinglePost.likedBy.find((obj) => obj.username === userContext.username) ? "Unlike" : "Like"}
                        </Button>
                        {
                            data.getSinglePost.user.username === userContext.username &&
                            <Button color='error' variant='contained' startIcon={<DeleteRoundedIcon />} disableElevation onClick={() => alert("DELETED")}>
                                Delete
                            </Button>
                        }
                    </CardActions>
                </Card>
                <Card variant='outlined'>
                    <CardContent>
                        <LikesCard data={data} />
                    </CardContent>
                </Card>
                <Card variant='outlined'>
                    <CardContent>
                        <CommentsCard data={data} />
                    </CardContent>
                </Card>
            </Stack>
        </Box >
    )
}

export default PostDetail