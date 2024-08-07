import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";
import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    Card,
    CardActionArea,
    CardContent,
    Grid,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Tab,
    Typography
} from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab'
import { Link as RouterLink } from 'react-router-dom';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER } from "../graphql/mutations/followUserMutation";
import { GET_USER_BY_ID } from "../graphql/queries/getUserByIdQuery";
import moment from 'moment';

export const ProfileDetail = ({ data }) => {

    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
                    <TabContext value={value}>
                        <Box>
                            <TabList onChange={handleChange}>
                                <Tab label="Posts" value='1' />
                                <Tab label="Likes" value='2' />
                            </TabList>
                        </Box>
                        <TabPanel value='1' >
                            <List >
                                {
                                    profilePosts.length !== 0 ?
                                        profilePosts.map((post) => {
                                            return (
                                                <ListItem key={post.id}>
                                                    <ListItemAvatar>
                                                        <Avatar variant='circle'>
                                                            {post.user.username[0]}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={post.body}
                                                        secondary={moment(Number(post.createdAt)).fromNow()} />
                                                    <Button component={RouterLink} to={`/posts/${post.id}`} startIcon={<AccountBoxRoundedIcon />}>
                                                        Post
                                                    </Button>
                                                </ListItem>
                                            )
                                        })
                                        :
                                        <Alert severity="info">
                                            Nothing here...yet!
                                        </Alert>
                                }
                            </List>
                        </TabPanel>
                        <TabPanel value='2' >
                            <List >
                                {
                                    profileLikedPosts.length !== 0 ?
                                        profileLikedPosts.map((post) => {
                                            return (
                                                <ListItem key={post.id}>
                                                    <ListItemAvatar>
                                                        <Avatar variant='circle'>
                                                            {post.user.username[0]}
                                                        </Avatar>
                                                    </ListItemAvatar>
                                                    <ListItemText
                                                        primary={post.body}
                                                        secondary={moment(Number(post.createdAt)).fromNow()} />
                                                    <Button component={RouterLink} to={`/posts/${post.id}`} startIcon={<AccountBoxRoundedIcon />}>
                                                        Post
                                                    </Button>
                                                </ListItem>
                                            )
                                        })
                                        :
                                        <Alert severity="info">
                                            Nothing here...yet!
                                        </Alert>
                                }
                            </List>
                        </TabPanel>
                    </TabContext>
                </Grid>
            </Grid>
        </Box >
    )
}

export default ProfileDetail