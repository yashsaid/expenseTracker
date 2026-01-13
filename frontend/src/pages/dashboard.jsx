import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseChart from "../components/ExpenseChart";
import jwtDecode from "jwt-decode";

function Dashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // Get user name from token
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.name || decoded.email || "User");
      } catch (error) {
        console.error("Error decoding token:", error);
        setUserName("User");
      }
    }
  }, []);

  const loadData = async () => {
    try {
      const res = await API.get("/expenses");
      const sum = await API.get("/expenses/summary");
      setExpenses(res.data);
      setSummary(sum.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        console.error("Error loading data:", error);
      }
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const saveExpense = async (expense) => {
    try {
      if (expense.id) {
        await API.put(`/expenses/${expense.id}`, expense);
      } else {
        await API.post("/expenses", expense);
      }
      setEditExpense(null);
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Error saving expense");
    }
  };

  const deleteExpense = async (id) => {
    try {
      await API.delete(`/expenses/${id}`);
      loadData();
    } catch (error) {
      alert(error.response?.data?.message || "Error deleting expense");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Expense Dashboard</h2>

      <ExpenseForm onSave={saveExpense} selected={editExpense} />

      <ExpenseTable
        expenses={expenses}
        onEdit={setEditExpense}
        onDelete={deleteExpense}
      />

      <ExpenseChart data={summary} />
    </div>
  );
}

export default Dashboard;
