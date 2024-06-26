import React, { useEffect, useState } from 'react';
import { CSVLink } from 'react-csv';
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { userState } from '../Recoil/Rstore';
import { demandState } from '../Recoil/SRstore';
import jsPDF from 'jspdf';

function Approved() {
  const [data, setData] = useState([]);
  const [contactData, setContactData] = useState(null);
  const user = useRecoilValue(userState);
  const Setdemande = useSetRecoilState(demandState);
  const [selectedRow, setSelectedRow] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [deletedRowId, setDeletedRowId] = useState(null);

  const deleteRow = (id) => {
    axios.delete(`http://localhost:3001/contracts/${id}`)
      .then(() => {
        setDeletedRowId(id);
        setShowModal1(true);
      })
      .catch(err => {
        console.error('Error deleting data:', err);
      });
  };

  const viewRow = (id) => {
    const row = data.find(item => item.IDDemandes_Fin === id);
    setSelectedRow(row);
    setShowModal(true);

    axios.get(`http://localhost:3001/contracts/${id}`)
      .then(response => {
        if (response.data && response.data.data) {
          setContactData(response.data.data);
        } else {
          throw new Error('Invalid contract data');
        }
      })
      .catch(err => {
        console.error('Fetch error:', err);
      });
  };

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/demandesfin/user/${user.id}/approved`)
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
  }, [user.id]);

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
    Statuts: item.approvalStatus
  }));

  const handleViewClick = (id) => {
    navigate(`/Contract`);
    Setdemande(id);
  };

  const handleDownload = () => {
    if (contactData) {
      const doc = new jsPDF();

      doc.text(20, 20, 'Contract Details');
      doc.text(20, 30, `Contract ID: ${contactData.contract_id}`);
      doc.text(20, 40, `Contract Number: ${contactData.contract_number}`);
      doc.text(20, 50, `Contract Type: ${contactData.contract_type}`);
      doc.text(20, 60, `Start Date: ${contactData.start_date}`);
      doc.text(20, 70, `Financing Mode: ${contactData.financing_mode}`);
      doc.text(20, 80, `Monthly Amount: ${contactData.monthly_amount}`);
      doc.text(20, 90, `Equipment Type: ${contactData.equipment_type}`);
      doc.text(20, 100, `Owner First Name: ${contactData.owner_first_name}`);
      doc.text(20, 110, `Owner Last Name: ${contactData.owner_last_name}`);
      doc.text(20, 120, `Electronic Signature: ${contactData.electronic_signature}`);

      doc.save('contract.pdf');
    } else {
      console.error('No contract data available for download');
    }
  };

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
            <th>Contrat en ligne</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
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
              <td>
                <button onClick={() => { handleViewClick(item.IDDemandes_Fin); }}>
                  Contract
                </button>
                <button onClick={() => viewRow(item.IDDemandes_Fin)}>
                  View
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <CSVLink className='button-24' data={csvData} filename={"demandesfin.csv"}>
        Export to CSV
      </CSVLink>

      {showModal && selectedRow && contactData && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => { setShowModal(false); setContactData(null); }}>&times;</span>
            <h2>Contract Details</h2>

            {contactData && (
              <div>
                <p><strong>Contract ID:</strong> {contactData.contract_id}</p>
                <p><strong>Contract Number:</strong> {contactData.contract_number}</p>
                <p><strong>Contract Type:</strong> {contactData.contract_type}</p>
                <p><strong>Start Date:</strong> {contactData.start_date}</p>
                <p><strong>Financing Mode:</strong> {contactData.financing_mode}</p>
                <p><strong>Monthly Amount:</strong> {contactData.monthly_amount}</p>
                <p><strong>Equipment Type:</strong> {contactData.equipment_type}</p>
                <p><strong>Owner First Name:</strong> {contactData.owner_first_name}</p>
                <p><strong>Owner Last Name:</strong> {contactData.owner_last_name}</p>
                <p><strong>Electronic Signature:</strong> {contactData.electronic_signature}</p>
              </div>
            )}

            <button onClick={handleDownload}>Download</button>
            <button onClick={() => deleteRow(selectedRow.IDDemandes_Fin)}>Delete</button>
          </div>
        </div>
      )}

      {showModal1 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => { setShowModal(false); setContactData(null); setShowModal1(false); }}>&times;</span>
            <h2>Deletion Successful</h2>
            <p>The row with ID {deletedRowId} has been successfully deleted.</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Approved;