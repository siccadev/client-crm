import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';

function GestionOpportunites() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  

  useEffect(() => {
    fetch('http://localhost:3001/demandesfin')
      .then(res => {
        // Log the response status and headers for debugging
        console.log('Response Status:', res.status);
        console.log('Response Headers:', res.headers);
  
        if (!res.ok) {
          throw new Error(`Server error: ${res.status}`);
        }
        
        return res.json();
      })
      .then(data => {
        setData(data);
      })
      .catch(err => {
        // Log the error for debugging
        console.error('Fetch error:', err);
      });
  }, []);
  

  const deleteRow = (id) => {
    fetch(`http://localhost:3001/demandesfin/${id}`, { method: 'DELETE' })
      .then(res => {
        setData(data.filter(item => item.IDDemandes_Fin !== id));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateStatus = (id, status) => {
    fetch(`http://localhost:3001/demandesfin/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ statuts: status }),
    })
      .then(res => res.json())
      .then(updatedRow => {
        setData(data.map(item => (item.IDDemandes_Fin === id ? updatedRow : item)));
      })
      .catch(err => {
        console.log(err);
      });
  };

  const viewRow = (id) => {
    const row = data.find(item => item.IDDemandes_Fin === id);
    setSelectedRow(row);
  };

  const csvData = data.map(item => ({
    ...item,
    key: item.IDDemandes_Fin,
    label: 'Actions',
  }));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>IDDemandes_Fin</th>
            <th>DF_Date</th>
            <th>Cl_Type</th>
            <th>Cl_Nom</th>
            <th>Cl_Prenom</th>
            <th>Cl_Sigle</th>
            <th>KFJUR</th>
            <th>KRGM</th>
            <th>Cl_Capital</th>
            <th>KNATS_S</th>
            <th>DF_Type_Projet</th>
            <th>DF_Montant_HT</th>
            <th>DF_TVA</th>
            <th>DF_Montant_TTC</th>
            <th>DF_Auto_FinTTC</th>
            <th>DF_Durée</th>
            <th>DF_Taux</th>
            <th>DF_TEG</th>
            <th>Statuts</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.IDDemandes_Fin}>
              <td>{item.IDDemandes_Fin}</td>
              <td>{item.DF_Date}</td>
              <td>{item.Cl_Type}</td>
              <td>{item.Cl_Nom}</td>
              <td>{item.Cl_Prenom}</td>
              <td>{item.Cl_Sigle}</td>
              <td>{item.KFJUR}</td>
              <td>{item.KRGM}</td>
              <td>{item.Cl_Capital}</td>
              <td>{item.KNATS_S}</td>
              <td>{item.DF_Type_Projet}</td>
              <td>{item.DF_Montant_HT}</td>
              <td>{item.DF_TVA}</td>
              <td>{item.DF_Montant_TTC}</td>
              <td>{item.DF_Auto_FinTTC}</td>
              <td>{item.DF_Durée}</td>
              <td>{item.DF_Taux}</td>
              <td>{item.DF_TEG}</td>
              <td>{item.statuts}</td>
              <td>
                <button onClick={() => viewRow(item.IDDemandes_Fin)}>Lire</button>
                <button onClick={() => deleteRow(item.IDDemandes_Fin)}>Supprimer</button>
                <button onClick={() => updateStatus(item.IDDemandes_Fin, 'Approved')}>Approve</button>
                <button onClick={() => updateStatus(item.IDDemandes_Fin, 'Declined')}>Decline</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedRow && (
        <div className="selected-row-details">
          <h2>Selected Row Details</h2>
          <p>IDDemandes_Fin: {selectedRow.IDDemandes_Fin}</p>
          <p>Date: {selectedRow.DF_Date}</p>
          <p>Type Client: {selectedRow.Cl_Type}</p>
          <p>Nom: {selectedRow.Cl_Nom}</p>
          <p>Prénom: {selectedRow.Cl_Prenom}</p>
          <p>Sigle: {selectedRow.Cl_Sigle}</p>
          <p>KFJUR: {selectedRow.KFJUR}</p>
          <p>KRGM: {selectedRow.KRGM}</p>
          <p>Capital: {selectedRow.Cl_Capital}</p>
          <p>KNATS_S: {selectedRow.KNATS_S}</p>
          <p>Type Projet: {selectedRow.DF_Type_Projet}</p>
          <p>Montant HT: {selectedRow.DF_Montant_HT}</p>
          <p>TVA: {selectedRow.DF_TVA}</p>
          <p>Montant TTC: {selectedRow.DF_Montant_TTC}</p>
          <p>Auto Fin TTC: {selectedRow.DF_Auto_FinTTC}</p>
          <p>Durée: {selectedRow.DF_Durée}</p>
          <p>Taux: {selectedRow.DF_Taux}</p>
          <p>TEG: {selectedRow.DF_TEG}</p>
          <p>Statuts: {selectedRow.statuts}</p>
        </div>
      )}
      <CSVLink data={csvData} filename="demandes_fin.csv">Download CSV</CSVLink>
    </div>
  );
}

export default GestionOpportunites;
