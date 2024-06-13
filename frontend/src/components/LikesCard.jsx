import React from 'react';
import { Avatar, AvatarGroup, Box, Stack, Typography } from '@mui/material';

export const LikesCard = ({ data }) => {

    const numberOfLikes = data.getSinglePost.likedBy.length;

    return (
        numberOfLikes ?
            <Box>
                <Stack direction={'row'}>
                    <AvatarGroup total={numberOfLikes}>
                        <Avatar variant='circular'>
                            {data.getSinglePost.likedBy[0].username[0]}
                        </Avatar>
                    </AvatarGroup>
                </Stack>
            </Box>
            :
            <Box>
                <Typography>
                    No likes yet!
                </Typography>
            </Box>
    )
}

export default LikesCard