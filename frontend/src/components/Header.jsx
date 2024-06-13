// TODO: Make Header component responsive, with menu open/close

import { useState } from 'react';
import { NavLink } from 'react-router-dom'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';

const pages = ['HOME', 'PROFILE', 'LOGIN', 'REGISTER'];

export const Header = () => {

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
                <IconButton component={NavLink} to="/" size='large' edge='start' color='inherit'>
                    <AdjustRoundedIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1 }}>
                    GraphQL
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button component={NavLink} to="/" variant='contained' disableElevation>Home</Button>
                    <Button component={NavLink} to="/profile" variant='contained' disableElevation>Profile</Button>
                    <Button component={NavLink} to="/login" variant='contained' disableElevation>Login</Button>
                    <Button component={NavLink} to="/register" variant='contained' disableElevation>Register</Button>
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Header