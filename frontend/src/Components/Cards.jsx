import { useSettings } from "../context/SettingsContext";

function Card({ title, amount, change }) {

    const isPositive = change?.includes("+");

    const { currency } = useSettings();

    const symbols = {
        BDT: "৳",
        USD: "$",
        EUR: "€",
        GBP: "£",
    };

    return (
        <div className="bg-surface rounded-xl shadow border border-border p-5 transition-colors duration-300">

            <div className="flex justify-between items-center">

                <h3 className="text-text-secondary text-sm">
                    {title}
                </h3>

                {change && (
                    <span
                        className={`text-sm ${
                            isPositive
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {change}
                    </span>
                )}

            </div>

            <h2 className="text-3xl font-bold text-text-primary mt-3">
                {symbols[currency]}
                {amount}
            </h2>

        </div>
    );
}

export default Card;