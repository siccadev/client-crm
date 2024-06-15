import React, { useState, useEffect } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal, TextField, Checkbox, FormControlLabel, Typography, Box
} from '@mui/material';
import './nicecss.css'

const SuiviPaiement = () => {
  const [latePayments, setLatePayments] = useState([]);
  const [manualInput, setManualInput] = useState({
    contract_id: '',
    payment_date: '',
    amount_paid: '',
    payment_status: 'on-time', // default value, can be changed based on the checkbox
  });
  const [error, setError] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  useEffect(() => {
    fetchLatePayments();
  }, []);

  const fetchLatePayments = async () => {
    try {
      const response = await fetch('http://localhost:3001/late-payments');
      if (!response.ok) {
        throw new Error(`Error fetching late payments: ${response.statusText}`);
      }
      const data = await response.json();
      setLatePayments(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error fetching late payments:', error);
      setError('Error fetching late payments');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualInput({ ...manualInput, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { checked } = e.target;
    setManualInput({ ...manualInput, payment_status: checked ? 'late' : 'on-time' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!validateForm()) {
        throw new Error('All fields are required');
      }
      await saveManualInput();
      await fetchLatePayments(); // Fetch updated late payments after submission
      resetForm();
      setIsPopupOpen(false); // Close the popup after successful submission
    } catch (error) {
      console.error('Error saving manual input:', error);
      setError(error.message);
    }
  };

  const saveManualInput = async () => {
    try {
      const response = await fetch('http://localhost:3001/add-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manualInput),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Error saving manual input: ${response.status} - ${errorMessage}`);
      }

    } catch (error) {
      console.error('Error saving manual input:', error);
      throw new Error('Error saving manual input');
    }
  };

  const resetForm = () => {
    setManualInput({
      contract_id: '',
      payment_date: '',
      amount_paid: '',
      payment_status: 'on-time',
    });
  };

  const validateForm = () => {
    const { contract_id, payment_date, amount_paid } = manualInput;
    return contract_id.trim() !== '' && payment_date.trim() !== '' && amount_paid.trim() !== '';
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  return (
    <div>
      <Typography variant="h4" component="h1" gutterBottom>
        Suivi des paiements en retard des clients
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <TableContainer component={Paper} style={{ width: '80%', margin: 'auto', marginTop: '20px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Contrat</TableCell>
              <TableCell>Date de Paiement</TableCell>
              <TableCell>Montant Payé</TableCell>
              <TableCell>Nom</TableCell>
              <TableCell>En Retard</TableCell>
              <TableCell>
                <button onClick={togglePopup}>Ajouter Paiement</button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {latePayments.map((payment) => (
              <TableRow key={payment.payment_id}>
                <TableCell>{payment.contract_id}</TableCell>
                <TableCell>{payment.payment_date}</TableCell>
                <TableCell>{payment.amount_paid}</TableCell>
                <TableCell>{payment.owner_first_name}</TableCell>
                <TableCell>{payment.payment_status === 'late' ? 'Oui' : 'Non'}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <form onSubmit={handleSubmit}>
              <h2>Saisie Manuelle</h2>
              <label>
                Contrat:
                <input type="text" name="contract_id" value={manualInput.contract_id} onChange={handleInputChange} />
              </label>
              <label>
                Date de Paiement:
                <input type="date" name="payment_date" value={manualInput.payment_date} onChange={handleInputChange} />
              </label>
              <label>
                Montant Payé:
                <input type="text" name="amount_paid" value={manualInput.amount_paid} onChange={handleInputChange} />
              </label>
              <label>
                En Retard:
                <input type="checkbox" name="payment_status" checked={manualInput.payment_status === 'late'} onChange={handleCheckboxChange} />
              </label>
              <button type="submit">Enregistrer</button>
              <button type="button" onClick={togglePopup}>Fermer</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuiviPaiement;
