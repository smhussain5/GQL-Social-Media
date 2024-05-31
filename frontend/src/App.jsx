import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Profile } from './pages/Profile.jsx'
import { Post } from './pages/Post.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/post",
    element: <Post />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/register",
    element: <Register />
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={reactRouter} />
    </div>
  )
}

export default App
