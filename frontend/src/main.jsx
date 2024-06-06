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
      main: '#212121'
    },
    secondary: {
      main: '#F48FB1'
    },
    error: {
      main: '#EF9A9A'
    },
    warning: {
      main: '#FFAB91'
    },
    info: {
      main: '#81D4FA'
    },
    success: {
      main: '#80CBC4'
    },
  },
  typography: {
    fontFamily: 'Inter'
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <ApolloProvider client={apolloClient}>
    <ThemeProvider theme={customThemeBase}>
      <Header />
      <App />
    </ThemeProvider>
  </ApolloProvider>
)
