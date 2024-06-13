import { useState, useEffect } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Alert, Box, Button, Card, CardContent, Link, Stack, TextField } from "@mui/material";
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';
import { gql, useMutation } from '@apollo/client';

const LOGIN_USER = gql`
    mutation LoginUser($loginInput: LoginInput) {
        loginUser(loginInput: $loginInput) {
            id
            username
            token
        }
    }
`;

export const LoginForm = () => {

    const navigateTo = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const [errorMessages, setErrorMessages] = useState(null);

    useEffect(() => {
    }, [errorMessages]);

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

    const [loginUserMutation, { data, error }] = useMutation(LOGIN_USER);

    const handleLogin = () => {
        loginUserMutation({
            variables: {
                "loginInput": {
                    "username": loginData.username,
                    "password": loginData.password
                }
            },
        });
        if (data) {
            setErrorMessages(null);
            navigateTo('/');
        } else if (error) {
            const errorData = error.graphQLErrors[0].extensions.errors;
            if (errorData.USERNAME) {
                setErrorMessages(errorData.USERNAME);
            } else if (errorData.PASSWORD) {
                setErrorMessages(errorData.PASSWORD);
            } else {
                setErrorMessages(errorData);
            }
        }
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <Alert severity='error' sx={errorMessages ? { display: 'inline-flex' } : { display: 'none' }}>
                            {errorMessages}
                        </Alert>
                        <TextField label="Username" value={loginData.username} onChange={handleUsernameChange} />
                        <TextField label="Password" value={loginData.password} onChange={handlePasswordChange} type='password' />
                        <Box>
                            <Button startIcon={<FingerprintRoundedIcon />} variant="contained" disableElevation onClick={handleLogin}>
                                Login
                            </Button>
                        </Box>
                        <Link component={RouterLink} to='/register' variant="subtitle2">
                            Actually, I need to register!
                        </Link>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default LoginForm