import { Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Budget from "./pages/Budget";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import FAQ from "./pages/FAQ";
import About from "./pages/About";

import Layout from "./Components/Layout";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {

    return (

        <Routes>

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />


            <Route
                element={
                    <ProtectedRoute>
                        <Layout />
                    </ProtectedRoute>
                }
            >
                <Route path="/" element={<Dashboard />} />
                <Route path="/transactions" element={<Transactions />} />
                <Route path="/budget" element={<Budget />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/profile" element={<Profile />} />
                <Route path='/faq' element={<FAQ/>} />
                <Route path='/about' element={<About/>} />

            </Route>

        </Routes>

    );

}

export default App;