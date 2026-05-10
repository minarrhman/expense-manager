import { useState ,useEffect } from 'react';

import TransactionList from '../Components/TransactionList';
import API from "../services/api";
import TransactionForm from "../Components/TransactionForm";


function Transactions() {

  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  useEffect(()=>{
    fetchTransactions();
  },[page,search, filter]);

  const fetchTransactions = async () => {
    try{
       const res = await API.get(`api/transactions/?page=${page}&search=${search}&type=${filter}`);
      setData(res.data);
    }catch(err){
      console.error(err.response?.data);
    }
  };
  const handleAdd = async () => {
    await fetchTransactions();
    setShowModal(false);
  }


  return (
    <div className="flex-1 bg-gray-100 min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
         <input
              type="text"
              placeholder="Search transactions..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-3xl p-3 rounded-xl border border-gray-300 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={()=> setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              +Add Transaction
            </button>
          </div>
          <div className="flex gap-3 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-2 py-0.5 rounded-full text-sm font-medium transition ${
              filter === "all"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("income")}
            className={`px-2 py-0.5 rounded-full text-sm font-medium transition ${
              filter === "income"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Income
          </button>

          <button
            onClick={() => setFilter("expense")}
            className={`px-2 py-0.5 rounded-full text-sm font-medium transition ${
              filter === "expense"
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 border"
            }`}
          >
            Expense
          </button>
        </div>
      <div>
      <TransactionList transactions={data?.results || []} />
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          disabled={!data.previous}
          onClick={() => setPage(page - 1)}
          className={`px-2 py-1 rounded-lg font-medium ${
            data.previous
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Previous
        </button>

        <span className="font-semibold text-gray-700">
          Page {page}
        </span>

        <button
          disabled={!data.next}
          onClick={() => setPage(page + 1)}
          className={`px-2 py-1 rounded-lg font-medium ${
            data.next
              ? "bg-blue-500 text-white hover:bg-blue-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Next
        </button>
</div>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">

            <button onClick={()=>{setShowModal(false)}}
              className="absolute top-2 right-2 text-gray">
                x
            </button>
            <TransactionForm onAdd={handleAdd}/>

          </div>

        </div>
      )}
    </div>
)
}

export default Transactions;
