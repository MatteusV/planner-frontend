import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CreateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'
import { AuthPage } from './pages/auth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <CreateTripPage />,
  },

  {
    path: '/trips/:tripId',
    element: <TripDetailsPage />,
  },
  {
    path: '/auth',
    element: <AuthPage />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
