import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './main/components/mainpage';
import BookCreate from "./pages/BookCreate";


export function App() {
const router = createBrowserRouter([
    { path: "/dd", element: <MainPage /> },
   
  ]);
  return <RouterProvider router={router} />;
}

export default App

import BookCreate from "./pages/BookCreate";

function App() {
  return <BookCreate />;
}

export default App