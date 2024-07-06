// import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import RegisterForm from '../components/RegisterForm';

export function Register() {
    return (
        <Box padding={4} sx={{ bgcolor: 'background.default', height: '100vh' }} >
            <Stack direction={'column'} spacing={2}>
                <Typography variant='h4' fontWeight={800} sx={{ color: 'text.primary' }}>
                    REGISTER
                </Typography>
                <RegisterForm />
            </Stack>
        </Box>
    )
}

export default Register