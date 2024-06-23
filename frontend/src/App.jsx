import { useContext } from 'react';
import AuthContext from './context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Profile } from './pages/Profile.jsx';
import { Post } from './pages/Post.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Error404 } from './pages/Error404.jsx';
import { Header } from './components/Header.jsx'

function App() {

  const { user } = useContext(AuthContext);

  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={user.jwtToken ? <Home /> : <Navigate to="/login" replace={true} />} />
        <Route path='/users/:userIdParameter' element={user.jwtToken ? <Profile /> : <Navigate to="/login" replace={true} />} />
        <Route path='/posts/:postIdParameter' element={user.jwtToken ? <Post /> : <Navigate to="/login" replace={true} />} />
        <Route path='/login' element={user.jwtToken ? <Navigate to="/" replace={true} /> : <Login />} />
        <Route path='/register' element={user.jwtToken ? <Navigate to="/" replace={true} /> : <Register />} />
        <Route path='*' element={user.jwtToken ? <Error404 /> : <Navigate to="/login" replace={true} />} />
      </Routes>
    </div>
  )
}

export default App
