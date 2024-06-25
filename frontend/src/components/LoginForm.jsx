import { useContext } from "react";
import { useForm } from "react-hook-form";
import AuthContext from "../context/AuthContext";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { Alert, Box, Button, Card, CardContent, Link, Stack, TextField, Typography } from "@mui/material";
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

    const { setUser } = useContext(AuthContext);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loginUserMutation, { data, error }] = useMutation(LOGIN_USER);

    const onSubmit = async (formData) => {
        try {
            const { data } = await loginUserMutation({
                variables: {
                    "loginInput": {
                        "username": formData.username,
                        "password": formData.password
                    }
                }
            });
            setUser({
                id: data.loginUser.id,
                username: data.loginUser.username,
                jwtToken: data.loginUser.token,
            });
            localStorage.setItem("jwtToken", data.loginUser.token);
            navigateTo("/");
        } catch (error) {
            alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField
                            label="Username"
                            {...register("username", {
                                required: "Enter username"
                            })}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            label="Password"
                            {...register("password", {
                                required: "Enter password"
                            })}
                            helperText={errors.password?.message}
                            type='password' />
                        <Box>
                            <Button type="submit" startIcon={<FingerprintRoundedIcon />} variant="contained" disableElevation>
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