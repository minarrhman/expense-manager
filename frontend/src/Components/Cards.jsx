function Card({title, amount, change}) {
    return(
        <div className="bg-white p-5 rounded-xl shadow">
            <div className="flex justify-between items-center">
                <h3 className="text-gray-500 text-sm">{title}</h3>
                <span className="text-green-500 text-sm">{change}</span>

            </div>
            <h2 className="text-2xl font-bold mt-2">৳{amount}</h2>
        </div>
    );
}

export default Card;