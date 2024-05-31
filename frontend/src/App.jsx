import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Home } from './pages/Home.jsx'
import { Profile } from './pages/Profile.jsx'
import { Post } from './pages/Post.jsx'

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
]);

function App() {
  return (
    <div>
      <RouterProvider router={reactRouter} />
    </div>
  )
}

export default App
