import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions"
import Budget from "./pages/Budget"
import Navbar from "./Components/Navbar"

function App(){
  return (  
    <div className="flex bg-gray-100 min-h-screen">
      <div className="sticky top-0 h-screen">
        <Navbar/>
      </div>
      
     <main className="flex-1 p-6 overflow-y-auto">
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/budget" element={<Budget/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/reports" element={<Settings/>} />
      </Routes>
    </main>
    </div>
    )

}
export default App;