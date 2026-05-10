import {useState, useEffect} from 'react';
import API from "../services/api";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";



function Reports() {
  const [summary, setSummary] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true)
  const COLORS = ["#ef4444", "#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"];

  const fetchReports = async () => {
    try {
      setLoading(true);
      const [
        summaryRes,
        categoryRes, 
        trendyRes
      ] = await Promise.all(
        [
          API.get("api/reports/summary/"),
          API.get("api/reports/category-breakdown/"),
          API.get("api/reports/monthly-trend/")
        ]
      )
      
      setSummary(summaryRes.data);
      setCategoryData(categoryRes.data);
      setTrendData(trendyRes.data);
      console.log(categoryData)
    }catch(err){
      console.error(err);
    }finally{
      setLoading(false)
    }
  };

  useEffect(()=>{
    fetchReports();
  },[]);

  if (loading){
    return(
      <div className= "p-6 text-lg font-semibold">
        Loading reports
      </div>
    )
  }
  return (
    <div className='space-y-6'>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Reports & Analytics
          </h1>
          <p className="text-gray-500 mt-1">
            A glance at your financial isights
          </p>
        </div>

        <div className="flex gap-1">
          <button className="px-2 py-1 bg-white border rounded-lg hover:bg-gray-50">
            7 Days
          </button>
          <button className="px-2 py-1 bg-blue-500 text-white rounded-lg">
            30 Days
          </button>
          <button className="px-2 py-1 bg-white border rounded-lg hover:bg-gray-50">
            6 Months
          </button>
        </div>
        
      </div>
      {/* Summary Card */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500 text-sm">
            Total Income
          </p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
             ৳ {summary.income}
          </h2>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500 text-sm">
            Total Expense
          </p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
             ৳ {summary.expense}
          </h2>

        </div>
        <div className="bg-white rounded-2xl shadow-sm p-6 border">
          <p className="text-gray-500 text-sm">
            Balance
          </p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">
             ৳ {summary.balance}
          </h2>

        </div>
      </div>
      {/* Charts */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Income vs Expense Trend
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
              <CartesianGrid strokeDasharray= "3 3" opacity={0.3}/>
              <XAxis dataKey="month" />

              <YAxis/>

              <Tooltip/>

              <Line type="monotone"
              dataKey="income"
              stroke='#22c55e'
              strokeWidth={3}
              dot={{r:3}}/>


              <Line type="monotone"
              dataKey="expense"
              stroke='#ef4444'
              strokeWidth={3}
              dot={{r:3}}/>
            </LineChart>

          </ResponsiveContainer>
       

        </div>

        <div className="bg-white rounded-2xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold mb-4">
            Expense Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                dataKey="total"
                nameKey="category"
                cx="50%"
                cy="50%"
                outerRadius={110}
                label={(entry) =>
                  `${entry.payload.category} ${(entry.percent * 100).toFixed(0)}%`
                  }>
                
                {categoryData.map((entry, index) => (
                  <Cell
                  key={index}
                  fill={COLORS[index % COLORS.length]}
                  />
                  ))}
                   </Pie>
                <Tooltip/>
                <Legend/>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}

export default Reports
