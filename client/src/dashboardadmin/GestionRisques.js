import React, { useState, useEffect } from 'react';

const GestionRisques = ({ riskData, setViewRisks }) => {
  const [loanAmount, setLoanAmount] = useState('');
  const [repaymentPeriod, setRepaymentPeriod] = useState('');
  const [capital, setCapital] = useState('');
  const [riskEvaluation, setRiskEvaluation] = useState(null);

  useEffect(() => {
    if (riskData) {
      setLoanAmount(riskData.DF_Montant_HT || '');
      setRepaymentPeriod(riskData.DF_Durée || '');
      setCapital(riskData.Cl_Capital || '');
    }
  }, [riskData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const monthlyPayment = calculateMonthlyPayment(loanAmount, repaymentPeriod);
    const isApproved = evaluateRisk(capital, loanAmount, monthlyPayment);
    setRiskEvaluation(isApproved ? 'Approved' : 'Rejected');
  };

  const calculateMonthlyPayment = (principal, months) => {
    const interestRate = 0.05; // assuming a 5% annual interest rate
    const monthlyRate = interestRate / 12;
    return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  };

  const evaluateRisk = (capital, loanAmount, monthlyPayment) => {
    const maxMonthlyRepayment = capital * 0.3; // assume 30% of capital can be used for monthly repayment
    return monthlyPayment <= maxMonthlyRepayment;
  };

  return (
    <div>
      <h1>Gestion des opportunités de financement</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Montant du prêt (DT):</label>
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Période de remboursement (mois):</label>
          <input
            type="number"
            value={repaymentPeriod}
            onChange={(e) => setRepaymentPeriod(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Capital (DT):</label>
          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            required
          />
        </div>
        <button type="submit">Évaluer</button>
      </form>
      {riskEvaluation && <p>Évaluation de la demande: {riskEvaluation}</p>}
      <button onClick={() => setViewRisks(false)}>Retour</button>
    </div>
  );
};

export default GestionRisques;
