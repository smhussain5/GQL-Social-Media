import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import HandshakeRoundedIcon from '@mui/icons-material/HandshakeRounded';
import CakeRoundedIcon from '@mui/icons-material/CakeRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import RemoveCircleRoundedIcon from '@mui/icons-material/RemoveCircleRounded';
import { useMutation } from '@apollo/client';
import { FOLLOW_USER } from "../graphql/mutations/followUserMutation";
import { DELETE_USER } from "../graphql/mutations/deleteUser";
import { GET_USER_BY_ID } from "../graphql/queries/getUserByIdQuery";
import moment from 'moment';

export const ProfileDetail = ({ data }) => {

    const { userContext, setUserContext } = useContext(AuthContext);

    const navigateTo = useNavigate();

    const profilePosts = data.getSingleUser.posts;
    const profileLikedPosts = data.getSingleUser.likedPosts;
    const profileFollowing = data.getSingleUser.following;
    const profileFollowers = data.getSingleUser.followers;

    const profileUsername = data.getSingleUser.username;
    const postsCount = data.getSingleUser.posts.length;
    const likesCount = data.getSingleUser.likedPosts.length;
    const followingCount = data.getSingleUser.following.length;
    const followersCount = data.getSingleUser.followers.length;
    const joinDate = data.getSingleUser.createdAt;

    const isMyProfile = data.getSingleUser.username === userContext.username;
    const isFollowingThisUser = data.getSingleUser.followers.find((obj) => obj.username === userContext.username);
    const isFollowedByThisUser = data.getSingleUser.following.find((obj) => obj.username === userContext.username);
    const isMutualFollowing = isFollowingThisUser && isFollowedByThisUser;

    const [followUserMutation, { error: followUserError }] = useMutation(FOLLOW_USER, {
        refetchQueries: [
            GET_USER_BY_ID
        ],
    });

    const [deleteUserMutation, { error: deleteUserError }] = useMutation(DELETE_USER);

    const handleFollowUser = async () => {
        try {
            await followUserMutation({
                variables: {
                    "userId": data.getSingleUser.id
                }
            });
        } catch (followUserError) {
            alert(JSON.stringify(followUserError.graphQLErrors[0].extensions.errors, null, 2));
        }
    };

    const handleDeleteUser = async () => {
        if (confirm("Are you sure? This action cannot be undone!")) {
            if (confirm("Are you ABSOLUTELY sure? Again, this action CANNOT be undone!")) {
                try {
                    await deleteUserMutation({
                        variables: {
                            "userId": data.getSingleUser.id
                        }
                    });
                    setUserContext({
                        id: "",
                        username: "",
                        jwtToken: ""
                    });
                    localStorage.removeItem("jwtToken");
                    navigateTo("/login");
                } catch (deleteUserError) {
                    alert(JSON.stringify(deleteUserError.graphQLErrors[0].extensions.errors, null, 2));
                }
            } else {
                return;
            }
        } else {
            return;
        }
    }

    return (
        <Box>
            <Stack direction={"column"} spacing={2}>
                <Box>
                    <Card variant='outlined'>
                        <CardContent>
                            <Stack direction={'column'} spacing={2} >
                                <Stack direction={'row'} spacing={2} alignItems={'center'} justifyContent={"space-between"}>
                                    <Stack direction={"row"} spacing={2} alignItems={'center'} >
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
                                    {
                                        isMyProfile &&
                                        <Button>
                                            <RemoveCircleRoundedIcon color={"error"} onClick={isMyProfile ? handleDeleteUser : undefined} />
                                        </Button>
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
                                    !isMyProfile &&
                                    <Button startIcon={isFollowingThisUser ? <RemoveRoundedIcon /> : <AddRoundedIcon />} variant={isFollowingThisUser ? 'outlined' : 'contained'} color={isFollowingThisUser ? 'error' : 'primary'} disableElevation onClick={handleFollowUser}>
                                        {isFollowingThisUser ? 'Unfollow' : 'Follow'}
                                    </Button>
                                }
                            </Stack>
                        </CardContent>
                    </Card>
                </Box>
                <Box>
                    <Stack direction={"column"}>
                        <Accordion variant={"outlined"} defaultExpanded square>
                            <AccordionSummary expandIcon={<ArrowDropDownRoundedIcon />}>
                                <Stack direction={"row"} spacing={2}>
                                    <NotesRoundedIcon color={"success"} />
                                    <Typography>
                                        Posts
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
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
                                                        <Button component={RouterLink} to={`/posts/${post.id}`}>
                                                            <ForwardRoundedIcon color={"secondary"} />
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
                            </AccordionDetails>
                        </Accordion>
                        <Accordion variant={"outlined"} square>
                            <AccordionSummary expandIcon={<ArrowDropDownRoundedIcon />}>
                                <Stack direction={"row"} spacing={2}>
                                    <StarRoundedIcon color={"warning"} />
                                    <Typography>
                                        Likes
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
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
                                                        <Button component={RouterLink} to={`/posts/${post.id}`}>
                                                            <ForwardRoundedIcon color={"secondary"} />
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
                            </AccordionDetails>
                        </Accordion>
                        <Accordion variant={"outlined"} square>
                            <AccordionSummary expandIcon={<ArrowDropDownRoundedIcon />}>
                                <Stack direction={"row"} spacing={2}>
                                    <GroupsRoundedIcon color={"primary"} />
                                    <Typography>
                                        Following
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List >
                                    {
                                        profileFollowing.length !== 0 ?
                                            profileFollowing.map((following) => {
                                                return (
                                                    <ListItem key={following.id}>
                                                        <ListItemAvatar>
                                                            <Avatar variant='circle'>
                                                                {following.username[0]}
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={following.username} />
                                                        <Button component={RouterLink} to={`/users/${following.id}`}>
                                                            <ForwardRoundedIcon color={"secondary"} />
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
                            </AccordionDetails>
                        </Accordion>
                        <Accordion variant={"outlined"} square>
                            <AccordionSummary expandIcon={<ArrowDropDownRoundedIcon />}>
                                <Stack direction={"row"} spacing={2}>
                                    <FavoriteRoundedIcon color={"error"} />
                                    <Typography>
                                        Followers
                                    </Typography>
                                </Stack>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List >
                                    {
                                        profileFollowers.length !== 0 ?
                                            profileFollowers.map((follower) => {
                                                return (
                                                    <ListItem key={follower.id}>
                                                        <ListItemAvatar>
                                                            <Avatar variant='circle'>
                                                                {follower.username[0]}
                                                            </Avatar>
                                                        </ListItemAvatar>
                                                        <ListItemText
                                                            primary={follower.username} />
                                                        <Button component={RouterLink} to={`/users/${follower.id}`}>
                                                            <ForwardRoundedIcon color={"secondary"} />
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
                            </AccordionDetails>
                        </Accordion>
                    </Stack>
                </Box>
            </Stack>
        </Box >
    )
}

export default ProfileDetail