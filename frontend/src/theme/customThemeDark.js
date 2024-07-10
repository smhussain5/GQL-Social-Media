import { createTheme } from '@mui/material';

export const customThemeDark = createTheme({
    palette: {
        mode: 'dark',
        // primary: {
        //     main: '#D946EF'
        // },
        // secondary: {
        //     main: '#D946EF'
        // },
        // TAILWIND ROSE 300
        error: {
            main: '#FDA4AF'
        },
        // TAILWIND AMBER 300
        warning: {
            main: '#FCD34D'
        },
        // TAILWIND BLUE 300
        info: {
            main: '#93C5FD'
        },
        // TAILWIND GREEN 300
        success: {
            main: '#86EFAC'
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