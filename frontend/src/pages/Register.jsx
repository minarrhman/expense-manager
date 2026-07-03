import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        date_of_birth: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {

            await API.post("/api/register/", formData);

            navigate("/login");

        } catch (err) {

            if (err.response?.data) {
                const errors = Object.values(err.response.data)
                    .flat()
                    .join(" ");

                setError(errors);
            } else {
                setError("Registration failed.");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white-100 to-indigo-200 flex items-center justify-center px-4">

            <div className="bg-white shadow-2xl rounded-2xl w-full max-w-lg p-9 m-4">

                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-indigo-600">
                        Expense Flow
                    </h1>

                    <p className="text-gray-500 mt-2">
                        Create your account
                    </p>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-700 p-3 rounded mb-5 text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-2 gap-4">

                        <div>
                            <label className="block mb-2 text-gray-700">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                required
                            />
                        </div>

                        <div>
                            <label className="block mb-2 text-gray-700">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            />
                        </div>

                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-gray-700">
                            Username
                        </label>

                        <input
                            type="text"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-gray-700">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-gray-700">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <div className="mt-4">
                        <label className="block mb-2 text-gray-700">
                            Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition mt-6"
                    >
                        {loading ? "Creating Account..." : "Register"}
                    </button>

                </form>

                <div className="mt-6 text-center text-gray-600">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-indigo-600 font-semibold hover:underline"
                    >
                        Login
                    </Link>
                </div>

            </div>

        </div>
    );
}

export default Register;