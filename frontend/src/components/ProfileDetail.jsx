import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import CakeOutlinedIcon from '@mui/icons-material/CakeOutlined';
import StarOutlineOutlinedIcon from '@mui/icons-material/StarOutlineOutlined';
import NotesOutlinedIcon from '@mui/icons-material/NotesOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
// import React from 'react'

export const ProfileDetail = ({ data }) => {
    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Stack direction={'column'} spacing={2} >
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <Avatar variant='rounded'>
                                        {data.getSingleUser.username[0]}
                                    </Avatar>
                                    <Typography>
                                        {data.getSingleUser.username}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <NotesOutlinedIcon fontSize='small' color='success' />
                                    <Typography>
                                        {data.getSingleUser.posts.length} posts
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <StarOutlineOutlinedIcon fontSize='small' color='warning' />
                                    <Typography>
                                        {data.getSingleUser.likedPosts.length} likes
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <GroupsOutlinedIcon fontSize='small' color='primary' />
                                    <Typography>
                                        {data.getSingleUser.following.length} following
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <FavoriteBorderOutlinedIcon fontSize='small' color='error' />
                                    <Typography>
                                        {data.getSingleUser.followers.length} follower(s)
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <CakeOutlinedIcon fontSize='small' color='info' />
                                    <Typography>
                                        Joined on {data.getSingleUser.createdAt}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography fontWeight={'bold'}>
                                POSTS
                            </Typography>
                            <Typography>
                                {JSON.stringify(data.getSingleUser.posts)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileDetail