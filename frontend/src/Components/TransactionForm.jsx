import { useState, useEffect} from "react";
import API from "../services/api";


function TransactionForm({ onAdd }) {
    const [categories, setCategories] = useState([]);
    const [form, setForm] = useState({
        amount: "",
        type: "expense",
        category: "",
        description: "",
        date: "",
    });
    const handleChange = (e) => {
      if(e.target.name === "type"){
        setForm({
          ...form,
          type: e.target.value,
          category: ""
        });
        return;
      }
      setForm({
        ...form,
        [e.target.name]: e.target.value,
      });
    };
    const handleSubmit = async (e) => {
      e.preventDefault();
      const payload = {
        ...form,
        amount: Number(form.amount),
        category: Number(form.category),
      };
      console.log("Sending", payload);

      try {
        const res = await API.post("/api/transactions/", payload);
        onAdd();
        setForm({
          amount: "",
          type: "expense",
          category: "",
          description: "",
          date: "",
        });
      } catch(err){
        console.log(err.response?.data);
      }
    }
    useEffect(()=>{
      fetchCategories();
    },[]);
    const fetchCategories = async () => {
      try {
        const res = await API.get('api/categories/');
        setCategories(res.data);
      }catch(err){
        console.log(err.response.data)
      }
    };
    return (
      <form onSubmit={handleSubmit}
            className="bg-white p-5 rounded-xl shadow space-y-4">
        <h2 className="text-lg font-bold">Add Transaction</h2>
        <input
          type = "number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select 
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
        </select>
        <select name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border p-2 rounded">
          <option value="">Select Category</option>
          {
            categories.filter((cat) => cat.type === form.type).map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          }
        </select>
         <input
          type = "text"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
         <input
          type = "date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          Add
        </button>
      </form>
  )
}

export default TransactionForm;
