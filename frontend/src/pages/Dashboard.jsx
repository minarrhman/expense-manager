import { useState, useEffect } from "react";
import API from "../services/api";
import Card from "../Components/Cards";
import TransactionList from "../Components/TransactionList";
import TransactionForm from "../Components/TransactionForm";
import AIInsightCard from "../Components/AIInsightCard";
import CategoryWarnings from "../Components/CategoryWarnings";

function Dashboard() {
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            const res = await API.get("/api/dashboard/");
            setData(res.data);
            console.log(res.data)
            console.log(data.category_warnings)
        } catch (err) {
            console.error(err.response?.data);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        await fetchDashboard();
        setShowModal(false);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-app-bg text-text-primary">
                <h2 className="text-lg font-semibold">
                    Loading...
                </h2>
            </div>
        );
    }

    return (
        <>
            <div className="flex-1 min-h-screen bg-app-bg p-4 sm:p-6 lg:p-8 transition-colors duration-300">

                {/* Header */}

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-8">

                    <div className="min-w-0">

                        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary break-words">
                            Welcome Back, {data.name}! 👋
                        </h1>

                        <p className="text-sm sm:text-base text-text-secondary mt-1">
                            Here's your financial overview.
                        </p>

                    </div>

                    <button
                        onClick={() => setShowModal(true)}
                        className="w-full md:w-auto bg-primary hover:bg-primary-hover text-white px-5 py-3 rounded-lg shadow transition"
                    >
                        + Add Transaction
                    </button>

                </div>

                {/* Summary Cards */}

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">

                    <Card
                        title="Balance"
                        amount={Number(data.balance).toLocaleString()}
                    />

                    <Card
                        title="Income"
                        amount={Number(data.total_income).toLocaleString()}
                    />

                    <Card
                        title="Expenses"
                        amount={Number(data.total_expense).toLocaleString()}
                    />

                </div>

                {/* AI Insight */}

                <AIInsightCard insight={data.ai_insight} />

                {/* Category Warnings */}

                <div className="mt-6">
                    <CategoryWarnings
                        warnings={data.category_warnings}
                    />
                </div>

                {/* Recent Transactions */}

                <div className="mt-8">

                    <h2 className="text-xl font-bold text-text-primary mb-4">
                        Recent Transactions
                    </h2>

                    <TransactionList
                        transactions={data.recent_transactions}
                    />

                </div>

            </div>

            {/* Add Transaction Modal */}

            {showModal && (

                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">

                    <div className="relative w-full max-w-md rounded-xl border border-border bg-surface shadow-xl p-5 sm:p-6 transition-colors duration-300 max-h-[90vh] overflow-y-auto">

                        <button
                            onClick={() => setShowModal(false)}
                            className="absolute top-3 right-4 text-2xl text-text-secondary hover:text-red-500 transition"
                        >
                            ×
                        </button>

                        <TransactionForm
                            mode="create"
                            onSuccess={handleAdd}
                        />

                    </div>

                </div>

            )}

        </>
    );
}

export default Dashboard;