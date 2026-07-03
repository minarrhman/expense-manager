import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Link } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            const res = await API.post("/api/login/", {
                username,
                password,
            });

            localStorage.setItem("access", res.data.access);
            localStorage.setItem("refresh", res.data.refresh);

            navigate("/");

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Invalid username or password."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white-100 to-indigo-200 flex items-center justify-center px-4">

            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-md p-8">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-600">
                        Expense Flow
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Sign in to manage your finances
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-5 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin}>

                    <div className="mb-4">
                        <label className="block mb-2 text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block mb-2 text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="mt-6 text-center text-gray-600">
                    Don't have an account?{" "}
                    <Link
                        to="/register"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Register
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Login;