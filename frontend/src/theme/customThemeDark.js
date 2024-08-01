import { createTheme } from '@mui/material';

export const customThemeDark = createTheme({
    palette: {
        mode: 'dark',
        // TAILWIND ROSE 200
        error: {
            main: '#FECDD3'
        },
        // TAILWIND YELLOW 200
        warning: {
            main: '#FEF08A'
        },
        // TAILWIND CYAN 200
        info: {
            main: '#A5F3FC'
        },
        // TAILWIND TEAL 200
        success: {
            main: '#99F6E4'
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