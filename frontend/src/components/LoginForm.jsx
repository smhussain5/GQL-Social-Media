// import React from 'react'
import { Box, Button, Card, CardContent, Link, Stack, TextField } from "@mui/material";

export const LoginForm = () => {
    return (
        <Box>
            <Card variant="outlined">
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <TextField label="Username" />
                        <TextField label="Password" />
                        <Stack direction={'column'} spacing={2} alignItems={'flex-start'}>
                            <Button variant="contained" disableElevation>Login</Button>
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