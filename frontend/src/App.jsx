import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Reports from "./pages/Reports";
import Transactions from "./pages/Transactions"
import Budget from "./pages/Budget"
import Navbar from "./Components/Navbar"

function App(){
  return (  
    <div className="flex">
      <Navbar/>
  
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/transactions" element={<Transactions/>} />
        <Route path="/budget" element={<Budget/>} />
        <Route path="/reports" element={<Reports/>} />
        <Route path="/reports" element={<Settings/>} />
      </Routes>

    </div>
    )

}
export default App;