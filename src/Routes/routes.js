import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout/Layout.js";
import Home from "../Pages/Home/Home.js";
import Login from "../Pages/login/login.js";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/login", element: <Login /> },
        ]
    }
])