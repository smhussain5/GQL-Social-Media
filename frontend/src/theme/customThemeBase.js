import { createTheme } from '@mui/material';

export const customThemeBase = createTheme({
    palette: {
        mode: 'light',
        // TAILWIND ROSE 400
        error: {
            main: '#FB7185'
        },
        // TAILWIND YELLOW 400
        warning: {
            main: '#FACC15'
        },
        // TAILWIND CYAN 400
        info: {
            main: '#22D3EE'
        },
        // TAILWIND TEAL 400
        success: {
            main: '#2DD4BF'
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