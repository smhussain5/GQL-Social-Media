import { createTheme } from '@mui/material';

export const customThemeBase = createTheme({
    palette: {
        mode: 'light',
        // primary: {
        //     main: '#fff'
        // },
        // secondary: {
        //     main: '#D946EF'
        // },
        // TAILWIND ROSE 500
        error: {
            main: '#F43F5E'
        },
        // TAILWIND AMBER 500
        warning: {
            main: '#F59E0B'
        },
        // TAILWIND BLUE 500
        info: {
            main: '#3B82F6'
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
                    color: '#F43F5E'
                }
            }
        }
    }
});