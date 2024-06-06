import { Avatar, AvatarGroup, Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { blue } from '@mui/material/colors';

export const PostDetail = ({ data }) => {

    const userId = data.getSinglePost.user.id;
    const numberOfLikes = data.getSinglePost.likedBy.length;
    const numberOfComments = data.getSinglePost.replies.length;

    return (
        <Box>
            <Card variant='outlined'>
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <CardActionArea href={`/users/${userId}`} disableRipple>
                            <Avatar variant='rounded' sx={{ bgcolor: blue[500] }}>
                                {data.getSinglePost.user.username[0]}
                            </Avatar>
                        </CardActionArea>
                        <Typography variant='body1'>
                            POST AUTHOR: {data.getSinglePost.user.username}
                        </Typography>
                        <Typography variant='h4'>
                            BODY: {data.getSinglePost.body}
                        </Typography>
                        <Typography variant='caption'>
                            TIME: {data.getSinglePost.createdAt}
                        </Typography>
                        {
                            numberOfLikes ?
                                <Box>
                                    <Stack direction={'row'}>
                                        <AvatarGroup total={numberOfLikes}>
                                            <Avatar variant='rounded'>
                                                {data.getSinglePost.likedBy[0].username[0]}
                                            </Avatar>
                                        </AvatarGroup>
                                    </Stack>
                                </Box>
                                :
                                <Box>
                                    <Typography>
                                        No likes yet!
                                    </Typography>
                                </Box>
                        }
                        {
                            numberOfComments ?
                                <Box>
                                    <Stack direction={'column'}>
                                        <Typography variant='caption'>
                                            COMMENT: {data.getSinglePost.replies[0].body}
                                        </Typography>
                                        <Typography variant='caption'>
                                            NUMBER OF COMMENTS: {numberOfComments}
                                        </Typography>
                                    </Stack>
                                </Box>
                                :
                                <Box>
                                    <Typography>
                                        No comments yet!
                                    </Typography>
                                </Box>
                        }
                    </Stack>
                </CardContent>
            </Card>
        </Box >
    )
}

export default PostDetail