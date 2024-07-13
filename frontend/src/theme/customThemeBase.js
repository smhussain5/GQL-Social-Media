import { createTheme } from '@mui/material';

export const customThemeBase = createTheme({
    palette: {
        mode: 'light',
        // TAILWIND BLUE 500
        primary: {
            main: '#3B82F6'
        },
        // TAILWIND PURPLE 500
        secondary: {
            main: '#A855F7'
        },
        // TAILWIND RED 500
        error: {
            main: '#EF4444'
        },
        // TAILWIND AMBER 500
        warning: {
            main: '#F59E0B'
        },
        // TAILWIND CYAN 500
        info: {
            main: '#38BDF8'
        },
        // TAILWIND GREEN 500
        success: {
            main: '#22C55E'
        }
    },
    typography: {
        fontFamily: 'Roboto'
    },
    components: {
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    color: '#EF4444'
                }
            }
        }
    }
});