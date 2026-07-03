import { useState, useEffect } from "react";
import API from "../services/api";
import BudgetCard from "../Components/BudgetCard";
import BudgetModal from "../Components/BudgetModal";

function Budget() {
    const [limits, setLimits] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [editingBudget, setEditingBudget] = useState(null);

    useEffect(() => {
        fetchLimits();
    }, []);

    const fetchLimits = async () => {
        try {
            setLoading(true);

            const res = await API.get("/api/category-limits/");
            setLimits(res.data.results);

        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleCreate = () => {
        setEditingBudget(null);
        setShowModal(true);
    };

    const handleEdit = (budget) => {
        setEditingBudget(budget);
        setShowModal(true);
    };

    const handleSuccess = async () => {
        await fetchLimits();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[70vh] bg-app-bg">
                <h2 className="text-lg font-semibold text-text-primary">
                    Loading budgets...
                </h2>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-app-bg p-6 transition-colors duration-300">

                {/* Header */}

                <div className="flex justify-between items-center mb-8">

                    <div>

                        <h1 className="text-3xl font-bold text-text-primary">
                            Budget Management
                        </h1>

                        <p className="text-text-secondary mt-2">
                            Track your spending limits across different categories.
                        </p>

                    </div>

                    <button
                        onClick={handleCreate}
                        className="bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl shadow transition"
                    >
                        + Add Budget
                    </button>

                </div>

                {/* Empty State */}

                {limits.length === 0 ? (

                    <div className="bg-surface border border-border rounded-2xl shadow p-10 text-center">

                        <h2 className="text-xl font-semibold text-text-primary">
                            No Budgets Found
                        </h2>

                        <p className="text-text-secondary mt-2">
                            You haven't created any category limits yet.
                        </p>

                        <button
                            onClick={handleCreate}
                            className="mt-6 bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-xl transition"
                        >
                            Create Your First Budget
                        </button>

                    </div>

                ) : (

                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

                        {limits.map((item) => (

                            <BudgetCard
                                key={item.id}
                                item={item}
                                onEdit={handleEdit}
                            />

                        ))}

                    </div>

                )}

            </div>

            <BudgetModal
                open={showModal}
                budget={editingBudget}
                onClose={() => setShowModal(false)}
                onSuccess={handleSuccess}
            />
        </>
    );
}

export default Budget;