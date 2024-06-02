// import * as React from 'react';
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

export function Header() {
    return (
        <AppBar position='static' color='default'>
            <Toolbar>
                <IconButton href='/' size='large' edge='start' color='inherit'>
                    <ElectricBoltIcon />
                </IconButton>
                <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
                    GQL
                </Typography>
                <Stack direction="row" spacing={2}>
                    <Button href='/' color='primary' variant='contained'>Home</Button>
                    <Button href='/profile' color='primary' variant='contained'>Profile</Button>
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Header