import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Alert } from '@mui/material';

const Statistiques = () => {
  const [stats, setStats] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPaymentStats();
  }, []);

  const fetchPaymentStats = async () => {
    try {
      const response = await fetch('http://localhost:3001/late-payments');
      if (!response.ok) {
        throw new Error(`Error fetching payment stats: ${response.statusText}`);
      }
      const data = await response.json();
      const aggregatedData = aggregateData(data);
      setStats(aggregatedData);
    } catch (error) {
      console.error('Error fetching payment stats:', error);
      setError('Error fetching payment stats');
    }
  };

  const aggregateData = (data) => {
    const statsByClient = {};

    data.forEach(payment => {
      const { contract_id, owner_first_name, payment_status } = payment;
      if (!statsByClient[contract_id]) {
        statsByClient[contract_id] = {
          contract_id,
          owner_first_name,
          totalPayments: 0,
          latePayments: 0
        };
      }
      statsByClient[contract_id].totalPayments += 1;
      if (payment_status === 'late') {
        statsByClient[contract_id].latePayments += 1;
      }
    });

    return Object.values(statsByClient);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Statistiques des Paiements des Clients
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>Contrat</strong></TableCell>
              <TableCell><strong>Nom du Client</strong></TableCell>
              <TableCell align="right"><strong>Total des Paiements</strong></TableCell>
              <TableCell align="right"><strong>Paiements en Retard</strong></TableCell>
              <TableCell align="right"><strong>Pourcentage de Retard</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats.map((stat) => (
              <TableRow key={stat.contract_id}>
                <TableCell>{stat.contract_id}</TableCell>
                <TableCell>{stat.owner_first_name}</TableCell>
                <TableCell align="right">{stat.totalPayments}</TableCell>
                <TableCell align="right">{stat.latePayments}</TableCell>
                <TableCell align="right">{((stat.latePayments / stat.totalPayments) * 100).toFixed(2)}%</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Statistiques;
