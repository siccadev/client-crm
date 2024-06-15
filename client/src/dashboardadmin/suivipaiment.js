import React, { useState, useEffect } from 'react';

const SuiviPaiement = () => {
  const [latePayments, setLatePayments] = useState([]);
  const [manualInput, setManualInput] = useState({
    contract_id: '',
    payment_date: '',
    amount_paid: '',
    payment_status: 'on-time', // default value, can be changed based on the checkbox
  });
  const [error, setError] = useState(null);

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
  
      // Optionally, handle response data if needed
      // const data = await response.json();
      // console.log('Response data:', data);
      
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

  return (
    <div>
      <h1>Suivi des paiements en retard des clients</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Contrat</th>
            <th>Date de Paiement</th>
            <th>Montant Payé</th>
            <th>Nom</th>
            <th>En Retard</th>
          </tr>
        </thead>
        <tbody>
          {latePayments.map((payment) => (
            <tr key={payment.payment_id}>
              <td>{payment.contract_id}</td>
              <td>{payment.payment_date}</td>
              <td>{payment.amount_paid}</td>
              <td>{payment.owner_first_name}</td>
              <td>{payment.payment_status === 'late' ? 'Oui' : 'Non'}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
      </form>
    </div>
  );
};

export default SuiviPaiement;
