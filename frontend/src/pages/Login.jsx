// import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { LoginForm } from '../components/LoginForm';

export function Login() {
    return (
        <Box padding={4}>
            <Stack direction={'column'} spacing={2}>
                <Typography variant='h4' fontWeight={800}>
                    LOGIN
                </Typography>
                <LoginForm />
            </Stack>
        </Box>
    )
}

export default Login