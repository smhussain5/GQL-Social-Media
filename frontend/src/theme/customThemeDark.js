import { createTheme } from '@mui/material';

export const customThemeDark = createTheme({
    palette: {
        mode: 'dark',
        secondary: {
            main: '#D946EF'
        },
        error: {
            main: '#fca5a5'
        },
        warning: {
            main: '#fde047'
        },
        info: {
            main: '#7dd3fc'
        },
        success: {
            main: '#86efac'
        },
        background: {
            default: '#000',
        }
    },
    typography: {
        fontFamily: 'Roboto'
    },
    components: {
        MuiCardContent: {
            styleOverrides: {
                root: {
                    padding: 16,
                    '&:last-child': {
                        paddingBottom: 16,
                    },
                }
            }
        },
        MuiCard: {
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
        MuiToggleButton: {
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
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: '#fecdd3'
                }
            }
        },
    }
});