import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from './Layout/components/Layout';

import MainPage from './main/pages/mainpage';
import CoverGeneratePage from './CoverGeneratePage/CoverGeneratePage';
import BookDetailPage from './BookDetailPage/pages/BookDetailPage';
import BookCreate from './BookCreate/pages/BookCreate';


export function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/cover-generate/:id", element: <CoverGeneratePage /> },
        { path: "/book-create", element: <BookCreate /> },
         { path: "/book/:id", element: <BookDetailPage /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

