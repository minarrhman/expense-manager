import { FaEdit, FaTrash } from "react-icons/fa";
import { useSettings } from "../context/SettingsContext";

function TransactionList({
    transactions,
    editable = false,
    deletable = false,
    onEdit,
    onDelete,
}) {

    const { currency } = useSettings();

    const symbols = {
        BDT: "৳",
        USD: "$",
        EUR: "€",
        GBP: "£",
    };

    return (
        <div className="bg-surface border border-border rounded-xl shadow mt-6 transition-colors duration-300">

            <div className="p-5 border-b border-border">

                <h2 className="text-lg font-bold text-text-primary">
                    Recent Transactions
                </h2>

            </div>

            {transactions.length === 0 ? (

                <p className="text-text-secondary text-center py-8">
                    No transactions found.
                </p>

            ) : (

                transactions.map((t) => (

                    <div
                        key={t.id}
                        className="flex justify-between items-center px-5 py-4 border-b border-border last:border-b-0 hover:bg-surface-hover transition"
                    >

                        <div>

                            <p className="font-semibold text-text-primary">
                                {t.category_name}
                            </p>

                            {t.description && (
                                <p className="text-sm text-text-secondary">
                                    {t.description}
                                </p>
                            )}

                            <p className="text-xs text-text-secondary mt-1">
                                {t.date}
                            </p>

                        </div>

                        <div className="flex items-center gap-4">

                            <p
                                className={`font-bold text-lg ${t.type === "income"
                                    ? "text-green-500"
                                    : "text-red-500"
                                    }`}
                            >
                                {t.type === "income" ? "+" : "-"}
                                {symbols[currency]}
                                {Number(t.amount).toLocaleString()}
                            </p>

                            <div className="flex items-center gap-2">

                                {editable && (
                                    <button
                                        onClick={() => onEdit(t)}
                                        className="w-9 h-9 rounded-lg border border-border hover:bg-surface-hover transition flex items-center justify-center"
                                        title="Edit Transaction"
                                    >
                                        <FaEdit className="text-primary" />
                                    </button>
                                )}

                                {deletable && (
                                    <button
                                        onClick={() => onDelete(t)}
                                        className="w-9 h-9 rounded-lg border border-border hover:bg-red-50 dark:hover:bg-red-900/20 transition flex items-center justify-center"
                                        title="Delete Transaction"
                                    >
                                        <FaTrash className="text-red-500" />
                                    </button>
                                )}

                            </div>
                        </div>

                    </div>

                ))

            )}

        </div>
    );
}

export default TransactionList;