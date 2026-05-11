import React from 'react';
import { format } from 'date-fns';
import './ExpenseList.css';

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (expenses.length === 0) {
    return (
      <div className="card">
        <h2>Transactions</h2>
        <p style={{ textAlign: 'center', color: '#666', padding: '20px' }}>
          No transactions found. Add your first transaction to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2>Transactions</h2>
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((expense) => (
                <tr key={expense.id}>
                  <td>{format(new Date(expense.date), 'MMM dd, yyyy')}</td>
                  <td>
                    <span className={`badge badge-${expense.type}`}>
                      {expense.type}
                    </span>
                  </td>
                  <td>{expense.category}</td>
                  <td>{expense.description || '-'}</td>
                  <td className={`amount amount-${expense.type}`}>
                    {expense.type === 'income' ? '+' : '-'}${expense.amount.toFixed(2)}
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => onEdit(expense)}
                        className="btn-icon btn-edit"
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button
                        onClick={() => onDelete(expense.id)}
                        className="btn-icon btn-delete"
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ExpenseList;
