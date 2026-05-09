import { NavLink } from "react-router-dom";

function Navbar() {

    const menu = {
        Dashboard: "/",
        Transactions: "/transactions",
        Budget: "/budget",
        Reports: "/reports",
        Settings: "/settings",
    };

    return (
        <div className="w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">

            <h1 className="text-xl font-bold mb-8">
                Expense Bucket
            </h1>

            <ul className="space-y-4">

                {
                    Object.entries(menu).map(([item, link]) => (

                        <NavLink
                            key={item}
                            to={link}
                            className={({ isActive }) =>
                                `block p-2 rounded transition ${
                                    isActive
                                        ? "bg-gray-700 text-green-500 font-bold"
                                        : "hover:bg-gray-800"
                                }`
                            }
                        >
                            {item}
                        </NavLink>

                    ))
                }

            </ul>

        </div>
    );
}

export default Navbar;