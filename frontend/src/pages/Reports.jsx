import { useState, useEffect } from "react";
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
  ResponsiveContainer,
} from "recharts";

function Reports() {

  const [summary, setSummary] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [trendData, setTrendData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#ef4444",
    "#f97316",
    "#eab308",
    "#22c55e",
    "#3b82f6",
    "#a855f7",
  ];

  const isDark = document.documentElement.classList.contains("dark");

  const fetchReports = async () => {
    try {

      setLoading(true);

      const [
        summaryRes,
        categoryRes,
        trendRes,
      ] = await Promise.all([
        API.get("/api/reports/summary/"),
        API.get("/api/reports/category-breakdown/"),
        API.get("/api/reports/monthly-trend/"),
      ]);

      setSummary(summaryRes.data);
      setCategoryData(categoryRes.data);
      setTrendData(trendRes.data);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh] bg-app-bg">
        <h2 className="text-lg font-semibold text-text-primary">
          Loading reports...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-app-bg text-text-primary transition-colors duration-300">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold">
          Reports & Analytics
        </h1>

        <p className="text-text-secondary mt-2">
          A quick overview of your financial activity.
        </p>

      </div>

      {/* Summary Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

        <div className="bg-surface rounded-2xl shadow border border-border p-6">

          <p className="text-text-secondary text-sm">
            Total Income
          </p>

          <h2 className="text-3xl font-bold text-green-600 mt-2">
            ৳ {Number(summary.income).toLocaleString()}
          </h2>

        </div>

        <div className="bg-surface rounded-2xl shadow border border-border p-6">

          <p className="text-text-secondary text-sm">
            Total Expense
          </p>

          <h2 className="text-3xl font-bold text-red-600 mt-2">
            ৳ {Number(summary.expense).toLocaleString()}
          </h2>

        </div>

        <div className="bg-surface rounded-2xl shadow border border-border p-6">

          <p className="text-text-secondary text-sm">
            Balance
          </p>

          <h2 className="text-3xl font-bold text-primary mt-2">
            ৳ {Number(summary.balance).toLocaleString()}
          </h2>

        </div>

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Trend Chart */}

        <div className="bg-surface rounded-2xl shadow border border-border p-6">

          <h2 className="text-xl font-semibold mb-5">
            Income vs Expense Trend
          </h2>

          <ResponsiveContainer
            width="100%"
            height={320}
          >

            <LineChart data={trendData}>

              <CartesianGrid
                stroke={isDark ? "#374151" : "#e5e7eb"}
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="month"
                stroke={isDark ? "#9ca3af" : "#6b7280"}
              />

              <YAxis
                stroke={isDark ? "#9ca3af" : "#6b7280"}
              />

              <Tooltip
                contentStyle={{
                  backgroundColor: isDark ? "#1f2937" : "#ffffff",
                  border: "1px solid #374151",
                  color: isDark ? "#ffffff" : "#111827",
                }}
              />

              <Legend />

              <Line
                type="monotone"
                dataKey="income"
                stroke="#22c55e"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

        {/* Pie Chart */}

        <div className="bg-surface rounded-2xl shadow border border-border p-6">

          <h2 className="text-xl font-semibold">
            Expense Breakdown
          </h2>

          <p className="text-sm text-text-secondary mb-5">
            Current Month
          </p>

          {categoryData.length === 0 ? (

            <div className="flex justify-center items-center h-[300px] text-text-secondary">
              No expense data available.
            </div>

          ) : (

            <ResponsiveContainer
              width="100%"
              height={320}
            >

              <PieChart>

                <Pie
                  data={categoryData}
                  dataKey="total"
                  nameKey="category_name"
                  outerRadius={100}
                  label={({ percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                >

                  {categoryData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index % COLORS.length]}
                    />

                  ))}

                </Pie>

                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? "#1f2937" : "#ffffff",
                    border: "1px solid #374151",
                    color: isDark ? "#ffffff" : "#111827",
                  }}
                />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          )}

        </div>

      </div>

    </div>
  );
}

export default Reports;