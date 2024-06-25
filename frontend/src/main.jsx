import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { createTheme, ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContextProvider.jsx'

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("jwtToken");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const customThemeBase = createTheme({
  palette: {
    primary: {
      main: '#000'
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
      main: '#3B82F6'
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
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#F43F5E'
        }
      }
    },
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={customThemeBase}>
      <AuthContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthContextProvider>
    </ThemeProvider>
  </ApolloProvider>
)
