import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './main/components/mainpage';

import CoverGeneratePage from './CoverGeneratePage/CoverGeneratePage';
import Layout from './Layout/components/Layout';
import BookCreate from "./pages/Book";


export function App() {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <MainPage /> },
        { path: "/cover-generate/:id", element: <CoverGeneratePage /> },
         { path: "/bookcreate", element: <BookCreate /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}


export default App;

