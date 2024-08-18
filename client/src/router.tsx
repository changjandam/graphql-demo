import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home } from './pages/Home';
import { User } from './pages/User';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/user/:id',
    element: <User />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
