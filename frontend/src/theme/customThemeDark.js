import { createTheme } from '@mui/material';

export const customThemeDark = createTheme({
    palette: {
        mode: 'dark',
        // ATLASSIAN LIME 200
        primary: {
            main: '#D3F1A7'
        },
        // ATLASSIAN MAGENTA 200
        secondary: {
            main: '#FDD0EC'
        },
        // ATLASSIAN RED 200
        error: {
            main: '#FFD5D2'
        },
        // ATLASSIAN YELLOW 200
        warning: {
            main: '#F8E6A0'
        },
        // ATLASSIAN TEAL 200
        info: {
            main: '#C6EDFB'
        },
        // ATLASSIAN GREEN 200
        success: {
            main: '#BAF3DB'
        },
        background: {
            // ATLASSIAN DARK NEUTRAL 100
            default: '#1D2125',
            // ATLASSIAN DARK NEUTRAL 200
            paper: '#22272B'
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
                    color: '#FFD5D2'
                }
            }
        }
    }
});