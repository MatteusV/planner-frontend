import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { CreateTripPage } from './pages/create-trip'
import { TripDetailsPage } from './pages/trip-details'
import { UserTripsPage } from './pages/user-trips'

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
    path: '/user/trips',
    element: <UserTripsPage />,
  },
])

export function App() {
  return <RouterProvider router={router} />
}
