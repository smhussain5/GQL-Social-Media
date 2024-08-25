// TODO: Make Header component responsive, with menu open/close
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import ThemeContext from "../context/ThemeContext.js";
import { customThemeBase } from "../theme/customThemeBase.js"
import { customThemeDark } from '../theme/customThemeDark.js';
import { NavLink, useNavigate } from 'react-router-dom'
import { AppBar, Button, Stack, Switch, Toolbar } from '@mui/material';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';

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
                            <Button variant='text' color='inherit' component={NavLink} to="/" startIcon={<HomeRoundedIcon />}>Home</Button>
                            <Button variant='text' color='inherit' component={NavLink} to={`/users/${userContext.id}`} startIcon={<AccountBoxRoundedIcon />}>Profile</Button>
                            <Button variant='text' color='inherit' component={NavLink} to={"/search"} startIcon={<SearchRoundedIcon />}>Search</Button>
                            <Button variant='text' color='inherit' onClick={handleLogout} startIcon={<LogoutRoundedIcon />}>Logout</Button>
                        </>
                        :
                        <>
                            <Button variant='text' color='inherit' component={NavLink} to="/login" startIcon={<LoginRoundedIcon />}>Login</Button>
                            <Button variant='text' color='inherit' component={NavLink} to="/register" startIcon={<HowToRegRoundedIcon />}>Register</Button>
                        </>
                    }
                    <Switch onChange={handleThemeChange} />
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Header