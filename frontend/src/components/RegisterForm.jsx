// import React from 'react';
import { Box, Button, Card, CardContent, Link, Stack, TextField } from "@mui/material";
import PersonAddRoundedIcon from '@mui/icons-material/PersonAddRounded';

export const RegisterForm = () => {
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField label="Username" />
                        <TextField label="Email" />
                        <TextField label="Password" />
                        <TextField label="Confirm password" />
                        <Stack direction={'column'} spacing={2} alignItems={'flex-start'}>
                            <Button startIcon={<PersonAddRoundedIcon />} variant="contained" disableElevation>Register</Button>
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