import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from "@apollo/client";
import { setContext } from '@apollo/client/link/context';
import { ThemeProvider } from '@mui/material';
import { customThemeBase } from "./theme/customThemeBase.js"
import { customThemeDark } from './theme/customThemeDark.js';
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
});

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
