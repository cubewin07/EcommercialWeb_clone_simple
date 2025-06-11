import { useContext, useEffect } from "react";
import { createBrowserRouter, useNavigate } from "react-router-dom";

import Layout from "../Layout/Layout.js";
import Home from "../Pages/Home/Home.js";
import Login from "../Pages/login/login.js";
import Dashboard from "../Pages/Dashboard/Dashboard.js";
import Cart from "../Pages/Cart/Cart.js";
import Product from "../Pages/Product/Product.js";
import ProductDetail from "../Pages/Product/ProductDetail/ProductDetail.js";
import Register from "../Pages/Register/Register.js";
import NotFound404 from "../Pages/notFound404/NotFound404.js";

import { AuthenContext } from "../contexts/AuthenProvider.js";

function Private({children}) {
    const navigate = useNavigate()
    const {isAuthenticated} = useContext(AuthenContext)
    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/login')
        }
    },[isAuthenticated, navigate])
    return isAuthenticated ? children : null
}

// function Public({children}) {
//     const navigate = useNavigate()
//     const {isAuthenticated} = useContext(AuthenContext)

//     return isAuthenticated ? null : children
// }

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/product", element: <Product /> },
            { path: "/product/:productId", element: <ProductDetail /> }, 
            { path: "/login", element: <Login />  },
            { path: "/user/dashboard", element: <Dashboard />},
            { path: '/user', element: <Dashboard />},
            { path: '/dashboard', element: <Dashboard />},
            { path: "/register", element: <Register />},
            {path: "/cart", element: <Cart /> }
        ]
    },
    {
        path: "*",
        element: <NotFound404 />
    }
])