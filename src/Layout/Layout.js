import { Outlet } from "react-router-dom";

import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";


function Layout() {
    return ( 
        <>
            <div className="fixed-header-color"></div>
            <div className="layout">
                <Header />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
            <Footer />
        </>
     );
}

export default Layout;