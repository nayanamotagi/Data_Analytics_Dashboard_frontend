import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './Predictions.css';

const Predictions = ({ predictions }) => {
  if (!predictions || !predictions.prediction) {
    return (
      <div className="card">
        <h2>Spending Predictions</h2>
        <p style={{ color: '#666', textAlign: 'center', padding: '20px' }}>
          {predictions?.message || 'Insufficient data for predictions'}
        </p>
      </div>
    );
  }

  const trendColors = {
    increasing: '#e74c3c',
    decreasing: '#27ae60',
    stable: '#667eea',
  };

  const trendIcons = {
    increasing: '📈',
    decreasing: '📉',
    stable: '➡️',
  };

  // Prepare chart data with prediction
  const chartData = [...(predictions.monthlyData || [])];
  if (predictions.prediction) {
    const lastMonth = chartData[chartData.length - 1];
    const nextMonthDate = new Date(lastMonth.month + '-01');
    nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
    const nextMonth = nextMonthDate.toISOString().substring(0, 7);
    
    chartData.push({
      month: new Date(nextMonth + '-01').toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
      }),
      amount: predictions.prediction,
      predicted: true,
    });
  }

  return (
    <div className="card predictions-card">
      <h2>Spending Predictions & Trends</h2>
      <div className="predictions-content">
        <div className="prediction-summary">
          <div className="prediction-item">
            <h3>Next Month Prediction</h3>
            <div className="prediction-value">
              ${predictions.prediction.toFixed(2)}
            </div>
          </div>
          <div className="prediction-item">
            <h3>Trend</h3>
            <div
              className="prediction-trend"
              style={{ color: trendColors[predictions.trend] }}
            >
              {trendIcons[predictions.trend]} {predictions.trend.toUpperCase()}
            </div>
          </div>
          <div className="prediction-item">
            <h3>Average Monthly</h3>
            <div className="prediction-value">
              ${predictions.avgMonthly.toFixed(2)}
            </div>
          </div>
        </div>

        {predictions.insight && (
          <div className="prediction-insight">
            <strong>💡 Insight:</strong> {predictions.insight}
          </div>
        )}

        {chartData.length > 0 && (
          <div className="prediction-chart">
            <h3>Historical Data & Prediction</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value) => `$${value.toFixed(2)}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#667eea"
                  strokeWidth={2}
                  name="Spending"
                  dot={{ r: 4 }}
                />
                {chartData[chartData.length - 1]?.predicted && (
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#f39c12"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Prediction"
                    dot={{ r: 6, fill: '#f39c12' }}
                    data={[chartData[chartData.length - 1]]}
                  />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predictions;
