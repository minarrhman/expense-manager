import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-app-bg text-text-primary">

            {/* Sidebar - Desktop Only */}
            <div className="hidden md:sticky md:top-0 md:block md:h-screen">
                <Navbar />
            </div>

            {/* Mobile Navbar */}
            <div className="md:hidden">
                <Navbar />
            </div>

            <main className="flex-1 overflow-y-auto p-4 sm:p-6">
                <Outlet />
            </main>

        </div>
    );
}

export default Layout;