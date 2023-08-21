import { createHashRouter } from 'react-router-dom'
import Layout from './layout'
import Error from './pages/error'
import Home from './pages/home'
import Video from './pages/video'
import Channel from './pages/channel'
import Search from './pages/search'

const router = createHashRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <Error />,
      },
      {
        path: '/v/:id',
        element: <Video />,
        errorElement: <Error />,
      },
      {
        path: '/channel/:id',
        element: <Channel />,
        errorElement: <Error />,
      },
      {
        path: '/search',
        element: <Search />,
        errorElement: <Error />,
      },
    ],
  },
])

export default router
