import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from './main/components/mainpage';


export function App() {
const router = createBrowserRouter([
    { path: "/dd", element: <MainPage /> },
   
  ]);
  return <RouterProvider router={router} />;
}

export default App
