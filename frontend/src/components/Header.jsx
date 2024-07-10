// TODO: Make Header component responsive, with menu open/close
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ThemeContext from "../context/ThemeContext.js";
import { customThemeBase } from "../theme/customThemeBase.js"
import { customThemeDark } from '../theme/customThemeDark.js';
import { NavLink, useNavigate } from 'react-router-dom'
import { AppBar, Button, IconButton, Stack, Switch, Toolbar, Typography } from '@mui/material';
import AdjustRoundedIcon from '@mui/icons-material/AdjustRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';

// const pages = ['HOME', 'PROFILE', 'LOGIN', 'REGISTER'];

export const Header = () => {

    const { setThemeContext } = useContext(ThemeContext);

    const { userContext, setUserContext } = useContext(AuthContext);

    // const [anchorElNav, setAnchorElNav] = useState(null);

    // const handleOpenNavMenu = (event) => {
    //     setAnchorElNav(event.currentTarget);
    // };

    // const handleCloseNavMenu = () => {
    //     setAnchorElNav(null);
    // };

    const navigateTo = useNavigate();

    const handleLogout = () => {
        setUserContext({
            id: "",
            username: "",
            jwtToken: ""
        });
        localStorage.removeItem("jwtToken");
        navigateTo("/login");
    }

    const handleThemeChange = (event) => {
        if (event.target.checked) {
            setThemeContext(customThemeDark);
        } else {
            setThemeContext(customThemeBase);
        }
    };

    return (
        <AppBar position='static'>
            <Toolbar sx={{ justifyContent: 'flex-end' }}>
                <Stack direction="row" spacing={2}>
                    {userContext.jwtToken ?
                        <>
                            <Button variant='text' color='inherit' component={NavLink} to="/">Home</Button>
                            <Button variant='text' color='inherit' component={NavLink} to={`/users/${userContext.id}`}>Profile</Button>
                            <Button variant='text' color='inherit' onClick={handleLogout}>Logout</Button>
                        </>
                        :
                        <>
                            <Button variant='text' color='inherit' component={NavLink} to="/login">Login</Button>
                            <Button variant='text' color='inherit' component={NavLink} to="/register">Register</Button>
                        </>
                    }
                    <Switch onChange={handleThemeChange} />
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Header