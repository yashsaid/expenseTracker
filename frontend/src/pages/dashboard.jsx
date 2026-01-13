import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import ExpenseForm from "../components/ExpenseForm";
import ExpenseTable from "../components/ExpenseTable";
import ExpenseChart from "../components/ExpenseChart";

function Dashboard() {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState([]);
  const [editExpense, setEditExpense] = useState(null);
  const [userName, setUserName] = useState("");

  // Decode JWT token to get user info
  const decodeToken = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error("Error decoding token:", error);
      return null;
    }
  };

  useEffect(() => {
    // Get user name from token
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setUserName(decoded.name || decoded.email || "User");
      } else {
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Expense Dashboard</h2>
        <div className="d-flex align-items-center gap-3">
          <span className="text-muted">
            Welcome, <strong className="text-primary">{userName}</strong>
          </span>
          <button className="btn btn-danger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

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
