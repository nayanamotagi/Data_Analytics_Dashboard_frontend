import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './Charts.css';

const COLORS = [
  '#667eea',
  '#764ba2',
  '#f093fb',
  '#4facfe',
  '#00f2fe',
  '#43e97b',
  '#fa709a',
  '#fee140',
  '#30cfd0',
  '#a8edea',
];

const Charts = ({ analytics, expenses }) => {
  // Prepare category data for pie chart
  const categoryData = Object.entries(analytics.categoryBreakdown).map(
    ([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2)),
    })
  );

  // Prepare monthly trend data for line chart
  const monthlyData = analytics.monthlyTrend.map((item) => ({
    month: new Date(item.month + '-01').toLocaleDateString('en-US', {
      month: 'short',
      year: 'numeric',
    }),
    income: parseFloat(item.income.toFixed(2)),
    expense: parseFloat(item.expense.toFixed(2)),
  }));

  return (
    <div className="charts-container">
      <div className="grid grid-2">
        {categoryData.length > 0 && (
          <div className="card">
            <h3>Expenses by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        )}

        {monthlyData.length > 0 && (
          <div className="card">
            <h3>Monthly Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="income"
                  stroke="#27ae60"
                  strokeWidth={2}
                  name="Income"
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke="#e74c3c"
                  strokeWidth={2}
                  name="Expense"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Charts;
