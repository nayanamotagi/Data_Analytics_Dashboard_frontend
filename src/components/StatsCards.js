import React from 'react';
import './StatsCards.css';

const StatsCards = ({ analytics }) => {
  return (
    <div className="stats-grid">
      <div className="stat-card income">
        <h3>Total Income</h3>
        <div className="value">${analytics.totalIncome.toFixed(2)}</div>
      </div>
      <div className="stat-card expense">
        <h3>Total Expense</h3>
        <div className="value">${analytics.totalExpense.toFixed(2)}</div>
      </div>
      <div className="stat-card balance">
        <h3>Balance</h3>
        <div className="value">${analytics.balance.toFixed(2)}</div>
      </div>
      <div className="stat-card">
        <h3>Transactions</h3>
        <div className="value">{analytics.totalTransactions}</div>
      </div>
    </div>
  );
};

export default StatsCards;
