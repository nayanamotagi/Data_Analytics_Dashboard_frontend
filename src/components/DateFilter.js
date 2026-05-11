import React from 'react';
import './DateFilter.css';

const DateFilter = ({ dateRange, setDateRange }) => {
  const handleStartDateChange = (e) => {
    setDateRange({
      ...dateRange,
      startDate: e.target.value,
    });
  };

  const handleEndDateChange = (e) => {
    setDateRange({
      ...dateRange,
      endDate: e.target.value,
    });
  };

  const setQuickFilter = (days) => {
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    setDateRange({
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
    });
  };

  return (
    <div className="card date-filter">
      <h3>Date Range Filter</h3>
      <div className="date-filter-content">
        <div className="date-inputs">
          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              value={dateRange.startDate}
              onChange={handleStartDateChange}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              value={dateRange.endDate}
              onChange={handleEndDateChange}
            />
          </div>
        </div>
        <div className="quick-filters">
          <button
            onClick={() => setQuickFilter(7)}
            className="btn btn-secondary"
          >
            Last 7 Days
          </button>
          <button
            onClick={() => setQuickFilter(30)}
            className="btn btn-secondary"
          >
            Last 30 Days
          </button>
          <button
            onClick={() => setQuickFilter(90)}
            className="btn btn-secondary"
          >
            Last 90 Days
          </button>
          <button
            onClick={() => {
              const now = new Date();
              const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
              setDateRange({
                startDate: firstDay.toISOString().split('T')[0],
                endDate: now.toISOString().split('T')[0],
              });
            }}
            className="btn btn-secondary"
          >
            This Month
          </button>
        </div>
      </div>
    </div>
  );
};

export default DateFilter;
