import { useState } from 'react'
import { Box, Button, Card, CardContent, Link, Stack, TextField } from "@mui/material";
import FingerprintRoundedIcon from '@mui/icons-material/FingerprintRounded';

export const LoginForm = () => {

    const [loginUsername, setLoginUsername] = useState(null);
    const [loginPassword, setLoginPassword] = useState(null);

    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField label="Username" value={loginUsername} onChange={(event) => { setLoginUsername(event.target.value) }} />
                        <TextField label="Password" value={loginPassword} onChange={(event) => { setLoginPassword(event.target.value) }} type='password' />
                        <Stack direction={'column'} spacing={2} alignItems={'flex-start'}>
                            <Button startIcon={<FingerprintRoundedIcon />} variant="contained" disableElevation onClick={() => { alert([loginUsername, loginPassword]) }}>
                                Login
                            </Button>
                            <Link href="/register" variant="subtitle2">
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