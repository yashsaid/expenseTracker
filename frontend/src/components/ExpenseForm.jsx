import { useState, useEffect } from "react";

function ExpenseForm({ onSave, selected }) {
  const [form, setForm] = useState(
    selected || { category: "", amount: "", comments: "" }
  );

  // update form when editing
  useEffect(() => {
    if (selected) setForm(selected);
  }, [selected]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm({ category: "", amount: "", comments: "" });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input name="category" placeholder="Category" className="form-control mb-2" value={form.category} onChange={handleChange} required />
      <input name="amount" type="number" placeholder="Amount" className="form-control mb-2" value={form.amount} onChange={handleChange} required />
      <input name="comments" placeholder="Comments (optional)" className="form-control mb-2" value={form.comments} onChange={handleChange} />
      <button className="btn btn-primary">
        {selected ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

export default ExpenseForm;
