import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Avatar, AvatarGroup, Box, Button, Card, CardContent, CardHeader, CardActionArea, Stack, Typography, List, ListItem, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
import moment from 'moment';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import { GET_POST_BY_ID } from "../pages/Post";
import { gql, useMutation } from '@apollo/client';

const DELETE_REPLY = gql`
    mutation DeleteReply($replyId: ID!) {
        deleteReply(replyId: $replyId)
    }
`;

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
        numberOfComments ?
            <Box>
                <Card variant='outlined'>
                    <CardContent>
                        <List>
                            {data.getSinglePost.replies.map((comment) => {
                                return (
                                    <ListItem key={comment.id}>
                                        <ListItemAvatar>
                                            <Avatar variant='circular'>
                                                {comment.user.username[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={comment.body}
                                            secondary={moment(Number(comment.createdAt)).fromNow()}
                                        />
                                        {
                                            comment.user.username === userContext.username &&
                                            <Button color="error" onClick={() => { handleReplyDelete(comment) }}>
                                                <DeleteRoundedIcon />
                                            </Button>
                                        }
                                    </ListItem>
                                )
                            })}
                        </List>
                    </CardContent>
                </Card>
            </Box>
            :
            <Box>
                <Card variant='outlined'>
                    <CardContent>
                        <Typography>
                            No comments yet!
                        </Typography>
                    </CardContent>
                </Card>
            </Box>
    )
}

export default CommentsCard