import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Avatar, Box, Button, Chip, ToggleButton, ToggleButtonGroup, Card, CardActionArea, CardContent, Grid, Stack, Typography } from '@mui/material';
import { ProfileList } from './ProfileList';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { gql, useMutation } from '@apollo/client';
import { GET_USER_BY_ID } from '../pages/Profile';
import { useState } from 'react';
import moment from 'moment';

const FOLLOW_USER = gql`
    mutation FollowUser($userId: ID!) {
        followUser(userId: $userId)
    }
`;

export const ProfileDetail = ({ data }) => {

    const { userContext } = useContext(AuthContext);

    const profilePosts = data.getSingleUser.posts;
    const profileLikedPosts = data.getSingleUser.likedPosts;

    const profileUsername = data.getSingleUser.username;
    const postsCount = data.getSingleUser.posts.length;
    const likesCount = data.getSingleUser.likedPosts.length;
    const followingCount = data.getSingleUser.following.length;
    const followersCount = data.getSingleUser.followers.length;
    const joinDate = data.getSingleUser.createdAt;

    const isMyProfile = data.getSingleUser.username !== userContext.username;
    const isFollowingThisUser = data.getSingleUser.followers.find((obj) => obj.username === userContext.username);
    const isFollowedByThisUser = data.getSingleUser.following.find((obj) => obj.username === userContext.username);
    const isMutualFollowing = isFollowingThisUser && isFollowedByThisUser;

    const [followUserMutation, { error }] = useMutation(FOLLOW_USER, {
        refetchQueries: [
            GET_USER_BY_ID
        ],
    })

    const handleFollowUser = async () => {
        try {
            await followUserMutation({
                variables: {
                    "userId": data.getSingleUser.id
                }
            });
        } catch (error) {
            alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
        }
    }

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
                                    <Avatar variant='circular'>
                                        {profileUsername[0]}
                                    </Avatar>
                                    <Typography fontWeight={'bold'}>
                                        {profileUsername}
                                    </Typography>
                                    {
                                        isMutualFollowing &&
                                        <Chip label='Mutuals!' icon={<HandshakeRoundedIcon />} color='info' variant='outlined' />
                                    }
                                </Stack>
                                <ToggleButtonGroup aria-label="Profile button group" fullWidth value={toggleOption.VALUE} onChange={handleToggle}>
                                    <ToggleButton value="POSTS">Posts</ToggleButton>
                                    <ToggleButton value="LIKES">Likes</ToggleButton>
                                </ToggleButtonGroup>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <NotesRoundedIcon fontSize='medium' color='success' />
                                    <Typography>
                                        {postsCount} {postsCount === 1 ? 'post' : 'posts'}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <StarRoundedIcon fontSize='medium' color='warning' />
                                    <Typography>
                                        {likesCount} {likesCount === 1 ? 'like' : 'likes'}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <GroupsRoundedIcon fontSize='medium' color='primary' />
                                    <Typography>
                                        {followingCount} following
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <FavoriteRoundedIcon fontSize='medium' color='error' />
                                    <Typography>
                                        {followersCount} {followersCount === 1 ? 'follower' : 'followers'}
                                    </Typography>
                                </Stack>
                                <Stack direction={'row'} spacing={2} alignItems={'center'} >
                                    <CakeRoundedIcon fontSize='medium' color='info' />
                                    <Typography>
                                        Joined on {moment(Number(joinDate)).format('MMMM Do YYYY')}
                                    </Typography>
                                </Stack>
                                {
                                    isMyProfile &&
                                    <Button startIcon={isFollowingThisUser ? <RemoveRoundedIcon /> : <AddRoundedIcon />} variant={isFollowingThisUser ? 'outlined' : 'contained'} color={isFollowingThisUser ? 'error' : 'primary'} disableElevation onClick={handleFollowUser}>
                                        {isFollowingThisUser ? 'Unfollow' : 'Follow'}
                                    </Button>
                                }
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} md={9}>
                    <Card variant='outlined'>
                        <CardContent>
                            <Typography>
                                {toggleOption.FUNCTION.map((toggleOptionItem) => (
                                    <ProfileList key={toggleOptionItem.id} data={toggleOptionItem} postUser={data.getSingleUser.username} />
                                ))}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Typography>
                        {JSON.stringify(toggleOption.FUNCTION)}
                    </Typography>
                </Grid>
            </Grid>
        </Box >
    )
}

export default ProfileDetail