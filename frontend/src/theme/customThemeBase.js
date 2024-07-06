import { createTheme } from '@mui/material';

export const customThemeBase = createTheme({
    palette: {
        mode: 'light',
        secondary: {
            main: '#D946EF'
        },
        error: {
            main: '#F87171'
        },
        warning: {
            main: '#FACC15'
        },
        info: {
            main: '#38BDF8'
        },
        success: {
            main: '#4ADE80'
        },
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
                    color: '#F43F5E'
                }
            }
        },
    }
});