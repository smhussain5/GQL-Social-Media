import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import ThemeContext from "./context/ThemeContext.js";
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Profile } from './pages/Profile.jsx';
import { Post } from './pages/Post.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Search } from './pages/Search.jsx';
import { Error404 } from './pages/Error404.jsx';
import { Header } from './components/Header.jsx'

function App() {

  const { userContext } = useContext(AuthContext);

  const { themeContext } = useContext(ThemeContext);

  return (
    <div>
      <ThemeProvider theme={themeContext}>
        <CssBaseline>
          <Header />
          <Routes>
            <Route path='/' element={userContext.jwtToken ? <Home /> : <Navigate to="/login" replace={true} />} />
            <Route path='/users/:userIdParameter' element={userContext.jwtToken ? <Profile /> : <Navigate to="/login" replace={true} />} />
            <Route path='/posts/:postIdParameter' element={userContext.jwtToken ? <Post /> : <Navigate to="/login" replace={true} />} />
            <Route path='/search' element={userContext.jwtToken ? <Search /> : <Navigate to="/login" replace={true} />} />
            <Route path='/search/:typeParameter/:queryParameter' element={userContext.jwtToken ? <Search /> : <Navigate to="/login" replace={true} />} />
            <Route path='/login' element={userContext.jwtToken ? <Navigate to="/" replace={true} /> : <Login />} />
            <Route path='/register' element={userContext.jwtToken ? <Navigate to="/" replace={true} /> : <Register />} />
            <Route path='*' element={<Error404 />} />
          </Routes>
        </CssBaseline>
      </ThemeProvider>
    </div >
  )
}

export default App
