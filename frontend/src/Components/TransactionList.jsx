function TransactionList({ transactions }) {
    return (
        <div className="bg-white p-5 rounded-xl shadow mt-6">
            <h2 className="text-lg font-bold mb-4">Recent Transactions</h2>

            {
                transactions.map((t) => (
                        <div key={t.id}
                        className="flex justify-between items-center border-b py-2">
                            <div>
                                <p className="font-medium">{t.category_name}</p>
                                <p className="text-sm text-gray-500">{t.date}</p>
                            </div>
                            <p className={`font-semibold ${
                                t.type === "income" ? "text-green-500":"text-red-500"
                            }`}>
                                {t.type === "income" ? "+": "-"}৳{t.amount}
                            </p>

                        </div>
                        )
                )
            }

        </div>
    );
}
export default TransactionList;