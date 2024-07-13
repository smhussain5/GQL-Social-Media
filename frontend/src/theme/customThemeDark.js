import { createTheme } from '@mui/material';

export const customThemeDark = createTheme({
    palette: {
        mode: 'dark',
        // TAILWIND BLUE 200
        primary: {
            main: '#BFDBFE'
        },
        // TAILWIND PURPLE 200
        secondary: {
            main: '#E9D5FF'
        },
        // TAILWIND RED 200
        error: {
            main: '#FECACA'
        },
        // TAILWIND AMBER 200
        warning: {
            main: '#FDE68A'
        },
        // TAILWIND CYAN 200
        info: {
            main: '#A5F3FC'
        },
        // TAILWIND GREEN 200
        success: {
            main: '#BBF7D0'
        },
        background: {
            // TAILWIND ZINC 950
            default: '#09090B',
            // TAILWIND ZINC 900
            paper: '#18181B'
        }
    },
    typography: {
        fontFamily: 'Roboto'
    },
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: '#fecdd3'
                }
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: {
                    // TAILWIND ZINC 200
                    color: '#E4E4E7'
                }
            }
        }
    }
});