import { FaEdit, FaTrash } from "react-icons/fa";
import { useSettings } from "../context/SettingsContext";

const BudgetCard = ({ item, onEdit, onDelete }) => {
    const { currency } = useSettings();

    const symbols = {
        BDT: "৳",
        USD: "$",
        EUR: "€",
        GBP: "£",
    };

    const progressColor =
        item.status === "safe"
            ? "bg-green-500"
            : item.status === "warning"
                ? "bg-yellow-500"
                : "bg-red-500";

    const statusStyle =
        item.status === "safe"
            ? "bg-green-100 dark:bg-green-950/40 text-green-700 dark:text-green-200"
            : item.status === "warning"
                ? "bg-yellow-100 dark:bg-yellow-950/40 text-yellow-700 dark:text-yellow-200"
                : "bg-red-100 dark:bg-red-950/40 text-red-700 dark:text-red-200";

    const capitalize = (text) =>
        text.charAt(0).toUpperCase() + text.slice(1);

    return (
        <div className="bg-surface border border-border rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-6">

            {/* Header */}

            <div className="flex justify-between items-start mb-5">

                <div>

                    <h2 className="text-xl font-bold text-text-primary">
                        {item.category_name}
                    </h2>

                    <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${statusStyle}`}
                    >
                        {capitalize(item.status)}
                    </span>

                </div>

                <div className="flex gap-2">

                    <button
                        onClick={() => onEdit(item)}
                        className="w-9 h-9 rounded-lg border border-border hover:bg-surface-hover transition flex items-center justify-center"
                        title="Edit Budget"
                    >
                        <FaEdit className="text-primary" />
                    </button>

                    <button
                        onClick={() => onDelete(item)}
                        className="w-9 h-9 rounded-lg border border-border hover:bg-red-50 dark:hover:bg-red-950/40 transition flex items-center justify-center"
                        title="Delete Budget"
                    >
                        <FaTrash className="text-red-500" />
                    </button>

                </div>

            </div>

            {/* Information */}

            <div className="space-y-4">

                <div className="flex justify-between">

                    <span className="text-text-secondary">
                        Budget Limit
                    </span>

                    <span className="font-semibold text-text-primary">
                        {symbols[currency]}
                        {Number(item.limit).toLocaleString()}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-text-secondary">
                        Spent
                    </span>

                    <span className="font-semibold text-text-primary">
                        {symbols[currency]}
                        {Number(item.spent).toLocaleString()}
                    </span>

                </div>

                <div className="flex justify-between">

                    <span className="text-text-secondary">
                        Remaining
                    </span>

                    <span
                        className={`font-semibold ${Number(item.remaining) < 0
                                ? "text-red-500"
                                : "text-text-primary"
                            }`}
                    >
                        {symbols[currency]}
                        {Number(item.remaining).toLocaleString()}
                    </span>

                </div>

            </div>

            {/* Progress */}

            <div className="mt-6">

                <div className="flex justify-between mb-2">

                    <span className="text-sm text-text-secondary">
                        Usage
                    </span>

                    <span className="text-sm font-medium text-text-primary">
                        {item.percentage_used}%
                    </span>

                </div>

                <div className="w-full h-3 bg-border rounded-full overflow-hidden">

                    <div
                        className={`h-full ${progressColor} transition-all duration-700`}
                        style={{
                            width: `${Math.min(item.percentage_used, 100)}%`,
                        }}
                    />

                </div>

            </div>

        </div>
    );
};

export default BudgetCard;