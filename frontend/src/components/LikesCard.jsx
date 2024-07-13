import React from 'react';
import { Avatar, AvatarGroup, Box, Card, CardContent, Stack, Typography } from '@mui/material';

export const LikesCard = ({ data }) => {

    const numberOfLikes = data.getSinglePost.likedBy.length;

    return (
        numberOfLikes !== 0 &&
        <Box>
            <Card variant='outlined'>
                <CardContent>
                    <Stack direction={'row'}>
                        <AvatarGroup total={numberOfLikes}>
                            <Avatar variant='circular'>
                                {data.getSinglePost.likedBy[0].username[0]}
                            </Avatar>
                        </AvatarGroup>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LikesCard