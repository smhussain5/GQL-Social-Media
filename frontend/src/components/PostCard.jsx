import { Avatar, Box, Card, CardContent, CardActionArea, Grid, Stack, Typography } from '@mui/material';

export const PostCard = ({ data }) => {
    const { id, user, body, createdAt } = data

    return (
        <Box>
            <Card variant='outlined'>
                <CardActionArea href={`/posts/${id}`}>
                    <CardContent>
                        <Grid container alignItems='center' spacing={2}>
                            <Grid item xs={11}>
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <Avatar variant='rounded' sx={{ bgcolor: 'primary.main' }}>
                                        {user.username[0]}
                                    </Avatar>
                                    <Typography variant='body1'>
                                        {body}
                                    </Typography>
                                </Stack>
                            </Grid>
                            <Grid item xs={1}>
                                <Typography variant='caption'>
                                    {createdAt}
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