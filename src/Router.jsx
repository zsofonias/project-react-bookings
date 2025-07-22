import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App';
import HomePage from './pages/HomePage';
import ListingDetailsPage from './pages/ListingDetailsPage';
import NotFoundPage from './pages/NotFoundPage';
import ListingFavoritesPage from './pages/ListingFavoritesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/listings/:listingId',
        element: <ListingDetailsPage />,
      },
      {
        path: '/favorites',
        element: <ListingFavoritesPage />,
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
