import { NavLink } from "react-router-dom";

function Navbar() {

    const menu = {
        Dashboard: "/",
        Transactions: "/transactions",
        Budget: "/budget",
        Reports: "/reports",
        Profile: "/profile",
    };

    return (
        <div
            className="
            w-full
            md:w-64
            bg-surface
            border-b md:border-b-0 md:border-r
            border-border
            text-text-primary
            p-4 md:p-5
            flex
            flex-col
            md:h-screen
            transition-colors
        "
        >
            <h1 className="text-xl md:text-2xl font-bold mb-5 md:mb-10 text-center md:text-left">
                Expense Flow
            </h1>

            <ul className="flex md:flex-col gap-2 overflow-x-auto md:overflow-visible whitespace-nowrap md:whitespace-normal">

                {Object.entries(menu).map(([item, link]) => (

                    <NavLink
                        key={item}
                        to={link}
                        className={({ isActive }) =>
                            `flex-shrink-0 md:w-full rounded-xl px-4 py-3 transition-all duration-200 ${isActive
                                ? "bg-primary text-white shadow"
                                : "hover:bg-surface-hover"
                            }`
                        }
                    >
                        {item}
                    </NavLink>

                ))}

            </ul>
        </div>
    );

}

export default Navbar;