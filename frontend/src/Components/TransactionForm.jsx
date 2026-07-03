import { useState, useEffect } from "react";
import API from "../services/api";

function TransactionForm({
    mode = "create", // "create" | "edit"
    initialData = null,
    onSuccess,
    onCancel,
}) {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        date: "",
    });

    // Load categories
    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await API.get("/api/categories/");
            setCategories(res.data);
        } catch (err) {
            console.log(err.response?.data);
        }
    };

    // Prefill for edit
    useEffect(() => {
        if (initialData) {
            setForm({
                amount: initialData.amount || "",
                type: initialData.type || "expense",
                category: initialData.category || "",
                description: initialData.description || "",
                date: initialData.date || "",
            });
        }
    }, [initialData]);

    const handleChange = (e) => {

        if (e.target.name === "type") {
            setForm({
                ...form,
                type: e.target.value,
                category: "",
            });
            return;
        }

        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...form,
            amount: Number(form.amount),
            category: Number(form.category),
        };

        try {

            if (mode === "edit") {
                await API.put(`/api/transactions/${initialData.id}/`, payload);
            } else {
                await API.post("/api/transactions/", payload);
            }

            onSuccess?.();

        } catch (err) {
            console.log(err.response?.data);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-5">

            <h2 className="text-2xl font-bold text-text-primary">
                {mode === "edit" ? "Edit Transaction" : "Add Transaction"}
            </h2>

            {/* Amount */}
            <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="w-full p-3 border border-border rounded bg-app-bg text-text-primary"
                required
            />

            {/* Type */}
            <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full p-3 border border-border rounded bg-app-bg text-text-primary"
            >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
            </select>

            {/* Category (auto-filtered) */}
            <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full p-3 border border-border rounded bg-app-bg text-text-primary"
                required
            >
                <option value="">Select Category</option>

                {categories
                    .filter((cat) => cat.type === form.type)
                    .map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.name}
                        </option>
                    ))}
            </select>

            {/* Description */}
            <input
                type="text"
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full p-3 border border-border rounded bg-app-bg text-text-primary"
            />

            {/* Date */}
            <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full p-3 border border-border rounded bg-app-bg text-text-primary"
                required
            />

            {/* Buttons */}
            <div className="flex justify-end gap-3">

                {onCancel && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-border rounded text-text-primary"
                    >
                        Cancel
                    </button>
                )}

                <button
                    type="submit"
                    className="px-5 py-2 bg-primary text-white rounded"
                >
                    {mode === "edit" ? "Update" : "Add"}
                </button>

            </div>

        </form>
    );
}

export default TransactionForm;