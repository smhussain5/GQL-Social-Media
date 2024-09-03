import { createTheme } from '@mui/material';

export const customThemeBase = createTheme({
    palette: {
        mode: 'light',
        // ATLASSIAN LIME 400
        primary: {
            main: '#94C748'
        },
        // ATLASSIAN MAGENTA 400
        secondary: {
            main: '#E774BB'
        },
        // ATLASSIAN RED 400
        error: {
            main: '#F87168'
        },
        // ATLASSIAN YELLOW 400
        warning: {
            main: '#E2B203'
        },
        // ATLASSIAN TEAL 400
        info: {
            main: '#6CC3E0'
        },
        // ATLASSIAN GREEN 400
        success: {
            main: '#4BCE97'
        },
        background: {
            // ATLASSIAN NEUTRAL 100
            default: '#F7F8F9',
            // ATLASSIAN NEUTRAL 200
            paper: '#F1F2F4'
        }
    },
    typography: {
        fontFamily: 'IBM Plex Sans'
    },
    components: {
        MuiCard: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 0,
                }
            }
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: '#F87168'
                }
            }
        }
    }
});