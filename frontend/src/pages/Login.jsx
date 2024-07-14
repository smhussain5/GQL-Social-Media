import { Box, Stack, Typography } from '@mui/material';
import { LoginForm } from '../components/LoginForm';

export function Login() {
    return (
        <Box padding={4} sx={{ bgcolor: 'background.default', height: '100vh' }} >
            <Stack direction={'column'} spacing={2}>
                <Typography variant='h4' fontWeight={800} sx={{ color: 'text.primary' }}>
                    LOGIN
                </Typography>
                <LoginForm />
            </Stack>
        </Box>
    )
}

export default Login