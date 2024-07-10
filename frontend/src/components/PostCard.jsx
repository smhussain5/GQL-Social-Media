import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Avatar, Box, Card, CardContent, CardActionArea, Grid, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

export const PostCard = ({ data }) => {

    const navigateTo = useNavigate();

    const { userContext } = useContext(AuthContext);

    const { id, user, body, createdAt } = data;

    return (
        <Box>
            <Card variant='outlined'>
                <CardActionArea onClick={() => { navigateTo(`/posts/${id}`) }}>
                    <CardContent>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item xs={11}>
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <Avatar variant='circular' sx={{ bgcolor: user.username === userContext.username ? 'warning.main' : 'primary.main' }}>
                                        {user.username[0]}
                                    </Avatar>
                                    <Typography variant='body1'>
                                        {body}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={1} >
                                <Typography variant='caption'>
                                    {moment(Number(createdAt)).fromNow()}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Stack direction={'row'} alignItems='center'>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box >
    )
}

export default PostCard