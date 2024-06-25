// TODO: Make Header component responsive, with menu open/close
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { NavLink, useNavigate } from 'react-router-dom'
import { AppBar, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';

// const pages = ['HOME', 'PROFILE', 'LOGIN', 'REGISTER'];

export const Header = () => {

    const { user, setUser } = useContext(AuthContext);

    // const [anchorElNav, setAnchorElNav] = useState(null);

    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const navigateTo = useNavigate();

    const handleLogout = () => {
        setUser({
            id: "",
            username: "",
            jwtToken: ""
        });
        localStorage.removeItem("jwtToken");
        navigateTo("/login");
    }

    return (
        <AppBar position='static' elevation={0}>
            <Toolbar>
                <IconButton component={NavLink} to="/" size='large' edge='start' color='inherit'>
                    <AdjustRoundedIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 1 }}>
                    {user.username}
                </Typography>
                <Stack direction="row" spacing={2}>
                    {user.jwtToken ?
                        <>
                            <Button component={NavLink} to="/" variant='contained' disableElevation>Home</Button>
                            <Button component={NavLink} to={`/users/${user.id}`} variant='contained' disableElevation>Profile</Button>
                            <Button onClick={handleLogout} variant='contained' disableElevation>Logout</Button>
                        </>
                        :
                        <>
                            <Button component={NavLink} to="/login" variant='contained' disableElevation>Login</Button>
                            <Button component={NavLink} to="/register" variant='contained' disableElevation>Register</Button>
                        </>
                    }
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Header