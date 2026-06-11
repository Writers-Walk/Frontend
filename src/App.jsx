import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from './Layout/components/Layout';

import MainPage from './main/pages/mainpage';
import CoverGeneratePage from './CoverGeneratePage/CoverGeneratePage';
import BookDetailPage from './BookDetailPage/pages/BookDetailPage';
import BookCreate from './bookcreatepage/page/BookCreate';
import ReviewPage from './reviewpage/ReviewPage';
import AdminPage from './Admin/pages/AdminPage';

export function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/cover-generate/:id", element: <CoverGeneratePage /> },
        { path: "/book/:id", element: <BookDetailPage /> },
        { path: "/book/:id/reviews", element: <ReviewPage /> },
        { path: "/book-create", element: <BookCreate /> },
        { path: "/admin", element: <AdminPage /> },  
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;