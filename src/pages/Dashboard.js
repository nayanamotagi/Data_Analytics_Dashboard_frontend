import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import ExpenseModal from '../components/ExpenseModal';
import ExpenseList from '../components/ExpenseList';
import StatsCards from '../components/StatsCards';
import Charts from '../components/Charts';
import DateFilter from '../components/DateFilter';
import Predictions from '../components/Predictions';
import './Dashboard.css';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [expenses, setExpenses] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
  });

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const [expensesRes, analyticsRes, predictionsRes] = await Promise.all([
        axios.get('/api/expenses'),
        axios.get('/api/analytics', {
          params: {
            startDate: dateRange.startDate,
            endDate: dateRange.endDate,
          },
        }),
        axios.get('/api/predictions'),
      ]);

      setExpenses(expensesRes.data);
      setAnalytics(analyticsRes.data);
      setPredictions(predictionsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddExpense = () => {
    setEditingExpense(null);
    setShowModal(true);
  };

  const handleEditExpense = (expense) => {
    setEditingExpense(expense);
    setShowModal(true);
  };

  const handleDeleteExpense = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await axios.delete(`/api/expenses/${id}`);
        fetchData();
      } catch (error) {
        console.error('Error deleting expense:', error);
        alert('Failed to delete expense');
      }
    }
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingExpense(null);
    fetchData();
  };

  const handleExportCSV = async () => {
    try {
      const response = await axios.get('/api/export/csv', {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expenses-${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting CSV:', error);
      alert('Failed to export CSV');
    }
  };

  const handleExportPDF = async () => {
    try {
      const response = await axios.get('/api/export/pdf', {
        params: {
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        },
        responseType: 'blob',
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `expenses-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Failed to export PDF');
    }
  };

  if (loading && !analytics) {
    return <div className="spinner"></div>;
  }

  const filteredExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date).toISOString().split('T')[0];
    return expenseDate >= dateRange.startDate && expenseDate <= dateRange.endDate;
  });

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <h1>Expense Dashboard</h1>
          <div className="header-actions">
            <span className="user-name">Welcome, {user?.name}!</span>
            <button onClick={logout} className="btn btn-secondary">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        <div className="dashboard-actions">
          <button onClick={handleAddExpense} className="btn btn-primary">
            + Add Transaction
          </button>
          <div className="export-buttons">
            <button onClick={handleExportCSV} className="btn btn-success">
              Export CSV
            </button>
            <button onClick={handleExportPDF} className="btn btn-success">
              Export PDF
            </button>
          </div>
        </div>

        <DateFilter dateRange={dateRange} setDateRange={setDateRange} />

        {analytics && <StatsCards analytics={analytics} />}

        {analytics && (
          <Charts
            analytics={analytics}
            expenses={filteredExpenses}
          />
        )}

        {predictions && <Predictions predictions={predictions} />}

        <ExpenseList
          expenses={filteredExpenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />

        {showModal && (
          <ExpenseModal
            expense={editingExpense}
            onClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;

