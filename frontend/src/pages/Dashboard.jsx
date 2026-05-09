import { useState, useEffect } from "react";
import API from "../services/api";
import Card from "../Components/Cards";
import TransactionList from "../Components/TransactionList";
import TransactionForm from "../Components/TransactionForm";

function Dashboard() {
  const [data, setData] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(()=>{
    fetchDashboard();

  },[]);
  const fetchDashboard = async () => {
    try{
      const res = await API.get("api/dashboard/");
      setData(res.data);
    }catch(err){
      console.error(err.response?.data);
    }
  };
  const handleAdd = async () => {
    await fetchDashboard();
    setShowModal(false);
  }

  if (!data) return <div>Loading...</div>;

  return (
    <>
      <div className="flex-1 bg-gray-100 min-h-screen p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold mb-6">
            Welcome Back, Minar!
            </h1>

            <button onClick={()=> setShowModal(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded">
              +Add Transaction
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card title="Balance" amount={`${data.balance}`} />
            <Card title="Income" amount={`${data.total_income}`} />
            <Card title="Expenses" amount={`${data.total_expense}`} />
            <Card
            title='Saving Goals'
            amount="2000"
            change="+62%"/>
          </div>
          <TransactionList transactions={data.recent_transactions}/>
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
      </>
      );
}

export default Dashboard;