import { Avatar, Box, Card, CardActionArea, CardContent, Stack, Typography } from '@mui/material';
import TimelapseRoundedIcon from '@mui/icons-material/TimelapseRounded';
import { useNavigate } from 'react-router-dom';
import { LikesCard } from './LikesCard';
import { CommentsCard } from './CommentsCard';
import moment from 'moment';

export const PostDetail = ({ data }) => {

    const navigateTo = useNavigate();

    const userId = data.getSinglePost.user.id;

    return (
        <Box>
            <Stack direction={'column'} spacing={2}>
                <Card variant='outlined'>
                    <CardContent>
                        <Stack direction={'column'} spacing={2}>
                            <CardActionArea onClick={() => { navigateTo(`/users/${userId}`) }}>
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <Avatar variant='square' sx={{ bgcolor: 'primary.main' }}>
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