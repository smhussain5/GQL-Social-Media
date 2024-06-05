import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Profile } from './pages/Profile.jsx'
import { Post } from './pages/Post.jsx'
import { Login } from './pages/Login.jsx'
import { Register } from './pages/Register.jsx'
import { Error404 } from './pages/Error404.jsx'

const reactRouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/users/:userIdParameter",
    element: <Profile />
  },
  {
    path: "/posts/:postIdParameter",
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
  {
    path: "*",
    element: <Error404 />
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
