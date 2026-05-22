import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from './Layout/components/Layout';
import MainPage from './main/components/mainpage';
import CoverGeneratePage from './CoverGeneratePage/CoverGeneratePage';
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

