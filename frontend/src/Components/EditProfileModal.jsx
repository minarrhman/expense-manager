import { useEffect, useState } from "react";
import API from "../services/api";

function EditProfileModal({ open, onClose, profile, onUpdated }) {
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        date_of_birth: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (profile) {
            setFormData({
                first_name: profile.first_name || "",
                last_name: profile.last_name || "",
                email: profile.email || "",
                date_of_birth: profile.date_of_birth || "",
            });
        }
    }, [profile]);

    if (!open) return null;

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setError("");

        try {
            await API.put("/api/profile/", formData);

            await onUpdated();

            onClose();
        } catch (err) {
            console.error(err.response?.data);

            if (err.response?.data) {
                const errors = [];

                Object.values(err.response.data).forEach((value) => {
                    if (Array.isArray(value)) {
                        errors.push(...value);
                    } else {
                        errors.push(value);
                    }
                });

                setError(errors.join(" "));
            } else {
                setError("Failed to update profile.");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative">

                <button
                    onClick={onClose}
                    className="absolute top-4 right-5 text-2xl text-gray-500 hover:text-red-500"
                >
                    ×
                </button>

                <h2 className="text-2xl font-bold mb-6">
                    Edit Profile
                </h2>

                {error && (
                    <div className="bg-red-100 text-red-700 border border-red-300 rounded-lg p-3 mb-5">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit}>

                    <div className="grid grid-cols-2 gap-4">

                        <div>

                            <label className="block text-sm text-gray-600 mb-1">
                                First Name
                            </label>

                            <input
                                type="text"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />

                        </div>

                        <div>

                            <label className="block text-sm text-gray-600 mb-1">
                                Last Name
                            </label>

                            <input
                                type="text"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                            />

                        </div>

                    </div>

                    <div className="mt-5">

                        <label className="block text-sm text-gray-600 mb-1">
                            Email
                        </label>

                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                    </div>

                    <div className="mt-5">

                        <label className="block text-sm text-gray-600 mb-1">
                            Date of Birth
                        </label>

                        <input
                            type="date"
                            name="date_of_birth"
                            value={formData.date_of_birth || ""}
                            onChange={handleChange}
                            className="w-full border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                        />

                    </div>

                    <div className="flex justify-end gap-3 mt-8">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`px-5 py-2 rounded-lg text-white transition ${loading
                                    ? "bg-indigo-400 cursor-not-allowed"
                                    : "bg-indigo-600 hover:bg-indigo-700"
                                }`}
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default EditProfileModal;