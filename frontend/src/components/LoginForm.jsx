import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Link, Stack, TextField } from "@mui/material";
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';

export const LoginForm = () => {

    const navigateTo = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handleUsernameChange = (event) => {
        setLoginData({
            ...loginData,
            username: event.target.value
        });
    };

    const handlePasswordChange = (event) => {
        setLoginData({
            ...loginData,
            password: event.target.value
        });
    };

    const handleLogin = () => {
        navigateTo('/');
    }

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField label="Username" value={loginData.username} onChange={handleUsernameChange} />
                        <TextField label="Password" value={loginData.password} onChange={handlePasswordChange} type='password' />
                        <Stack direction={'column'} spacing={2} alignItems={'flex-start'}>
                            <Button startIcon={<FingerprintRoundedIcon />} variant="contained" disableElevation onClick={handleLogin}>
                                Login
                            </Button>
                            <Link component={RouterLink} to='/register' variant="subtitle2">
                                Actually, I need to register!
                            </Link>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginForm