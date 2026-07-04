function CategoryWarnings({ warnings }) {

    if (!warnings || warnings.length === 0) return null;

    return (
        <div className="bg-surface border-l-4 border-yellow-500 border border-border rounded-xl p-5 shadow transition-colors duration-300">

            <h2 className="text-lg font-bold text-text-primary">
                Budget Alerts
            </h2>

            <div className="mt-3 space-y-2">

                {warnings.map((warning, index) => {

                    const percentage = Math.round(
                        (warning.exceeded_by / warning.limit) * 100
                    );

                    return (
                        <p
                            key={index}
                            className="text-text-secondary"
                        >
                            <span className="font-semibold text-text-primary">
                                {warning.category}
                            </span>{" "}
                            spending is{" "}
                            <span className="font-semibold text-yellow-600 dark:text-yellow-400">
                                {percentage}% over budget
                            </span>
                            .
                        </p>
                    );

                })}

            </div>

        </div>
    );
}

export default CategoryWarnings;