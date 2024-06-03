// import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export function Post() {
    return (
        <Box padding={4}>
            <Stack direction={'column'}>
                <Typography variant='h4' fontWeight={800}>
                    POST
                </Typography>
                <Typography>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo officiis delectus reprehenderit nihil illo? Corrupti id cum quis laudantium dolorum debitis est cumque tempore itaque accusantium. Fugiat minus fuga atque neque impedit commodi. Accusamus unde blanditiis ipsum minus quibusdam beatae! Quae sint culpa quasi ea vitae quos consequuntur consectetur sunt.
                </Typography>
            </Stack>
        </Box>
    )
}

export default Post