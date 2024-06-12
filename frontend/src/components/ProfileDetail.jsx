import { Avatar, Box, ToggleButton, ToggleButtonGroup, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';
import { ProfileList } from './ProfileList';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import { useState } from 'react';
import moment from 'moment';

export const ProfileDetail = ({ data }) => {

    const profilePosts = data.getSingleUser.posts;
    const profileLikedPosts = data.getSingleUser.likedPosts;

    const [toggleOption, setToggleOption] = useState({
        "VALUE": "POSTS",
        "FUNCTION": profilePosts
    });

    const handleToggle = (event) => {
        if (event.target.value === "POSTS") {
            setToggleOption({
                "VALUE": "POSTS",
                "FUNCTION": profilePosts
            });
        } else {
            setToggleOption({
                "VALUE": "LIKES",
                "FUNCTION": profileLikedPosts
            });
        }
    };

    return (
        <Box>
            <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Stack direction={'column'} spacing={2} >
                                <Stack direction={'row'} spacing={2} alignItems={'center'}>
                                    <Avatar variant='square'>
                                        {data.getSingleUser.username[0]}
                                    </Avatar>
                                    <Typography fontWeight={'bold'}>
                                        {data.getSingleUser.username}
                                    </Typography>
                                </Stack>
                                <ToggleButtonGroup aria-label="Profile button group" fullWidth value={toggleOption.VALUE} onChange={handleToggle}>
                                    <ToggleButton value="POSTS">Posts</ToggleButton>
                                    <ToggleButton value="LIKES">Likes</ToggleButton>
                                </ToggleButtonGroup>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <NotesRoundedIcon fontSize='medium' color='success' />
                                    <Typography>
                                        {data.getSingleUser.posts.length} post(s)
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <StarRateRoundedIcon fontSize='medium' color='warning' />
                                    <Typography>
                                        {data.getSingleUser.likedPosts.length} like(s)
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <GroupsRoundedIcon fontSize='medium' color='primary' />
                                    <Typography>
                                        {data.getSingleUser.following.length} following
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <FavoriteRoundedIcon fontSize='medium' color='error' />
                                    <Typography>
                                        {data.getSingleUser.followers.length} follower(s)
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <CakeRoundedIcon fontSize='medium' color='info' />
                                    <Typography>
                                        Joined on {moment(Number(data.getSingleUser.createdAt)).format('MMMM Do YYYY')}
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography>
                                {toggleOption.FUNCTION.map((toggleOptionItem) => (
                                    <ProfileList key={toggleOptionItem.id} data={toggleOptionItem} />
                                ))}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Typography>
                        {JSON.stringify(toggleOption.FUNCTION)}
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ProfileDetail