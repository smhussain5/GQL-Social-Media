// import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { Header } from './components/Header.jsx'
import { createTheme, ThemeProvider } from '@mui/material';

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})

const customThemeBase = createTheme({
  palette: {
    primary: {
      main: '#64748B'
    },
    secondary: {
      main: '#D946EF'
    },
    error: {
      main: '#F43F5E'
    },
    warning: {
      main: '#F59E0B'
    },
    info: {
      main: '#06B6D4'
    },
    success: {
      main: '#22C55E'
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
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={customThemeBase}>
      <Header />
      <App />
    </ThemeProvider>
  </ApolloProvider>
)
