import { useEffect, useState } from "react";
import API from "../services/api";

function BudgetModal({
    open,
    onClose,
    onSuccess,
    budget = null,
}) {

    const [categories, setCategories] = useState([]);

    const [form, setForm] = useState({
        category: "",
        limit: "",
    });

    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (!open) return;

        fetchCategories();

        if (budget) {
            setForm({
                category: budget.category,
                limit: budget.limit,
            });
        } else {
            setForm({
                category: "",
                limit: "",
            });
        }

    }, [open, budget]);

    const fetchCategories = async () => {
        try {

            const [categoryRes, budgetRes] = await Promise.all([
                API.get("/api/categories/"),
                API.get("/api/category-limits/"),
            ]);

            const expenseCategories = categoryRes.data.filter(
                (cat) => cat.type === "expense"
            );

            // Editing
            if (budget) {
                setCategories(expenseCategories);
                return;
            }

            // Creating
            const usedCategories = budgetRes.data.results.map(
                (item) => item.category
            );

            const availableCategories = expenseCategories.filter(
                (cat) => !usedCategories.includes(cat.id)
            );

            setCategories(availableCategories);

        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSaving(true);

        const payload = {
            category: Number(form.category),
            limit: Number(form.limit),
        };

        try {

            if (budget) {

                await API.put(
                    `/api/category-limits/${budget.id}/`,
                    payload
                );

            } else {

                await API.post(
                    "/api/category-limits/",
                    payload
                );

            }

            onSuccess();
            onClose();

        } catch (err) {

            console.error(err.response?.data);

            alert(
                err.response?.data?.detail ||
                "Failed to save budget."
            );

        } finally {
            setSaving(false);
        }
    };

    if (!open) return null;

    return (

        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">

            <div className="bg-surface border border-border rounded-2xl shadow-xl w-full max-w-md">

                {/* Header */}

                <div className="flex justify-between items-center border-b border-border px-6 py-4">

                    <h2 className="text-xl font-semibold text-text-primary">

                        {budget ? "Edit Budget" : "Create Budget"}

                    </h2>

                    <button
                        onClick={onClose}
                        className="text-text-secondary hover:text-text-primary text-2xl"
                    >
                        ×
                    </button>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >
                    {categories.length === 0 && !budget && (
                        <div className="rounded-xl border border-border bg-surface-hover p-4 text-center">
                            <p className="text-text-secondary">
                                All expense categories already have budgets assigned.
                            </p>
                        </div>
                    )}

                    <div>

                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Category
                        </label>

                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            required
                            disabled={!!budget}
                            className="w-full bg-surface border border-border rounded-xl p-3 text-text-primary"
                        >

                            <option value="">
                                Select Category
                            </option>

                            {categories.map((cat) => (

                                <option
                                    key={cat.id}
                                    value={cat.id}
                                >
                                    {cat.name}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div>

                        <label className="block text-sm font-medium text-text-secondary mb-2">
                            Monthly Limit
                        </label>

                        <input
                            type="number"
                            name="limit"
                            value={form.limit}
                            onChange={handleChange}
                            required
                            min="1"
                            placeholder="5000"
                            className="w-full bg-surface border border-border rounded-xl p-3 text-text-primary"
                        />

                    </div>

                    {/* Footer */}

                    <div className="flex justify-end gap-3 pt-2">

                        <button
                            type="button"
                            onClick={onClose}
                            className="px-5 py-2 rounded-xl border border-border hover:bg-surface-hover"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={saving || (!budget && categories.length === 0)}
                            className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-hover text-white"
                        >
                            {saving
                                ? "Saving..."
                                : budget
                                    ? "Update"
                                    : "Create"}
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default BudgetModal;