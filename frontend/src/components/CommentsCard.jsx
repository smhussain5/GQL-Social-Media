import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { Avatar, AvatarGroup, Box, Button, Card, CardContent, CardHeader, CardActionArea, Stack, Typography, List, ListItem, ListItemText, ListItemAvatar, ListItemButton } from '@mui/material';
import moment from 'moment';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export const CommentsCard = ({ data }) => {

    const numberOfComments = data.getSinglePost.replies.length;

    const { userContext } = useContext(AuthContext);

    return (
        numberOfComments ?
            <Box>
                <Card variant='outlined'>
                    <CardContent>
                        <List>
                            {data.getSinglePost.replies.map((comment) => {
                                return (
                                    <ListItem key={comment.user.id}>
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
                                            <Button onClick={() => alert("REPLY DELETED")}>
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