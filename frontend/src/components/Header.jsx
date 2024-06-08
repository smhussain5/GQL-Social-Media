// TODO: Make Header component responsive, with menu open/close

import { useState } from 'react';
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';

const pages = ['HOME', 'PROFILE', 'LOGIN', 'REGISTER'];

export function Header() {
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (
        <AppBar position='static' elevation={0}>
            <Toolbar>
                <IconButton href='/' size='large' edge='start' color='inherit'>
                    <AdjustRoundedIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1 }}>
                    GraphQL
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button href='/' variant='contained' disableElevation>Home</Button>
                    <Button href='/users' variant='contained' disableElevation>Profile</Button>
                    <Button href='/login' variant='contained' disableElevation>Login</Button>
                    <Button href='/register' variant='contained' disableElevation>Register</Button>
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Header