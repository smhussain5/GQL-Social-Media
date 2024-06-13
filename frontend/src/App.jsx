import { Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home.jsx';
import { Profile } from './pages/Profile.jsx';
import { Post } from './pages/Post.jsx';
import { Login } from './pages/Login.jsx';
import { Register } from './pages/Register.jsx';
import { Error404 } from './pages/Error404.jsx';
import { Header } from './components/Header.jsx'

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/users/:userIdParameter' element={<Profile />} />
        <Route path='/posts/:postIdParameter' element={<Post />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error404 />} />
      </Routes>
    </div>
  )
}

export default App
