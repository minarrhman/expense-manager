import { useState, useEffect } from "react";
import API from "./services/api";
import Card from "./Components/Cards";
import Navbar from "./Components/Navbar";
import TransactionList from "./Components/TransactionList";

function App() {
  const [data, setData] = useState(null);

  useEffect(()=>{
    fetchDashboard();

  },[]);
  const fetchDashboard = async () => {
    try{
      const res = await API.get("api/dashboard/");
      setData(res.data);
    }catch(err){
      console.error(err);
    }
  };

  if (!data) return <div>Loading...</div>;
  console.log(data)
  return (
    
    <div className="flex">
      <Navbar/>


      <div className="flex-1 bg-gray-100 min-h-screen p-6">
          <h1 className="text-2xl font-bold mb-6">
            Welcome Back, Minar!
          </h1>

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
      </div>
  );
}

export default App;