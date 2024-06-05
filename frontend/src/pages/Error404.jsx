// import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';

export function Error404() {
    return (
        <Box padding={4}>
            <Stack direction={'column'}>
                <Typography variant='h4' fontWeight={800}>
                    ERROR 404
                </Typography>
                <Typography>
                    PAGE NOT FOUND
                </Typography>
            </Stack>
        </Box>
    )
}

export default Error404