import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MobileLayout from './layouts/MobileLayout';
import LettersPage from './pages/letters/LettersPage';
import LetterDetailPage from './pages/letters/LetterDetailPage';
import ComposePage from './pages/compose/ComposePage';
import AccountPage from './pages/account/AccountPage';
import { Analytics } from "@vercel/analytics/react"

const router = createBrowserRouter([
  {
    path: '/',
    element: <MobileLayout />,
    children: [
      { index: true, element: <Navigate to="/letters" replace /> },
      { path: 'letters', element: <LettersPage /> },
      { path: 'letters/:id', element: <LetterDetailPage /> },
      { path: 'compose', element: <ComposePage /> },
      { path: 'account', element: <AccountPage /> },
    ],
  },
]);

export default function App() {
  return <>
  <RouterProvider router={router} />
  <Analytics/>
  </>
}
