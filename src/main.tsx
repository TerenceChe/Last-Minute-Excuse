import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import Excuses from "./routes/excuses";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "excuses",
    element: <Excuses />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
