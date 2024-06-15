import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3001/api/payment-stats')
      .then(response => {
        setStats(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the payment stats!', error);
      });
  }, []);

  const handleStatsClick = () => {
    window.location.href = '/gestion-opportunites';
  };

  return (
    <div className="App">
      <h1>Payment Statistics</h1>
      <table>
        <thead>
          <tr>
            <th>Month</th>
            <th>Late Payments</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((stat, index) => (
            <tr key={index}>
              <td>{stat.month}</td>
              <td>{stat.latePayments}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add a button to navigate to GestionOpportunites component */}
      <button onClick={handleStatsClick}>View Gestion Opportunites</button>
    </div>
  );
};

export default App;
