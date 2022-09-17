import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import {
    createBrowserRouter,
    RouterProvider,
    Route,
} from "react-router-dom";
import AddMood from "./pages/moods/add";
import EditMood, {loader as contactLoader} from "./pages/moods/edit";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/moods/add",
        element: <AddMood />,
    },
    {
        path: "/moods/:moodId/edit",
        element: <EditMood />,
        loader: contactLoader,
    },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>
)
