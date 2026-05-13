const BudgetCard = ({item}) => {
    const progressColor = 
    item.status === 'safe' ? 'bg-green-500':
    item.status === "warning"? "bg-yellow-500":"bg-red-500";

    const statusStyle = 
    item.status === "safe"? "bg-green-100 text-green-700": 
    item.status === "warning"? "bg-yellow-100 text-yellow-700": "bg-red-100 text-red-700";

    

return (
        <div className="bg-white rounded-2xl shadow-md p-5">

            <div className="flex justify-between items-center mb-4">

                <h2 className="text-xl font-semibold">
                    {item.category_name}
                </h2>

                <span
                    className={`
                        text-sm px-3 py-1 rounded-full
                        ${statusStyle}
                    `}
                >
                    {item.status}
                </span>

            </div>

            <div className="space-y-2">

                <p>
                    Limit:
                    <span className="font-semibold ml-2">
                        ৳ {item.limit}
                    </span>
                </p>

                <p>
                    Spent:
                    <span className="font-semibold ml-2">
                        ৳ {item.spent}
                    </span>
                </p>

                <p>
                    Remaining:
                    <span className="font-semibold ml-2">
                        ৳ {item.remaining}
                    </span>
                </p>

            </div>

            <div className="mt-4">

                <div className="w-full bg-gray-200 rounded-full h-3">

                    <div
                        className={`h-3 rounded-full ${progressColor}`}
                        style={{
                            width: `${Math.min(item.percentage_used, 100)}%`
                        }}
                    />

                </div>

                <p className="text-sm mt-2 text-gray-600">
                    {item.percentage_used}% used
                </p>

            </div>

        </div>
    );
};

export default BudgetCard;
