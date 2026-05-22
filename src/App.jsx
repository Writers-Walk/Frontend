import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Layout from './Layout/components/Layout';

import MainPage from './main/components/mainpage';
import CoverGeneratePage from './CoverGeneratePage/CoverGeneratePage';
<<<<<<< HEAD
import BookDetailPage from './BookDetailPage/Hansu';

export function App() {
  const router = createBrowserRouter([
    { path: "/", element: <MainPage /> },
    { path: "/cover-generate/:id", element: <CoverGeneratePage /> },
    { path: "/book/:id", element: <BookDetailPage /> }
  ]);
  
  return <RouterProvider router={router} />;
}

export default App;
=======
import BookCreate from './pages/BookCreate';


export function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/cover-generate/:id", element: <CoverGeneratePage /> },
        { path: "/book-create", element: <BookCreate /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
>>>>>>> e8e5212b57de5a0ea68ca3358c6151900eb53f7f
