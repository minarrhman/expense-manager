function Navbar(){
    return(
        <div className = "w-64 h-screen bg-gray-900 text-white p-5 flex flex-col">
            <h1 className="text-xl font-bold mb-8">Expense Bucket</h1>
            <ul className="space-y-4">
                <li className="hover:text-gray-600 cursor-pointer">Dashboard</li>
                <li className="hover:text-gray-600 cursor-pointer">Transactions</li>
                <li className="hover:text-gray-600 cursor-pointer">Budget</li>
                <li className="hover:text-gray-600 cursor-pointer">Reports</li>
                <li className="hover:text-gray-600 cursor-pointer">Settings</li>

            </ul>

        </div>
    )
}

export default Navbar; 
