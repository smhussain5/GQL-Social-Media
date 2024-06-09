import { Avatar, AvatarGroup, Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import { LikesCard } from './LikesCard';
import { CommentsCard } from './CommentsCard';
import moment from 'moment';

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
                            <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                <Avatar variant='rounded' sx={{ bgcolor: 'primary.main' }}>
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
                        <Typography variant='subtitle2'>
                            {moment(Number(data.getSinglePost.createdAt)).calendar()}
                        </Typography>
                        <LikesCard />
                        <CommentsCard />
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