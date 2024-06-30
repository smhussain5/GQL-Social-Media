import React from 'react';
import { Avatar, AvatarGroup, Box, Card, CardContent, CardActionArea, Grid, Stack, Typography } from '@mui/material';

export const CommentsCard = ({ data }) => {

    const numberOfComments = data.getSinglePost.replies.length;

    return (
        numberOfComments ?
            <Box>
                <Stack direction={'row'}>
                    <Typography>
                        COMMENTS HERE
                    </Typography>
                </Stack>
            </Box>
            :
            <Box>
                <Typography>
                    No comments yet!
                </Typography>
            </Box>
    )
}

export default CommentsCard