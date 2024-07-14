import { useForm } from "react-hook-form";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Card, CardContent, Link, Stack, TextField } from "@mui/material";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';
import { useMutation } from '@apollo/client';
import { REGISTER_USER } from '../graphql/mutations/registerUserMutation';

export const RegisterForm = () => {

    const navigateTo = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues,
        getFieldState
    } = useForm();

    const [registerUserMutation, { data, error }] = useMutation(REGISTER_USER);

    const onSubmit = async (formData) => {
        try {
            const { data } = await registerUserMutation({
                variables: {
                    "registrationInput": {
                        "username": formData.username,
                        "password": formData.password1,
                        "confirmPassword": formData.password2
                    }
                }
            });
            navigateTo("/login");
        } catch (error) {
            alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Card variant="outlined" >
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField
                            label="Username"
                            {...register("username", {
                                required: "Enter username!",
                                minLength: {
                                    value: 5,
                                    message: "Username must be between 5 and 50 characters"
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Username must be between 5 and 50 characters"
                                },
                            })}
                            helperText={errors.username?.message}
                        />
                        <TextField
                            type="password"
                            label="Password"
                            {...register("password1", {
                                required: "Enter password",
                                minLength: {
                                    value: 5,
                                    message: "Password must be at least 5 characters"
                                }
                            })}
                            helperText={errors.password1?.message}
                        />
                        <TextField
                            type="password"
                            label="Confirm password"
                            {...register("password2", {
                                required: "Enter password",
                                minLength: {
                                    value: 5,
                                    message: "Password must be at least 5 characters"
                                },
                                validate: {
                                    passwordsDoNotMatch: () => {
                                        if (getFieldState("password1").isDirty || getFieldState("password2").isDirty) {
                                            return (
                                                getValues("password1") === getValues("password2") || "Passwords do not match"
                                            );
                                        }
                                    }
                                }
                            })}
                            helperText={errors.password2?.message}
                        />
                        <Box>
                            <Button type="submit" startIcon={<PersonAddRoundedIcon />} variant="contained" disableElevation>
                                Register
                            </Button>
                        </Box>
                        <Link component={RouterLink} to='/login' variant="subtitle2">
                            Wait, I already have an account!
                        </Link>
                    </Stack>
                </CardContent>
            </Card >
        </Box >
    )
}

export default RegisterForm