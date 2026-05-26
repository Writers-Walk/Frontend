import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
<<<<<<< HEAD

import Layout from './Layout/components/Layout';

import MainPage from './main/components/mainpage';
import CoverGeneratePage from './CoverGeneratePage/CoverGeneratePage';
import BookDetailPage from './BookDetailPage/BookDetail';
import BookCreate from './pages/BookCreate';


=======
import Layout from './Layout/components/Layout';
import MainPage from './main/components/mainpage';
import CoverGeneratePage from './CoverGeneratePage/CoverGeneratePage';
import BookDetailPage from './BookDetailPage/BookDetailPage';
import BookCreate from './pages/BookCreate';



>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
export function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/cover-generate/:id", element: <CoverGeneratePage /> },
        { path: "/book-create", element: <BookCreate /> },
<<<<<<< HEAD
         { path: "/book/:id", element: <BookDetailPage /> },
      ],
    },
  ]);

=======
        { path: "/book/:id", element: <BookDetailPage /> },
      ],
    },
  ]);
  
>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
  return <RouterProvider router={router} />;
}

export default App;

<<<<<<< HEAD
=======

>>>>>>> d31b386632233768d0a688c3d898a3ca3da3c892
