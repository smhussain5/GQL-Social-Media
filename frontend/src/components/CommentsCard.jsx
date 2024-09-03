import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Link as RouterLink } from "react-router-dom";
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Grid,
    Stack,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar
} from '@mui/material';
import moment from 'moment';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import { GET_POST_BY_ID } from "../graphql/queries/getPostByIdQuery";
import { DELETE_REPLY } from "../graphql/mutations/deleteReplyMutation";
import { useMutation } from '@apollo/client';

export const CommentsCard = ({ data }) => {

    const numberOfComments = data.getSinglePost.replies.length;

    const { userContext } = useContext(AuthContext);

    const [deleteReplyMutation, { error }] = useMutation(DELETE_REPLY, {
        refetchQueries: [
            GET_POST_BY_ID
        ],
    });

    const handleReplyDelete = async (comment) => {
        if (confirm("Are you sure? This action cannot be undone!")) {
            try {
                await deleteReplyMutation({
                    variables: {
                        "replyId": comment.id,
                    }
                })
            } catch (error) {
                alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
            }
        }
        else {
            return;
        }
    }

    return (
        numberOfComments !== 0 &&
        <Box>
            <Card variant='outlined'>
                <CardContent>
                    <List>
                        <Grid container alignItems={"center"} justifyContent={"end"}>
                            {data.getSinglePost.replies.map((comment) => {
                                return (
                                    <ListItem key={comment.id}>
                                        <Grid item xs={7} md={10} lg={11}>
                                            <Stack direction={"row"}>
                                                <ListItemAvatar>
                                                    <Avatar variant='circular'>
                                                        {comment.user.username[0]}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={comment.body}
                                                    secondary={moment(Number(comment.createdAt)).fromNow()}
                                                />
                                            </Stack>
                                        </Grid>
                                        <Grid item xs={5} md={2} lg={1}>
                                            <Stack direction={"row"}>
                                                {
                                                    comment.user.username === userContext.username &&
                                                    <Button color="error" onClick={() => { handleReplyDelete(comment) }} size={"small"}>
                                                        <DeleteRoundedIcon />
                                                    </Button>
                                                }
                                                <Button color="primary" component={RouterLink} to={`/users/${comment.user.id}`} size={"small"}>
                                                    <ForwardRoundedIcon color={"secondary"} />
                                                </Button>
                                            </Stack>
                                        </Grid>
                                    </ListItem>
                                )
                            })}
                        </Grid>
                    </List>
                </CardContent>
            </Card >
        </Box >
    )
}

export default CommentsCard