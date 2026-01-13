function ExpenseTable({ expenses, onEdit, onDelete }) {
    return (
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Comments</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((e) => (
            <tr key={e.id}>
              <td>{e.category}</td>
              <td>{e.amount}</td>
              <td>{new Date(e.createdAt).toLocaleString()}</td>
              <td>{new Date(e.updatedAt).toLocaleString()}</td>
              <td>{e.comments}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => onEdit(e)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => onDelete(e.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  
  export default ExpenseTable;
  