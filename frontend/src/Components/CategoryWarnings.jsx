function CategoryWarnings({ warnings }) {

    if (!warnings || warnings.length === 0) return null;

    return (
        <div className="bg-white rounded-xl shadow p-5 mt-6">

            <h2 className="text-lg font-bold mb-4 text-red-600">
                Budget Alerts
            </h2>

            <div className="space-y-3">

                {warnings.map((warning, index) => (

                    <div
                        key={index}
                        className="border-l-4 border-red-500 bg-red-50 p-4 rounded"
                    >
                        <p>{warning}</p>
                    </div>

                ))}

            </div>

        </div>
    );
}

export default CategoryWarnings;