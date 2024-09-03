// TODO: Make Header component responsive, with menu open/close
import { useContext, useState } from 'react';
import AuthContext from '../context/AuthContext';
import ThemeContext from "../context/ThemeContext.js";
import { customThemeBase } from "../theme/customThemeBase.js"
import { customThemeDark } from '../theme/customThemeDark.js';
import {
    NavLink,
    useNavigate
} from 'react-router-dom'
import {
    AppBar,
    Box,
    Button,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Stack,
    Switch,
    Toolbar,
    Typography
} from '@mui/material';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import LoginRoundedIcon from '@mui/icons-material/LoginRounded';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';

export const Header = () => {

    const { setThemeContext } = useContext(ThemeContext);

    const { userContext, setUserContext } = useContext(AuthContext);

    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const openNav = Boolean(anchorElNav);

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

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
                    <Box sx={{ display: { xs: 'none', lg: 'flex' } }}>
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
                        <Switch onChange={handleThemeChange} size={"medium"} />
                    </Box>
                    <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                        <IconButton onClick={handleOpenNavMenu}>
                            <MenuRoundedIcon color={"inherit"} />
                        </IconButton>
                        <Menu
                            sx={{ display: { xs: 'flex', lg: 'none' } }}
                            anchorEl={anchorElNav}
                            open={openNav}
                            onClose={handleCloseNavMenu}
                        >
                            {userContext.jwtToken ?
                                <>
                                    <MenuItem component={NavLink} to="/">
                                        <Stack direction={'row'} spacing={2}>
                                            <HomeRoundedIcon />
                                            <Typography textTransform={'uppercase'}>
                                                Home
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem component={NavLink} to={`/users/${userContext.id}`}>
                                        <Stack direction={'row'} spacing={2}>
                                            <AccountBoxRoundedIcon />
                                            <Typography textTransform={'uppercase'}>
                                                Profile
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem component={NavLink} to="/search">
                                        <Stack direction={'row'} spacing={2}>
                                            <SearchRoundedIcon />
                                            <Typography textTransform={'uppercase'}>
                                                Search
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Stack direction={'row'} spacing={2}>
                                            <LogoutRoundedIcon />
                                            <Typography textTransform={'uppercase'}>
                                                Logout
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                </>
                                :
                                <>
                                    <MenuItem component={NavLink} to="/login">
                                        <Stack direction={'row'} spacing={2}>
                                            <LoginRoundedIcon />
                                            <Typography textTransform={'uppercase'}>
                                                Login
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                    <MenuItem component={NavLink} to="/register">
                                        <Stack direction={'row'} spacing={2}>
                                            <HowToRegRoundedIcon />
                                            <Typography textTransform={'uppercase'}>
                                                Register
                                            </Typography>
                                        </Stack>
                                    </MenuItem>
                                </>
                            }
                            <Divider />
                            <Switch onChange={handleThemeChange} size={"medium"} />
                        </Menu>
                    </Box>
                </Stack>
            </Toolbar>
        </AppBar >
    );
}

export default Header