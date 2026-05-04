function Navbar(){
    const active = "Dashboard";

    const menu = [
        'Dashboard',
        'Transactions',
        'Budget',
        'Reports',
        'Settings'
    ];
    return(
        <div className = "w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
            <h1 className="text-xl font-bold mb-8">Expense Bucket</h1>
            <ul className="space-y-4">
                {
                    menu.map((item) => (
                        <li key={item}
                            className= {`p-2 rounded cursor-pointer ${
                                 active === item ? "bg-gray-700 text-green-500 text-bold":"hover:bg-gray-800"}`}>
                                    {item}
                        </li>
                    ))
                }

            </ul>
        </div>
    )
}

export default Navbar; 
