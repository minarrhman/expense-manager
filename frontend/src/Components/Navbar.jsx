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

        <div className="w-64 h-screen bg-surface border-r border-border text-text-primary p-5 flex flex-col">

            <h1 className="text-2xl font-bold mb-10">
                Expense Flow
            </h1>

            <ul className="space-y-2">

                {Object.entries(menu).map(([item, link]) => (

                    <NavLink
                        key={item}
                        to={link}
                        className={({ isActive }) =>
                            `block rounded-xl px-4 py-3 transition-all duration-200 ${
                                isActive
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