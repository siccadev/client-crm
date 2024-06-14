import React, { useState, useEffect } from 'react';

const SuiviPaiement = () => {
  const [latePayments, setLatePayments] = useState([]);
  const [manualInput, setManualInput] = useState({
    contract_id: '',
    payment_date: '',
    amount_paid: '',
    owner_first_name: '',
    late: false,
  });

  useEffect(() => {
    fetchLatePayments();
  }, []);

  const fetchLatePayments = async () => {
    try {
      const response = await fetch('http://localhost:3001/late-payments');
      const data = await response.json();
      setLatePayments(data);
    } catch (error) {
      console.error('Error fetching late payments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualInput({ ...manualInput, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setManualInput({ ...manualInput, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await saveManualInput();
      fetchLatePayments();
      resetForm();
    } catch (error) {
      console.error('Error saving manual input:', error);
    }
  };

  const saveManualInput = async () => {
    try {
      await fetch('http://localhost:3001/add-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(manualInput),
      });
    } catch (error) {
      console.error('Error saving manual input:', error);
    }
  };

  const resetForm = () => {
    setManualInput({
      contract_id: '',
      payment_date: '',
      amount_paid: '',
      owner_first_name: '',
      late: false,
    });
  };

  return (
    <div>
      <h1>Suivi des paiements en retard des clients</h1>
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
              <td>{payment.late ? 'Oui' : 'Non'}</td>
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
          Nom:
          <input type="text" name="owner_first_name" value={manualInput.owner_first_name} onChange={handleInputChange} />
        </label>
        <label>
          En Retard:
          <input type="checkbox" name="late" checked={manualInput.late} onChange={handleCheckboxChange} />
        </label>
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default SuiviPaiement;
