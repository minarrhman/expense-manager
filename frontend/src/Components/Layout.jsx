import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {

    return (

        <div className="flex bg-app-bg min-h-screen text-text-primary">

            <div className="sticky top-0 h-screen">
                <Navbar />
            </div>

            <main className="flex-1 p-6 overflow-y-auto">
                <Outlet />
            </main>

        </div>

    );

}

export default Layout;