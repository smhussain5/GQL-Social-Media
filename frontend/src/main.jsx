import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Navbar } from './components/Navbar.jsx'
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { PrimeReactProvider } from 'primereact/api';

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <PrimeReactProvider>
        <Navbar />
        <App />
      </PrimeReactProvider>
    </ApolloProvider>
  </React.StrictMode>,
)
