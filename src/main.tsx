import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import './index.css'
import Root from "./routes/root";
import Home from "./routes/Home";
import Excuses from "./routes/excuses";
import Upload from './routes/upload';
import Previous from './routes/previous';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/home",
    element: <Home />,
  }, {
  
    path: "excuses",
    element: <Excuses />,
  },
  {
    path: "upload",
    element: <Upload />,
    children: [{
      path: ':text',
      element: <Upload />
    }]
  },
  {
    path: "previous",
    element: <Previous />,
    children: [{
      path: ':prev',
      element: <Previous />
    }]
  }
]);


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  
  </React.StrictMode>
)
