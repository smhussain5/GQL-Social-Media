import { useState } from 'react';
import { Box, Button, Card, CardContent, Link, Stack, TextField } from "@mui/material";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

export const RegisterForm = () => {

    const [registrationData, setRegistrationData] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });

    const handleUsernameChange = (event) => {
        setRegistrationData({
            ...registrationData,
            username: event.target.value
        });
    };

    const handlePasswordChange = (event) => {
        setRegistrationData({
            ...registrationData,
            password: event.target.value
        });
    };


    const handleConfirmPasswordChange = (event) => {
        setRegistrationData({
            ...registrationData,
            confirmPassword: event.target.value
        });
    };

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField label="Username" value={registrationData.username} onChange={handleUsernameChange} />
                        <TextField label="Password" value={registrationData.password} onChange={handlePasswordChange} type="password" />
                        <TextField label="Confirm password" value={registrationData.confirmPassword} onChange={handleConfirmPasswordChange} type="password" />
                        <Stack direction={'column'} spacing={2} alignItems={'flex-start'}>
                            <Button startIcon={<PersonAddRoundedIcon />} variant="contained" disableElevation onClick={() => { alert(JSON.stringify(registrationData)) }}>
                                Register
                            </Button>
                            <Link href="/login" variant="subtitle2">
                                Wait, I already have an account!
                            </Link>
                        </Stack>
                    </Stack>
                </CardContent>
            </Card>
        </Box>
    )
}

export default RegisterForm