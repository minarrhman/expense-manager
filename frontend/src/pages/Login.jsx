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
        <div className="min-h-screen bg-gradient-to-br from-white-100 to-indigo-200 flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

            <div className="w-full max-w-sm sm:max-w-md bg-white shadow-2xl rounded-2xl p-6 sm:p-8">

                <div className="text-center mb-6 sm:mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-indigo-600">
                        Expense Flow
                    </h1>

                    <p className="text-sm sm:text-base text-gray-500 mt-2">
                        Sign in to manage your finances
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-5 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">

                    <div>
                        <label className="block mb-2 text-sm sm:text-base text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            placeholder="Enter username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm sm:text-base text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border rounded-lg px-4 py-3 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white py-3 rounded-lg transition font-medium"
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

                <div className="mt-6 text-center text-sm sm:text-base text-gray-600">
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