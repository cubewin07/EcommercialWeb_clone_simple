import { createBrowserRouter } from "react-router-dom";

import Layout from "../Layout/Layout.js";
import Home from "../Pages/Home/Home.js";
import Login from "../Pages/login/login.js";
import Cart from "../Pages/Cart/Cart.js";
import Product from "../Pages/Product/Product.js";
import NotFound404 from "../Pages/notFound404/NotFound404.js";
import ProductDetail from "../Pages/Product/ProductDetail/ProductDetail.js";

export const routes = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            { index: true, element: <Home /> },
            { path: "/product", element: <Product /> },
            { path: "/product/:productId", element: <ProductDetail /> }, 
            { path: "/login", element: <Login /> },
            {path: "/cart", element: <Cart /> }
        ]
    },
    {
        path: "*",
        element: <NotFound404 />
    }
])