import React from 'react';
import { Avatar, AvatarGroup, Box, Card, CardContent, CardHeader, CardActionArea, Stack, Typography, List, ListItem, ListItemText } from '@mui/material';
import moment from 'moment';

export const CommentsCard = ({ data }) => {

    const numberOfComments = data.getSinglePost.replies.length;

    return (
        numberOfComments ?
            <Box>
                <Card variant='outlined'>
                    <CardContent>
                        <List>
                            {data.getSinglePost.replies.map((comment) => {
                                return (
                                    <ListItem key={comment.id}>
                                        <ListItemText
                                            primary={comment.body}
                                            secondary={moment(Number(comment.createdAt)).fromNow()}
                                        />
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