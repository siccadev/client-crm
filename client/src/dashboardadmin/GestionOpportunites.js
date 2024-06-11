import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import './GestionOpportunites.css';

function GestionOpportunites() {
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [deletedRowId, setDeletedRowId] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/demandesfin')
      .then(response => {
        if (Array.isArray(response.data.data)) {
          setData(response.data.data);
        } else {
          throw new Error('Data is not an array');
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  }, []);

  const deleteRow = (id) => {
    axios.delete(`http://localhost:3001/demandesfin/${id}`)
      .then(() => {
        setData(data.filter(item => item.IDDemandes_Fin !== id));
        setDeletedRowId(id);
        setShowModal1(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:3001/demandesfin/${id}`, { status: status })
      .then(response => {
        const updatedRow = response.data.data[0];  // Assuming the API returns the updated row in this structure
        const newState = status === 'Approved' ? 2 : 0; // 2 for approved, 0 for not approved
        const updatedDemand = data.find(item => item.IDDemandes_Fin === id);
        if (updatedDemand) {
          updatedDemand.state = newState;
          updatedDemand.approvalStatus = status;
          setData([...data]);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const viewRow = (id) => {
    const row = data.find(item => item.IDDemandes_Fin === id);
    setSelectedRow(row);
    setShowModal(true);
  };

  const sanitizeValue = (value) => {
    if (value && typeof value === 'object') {
      return JSON.stringify(value);
    }
    return value;
  };

  const csvData = data.map(item => ({
    IDDemandes_Fin: item.IDDemandes_Fin,
    UserID: item.UserID,
    DF_Date: item.DF_Date,
    Cl_Type: item.Cl_Type,
    Cl_Nom: item.Cl_Nom,
    Cl_Prenom: item.Cl_Prenom,
    Cl_Sigle: item.Cl_Sigle,
    KFJUR: item.KFJUR,
    KRGM: item.KRGM ? JSON.stringify(item.KRGM) : '',
    Cl_Capital: item.Cl_Capital,
    KNATS_S: item.KNATS_S,
    DF_Type_Projet: item.DF_Type_Projet,
    DF_Montant_HT: item.DF_Montant_HT,
    DF_TVA: item.DF_TVA,
    DF_Montant_TTC: item.DF_Montant_TTC,
    DF_Auto_FinTTC: item.DF_Auto_FinTTC,
    DF_Durée: item.DF_Durée,
    DF_Taux: item.DF_Taux,
    DF_TEG: item.DF_TEG,
    Statuts: item.statuts
  }));

  return (
    <div>
      <h1>Gestion Opportunités</h1>
      <table>
        <thead>
          <tr>
            <th>IDDemandes_Fin</th>
            <th>User</th>
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
            <th>state</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(data) && data.map((item, index) => (
            <tr key={`${item.IDDemandes_Fin}-${index}`}>
              <td>{sanitizeValue(item.IDDemandes_Fin)}</td>
              <td>{sanitizeValue(item.UserID)}</td>
              <td>{sanitizeValue(item.DF_Date)}</td>
              <td>{sanitizeValue(item.Cl_Type)}</td>
              <td>{sanitizeValue(item.Cl_Nom)}</td>
              <td>{sanitizeValue(item.Cl_Prenom)}</td>
              <td>{sanitizeValue(item.Cl_Sigle)}</td>
              <td>{sanitizeValue(item.KFJUR)}</td>
              <td>{sanitizeValue(item.KRGM)}</td>
              <td>{sanitizeValue(item.Cl_Capital)}</td>
              <td>{sanitizeValue(item.KNATS_S)}</td>
              <td>{sanitizeValue(item.DF_Type_Projet)}</td>
              <td>{sanitizeValue(item.DF_Montant_HT)}</td>
              <td>{sanitizeValue(item.DF_TVA)}</td>
              <td>{sanitizeValue(item.DF_Montant_TTC)}</td>
              <td>{sanitizeValue(item.DF_Auto_FinTTC)}</td>
              <td>{sanitizeValue(item.DF_Durée)}</td>
              <td>{sanitizeValue(item.DF_Taux)}</td>
              <td>{sanitizeValue(item.DF_TEG)}</td>
              <td>{sanitizeValue(item.approvalStatus)}</td>
              <td>{sanitizeValue(item.state)}</td>
              <td>
                <button onClick={() => updateStatus(item.IDDemandes_Fin, 'Approved')}>Approve</button>
                <button onClick={() => updateStatus(item.IDDemandes_Fin, 'Declined')}>Decline</button>
                <button onClick={() => viewRow(item.IDDemandes_Fin)}>View</button>
                <button onClick={() => deleteRow(item.IDDemandes_Fin)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CSVLink className='button-24' data={csvData} filename={"demandesfin.csv"}>
        Export to CSV
      </CSVLink>

      {showModal && selectedRow && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            <h2>Demand Details</h2>
            <p><strong>ID:</strong> {selectedRow.IDDemandes_Fin}</p>
            <p><strong>User ID:</strong> {selectedRow.UserID}</p>
            <p><strong>Date:</strong> {selectedRow.DF_Date}</p>
            <p><strong>Client Type:</strong> {selectedRow.Cl_Type}</p>
            <p><strong>Client Name:</strong> {selectedRow.Cl_Nom}</p>
            <p><strong>Client First Name:</strong> {selectedRow.Cl_Prenom}</p>
            <p><strong>Client Sigle:</strong> {selectedRow.Cl_Sigle}</p>
            <p><strong>KFJUR:</strong> {selectedRow.KFJUR}</p>
            <p><strong>Client Company Name:</strong> {selectedRow.Cl_RaiSoc}</p>
            <p><strong>Client Tax Number:</strong> {selectedRow.Cl_RC_UI}</p>
            <p><strong>Client Fiscal Number:</strong> {selectedRow.Cl_Mat_Fisc}</p>
            <p><strong>Client Creation Date:</strong> {selectedRow.Cl_Date_Creat}</p>
            <p><strong>Client Capital:</strong> {selectedRow.Cl_Capital}</p>
            <p><strong>Client Address:</strong> {selectedRow.Cl_Adresse}</p>
            <p><strong>Client ID:</strong> {selectedRow.Cl_NumIdPM}</p>
            <p><strong>Project:</strong> {selectedRow.DF_Projet}</p>
            <p><strong>Amount (HT):</strong> {selectedRow.DF_Montant_HT}</p>
            <p><strong>TVA:</strong> {selectedRow.DF_TVA}</p>
            <p><strong>Amount (TTC):</strong> {selectedRow.DF_Montant_TTC}</p>
            <p><strong>Self-Financed Amount (TTC):</strong> {selectedRow.DF_Auto_FinTTC}</p>
            <p><strong>Duration:</strong> {selectedRow.DF_Durée}</p>
            <p><strong>Rate:</strong> {selectedRow.DF_Taux}</p>
            <p><strong>TEG:</strong> {selectedRow.DF_TEG}</p>
            <p><strong>Period:</strong> {sanitizeValue(selectedRow.DF_Periode)}</p>
            <p><strong>Branch ID:</strong> {selectedRow.IDSuccursales}</p>
            <p><strong>Origin:</strong> {selectedRow.DF_Provenance}</p>
            <p><strong>File Manager:</strong> {selectedRow.DF_Charge_Dossier}</p>
            <p><strong>RIB:</strong> {selectedRow.DF_RIB}</p>
            <p><strong>Caution CIN:</strong> {selectedRow.DF_Caution_CIN}</p>
            <p><strong>Hypothecated NP:</strong> {selectedRow.DF_Hyp_NP}</p>
            <p><strong>Hypothecated CIN:</strong> {selectedRow.DF_Hyp_CIN}</p>
            <p><strong>Hypothecated Object:</strong> {selectedRow.DF_Hyp_Objet}</p>
            <p><strong>Hypothecated Value:</strong> {selectedRow.DF_Hyp_Val}</p>
            <p><strong>Status:</strong> {selectedRow.status}</p>
            <p><strong>State:</strong> {selectedRow.state}</p>
            <p><strong>Approval Status:</strong> {selectedRow.approvalStatus}</p>
            <button onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showModal1 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowModal1(false)}>&times;</span>
            <h2>Row Deleted</h2>
            <p>Row with ID {deletedRowId} has been deleted.</p>
            <button className='button-24' onClick={() => setShowModal1(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionOpportunites;
