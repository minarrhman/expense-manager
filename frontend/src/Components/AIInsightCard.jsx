function AIInsightCard({ insight }) {

    if (!insight || !insight.title) return null;


    const colors = {
        success: "border-l-green-500",
        warning: "border-l-yellow-500",
        danger: "border-l-red-500",
        info: "border-l-blue-500",
    };

    return (
        <div
            className={`bg-surface border border-border border-l-4 rounded-xl p-5 shadow ${colors[insight.type] || colors.info
                }`}
        >
            <h2 className="text-lg font-bold text-text-primary">
                {insight.title}
            </h2>

            <p className="mt-2 text-text-secondary">
                {insight.message}
            </p>
        </div>
    );
}

export default AIInsightCard;