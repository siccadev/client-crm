import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import './demande.css';
import Header from './headerclient';
import SidebarC from './sidebarclient';
import { userState } from '../Recoil/Rstore';
import { useRecoilValue } from 'recoil';

const DemandeFinForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  console.log("Received userData:", user.id);

  const [demandeFin, setDemandeFin] = useState({
    UserID: user.id,
    DF_Date: '',
    Cl_RaiSoc: '',
    Cl_Type: '',
    Cl_Nom: '',
    Cl_Prenom: '',
    Cl_Sigle: '',
    KTPM: '',
    KFJUR: '',
    KRGM: '',
    Cl_RC_Ui: '',
    Cl_Mat_Fisc: '',
    Cl_Date_Creat: '',
    Cl_Capital: '',
    Cl_Adresse: '',
    KLOC: '',
    KTIDPM: '',
    Cl_NumIdPM: '',
    KNATS_S: '',
    GSCode: '',
    Cl_Fonct_Lien_Polit: '',
    Cl_Patrimoine: '',
    Cl_Val_Patrimoine: '',
    Cl_Regime_Matrimonial: '',
    Cl_BE_Nom_Prenom: '',
    Cl_BE_KTIDPM: '',
    Cl_BE_NumId: '',
    Cl_BE_Adresse: '',
    Cl_BE_KPAYS: '',
    DF_Type_Projet: '',
    DF_Projet: '',
    DF_Montant_HT: '',
    DF_TVA: '',
    DF_Montant_TTC: '',
    DF_Auto_FinTTC: '',
    DF_Durée: '',
    Type_Taux: '',
    DF_Taux: '',
    DF_TEG: '',
    DF_Periode: '',
    IDSuccursales: '',
    DF_Provenance: '',
    DF_Charge_Dossier: '',
    DF_RIB: '',
    DF_Caution_NP: '',
    DF_Caution_CIN: '',
    DF_Hyp_NP: '',
    DF_Hyp_CIN: '',
    DF_Hyp_Objet: '',
    DF_Hyp_Val: '',
    state: 1,
    approvalStatus: 'not approved',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [submissionState, setSubmissionState] = useState(null);

  useEffect(() => {
    const fetchApprovalStatus = async () => {
      try {
        const response = await fetch('http://localhost:3001/demandesfin/approvalStatus', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching approval status');
        }

        const data = await response.json();
        setDemandeFin({ ...demandeFin, approvalStatus: data.approvalStatus });
      } catch (error) {
        console.error(error);
      }
    };

    fetchApprovalStatus();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDemandeFin({ ...demandeFin, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/demandesfin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(demandeFin),
      });

      if (!response.ok) {
        throw new Error('Error submitting form data');
      }

      const data = await response.json();
      setSubmissionState(data.state);
      console.log(data);
      if (data.state !== 1) {
        navigate('/dashboardclient');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCurrentPage = () => {
    switch (currentPage) {
      case 1:
        return <Page1 demandeFin={demandeFin} handleChange={handleChange} />;
      case 2:
        return <Page2 demandeFin={demandeFin} handleChange={handleChange} />;
      case 3:
        return <Page3 demandeFin={demandeFin} handleChange={handleChange} />;
      case 4:
        return <Page4 demandeFin={demandeFin} handleChange={handleChange} />;
      case 5:
        return <Page5 demandeFin={demandeFin} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Header />
      <SidebarC />
      <form onSubmit={handleSubmit}>
        {getCurrentPage()}
        <div className="container">
          {currentPage > 1 && (
            <button type="button" onClick={() => setCurrentPage(currentPage - 1)}>
              Précédent
            </button>
          )}
          {currentPage < 5 && (
            <button type="button" onClick={() => setCurrentPage(currentPage + 1)}>
              Suivant
            </button>
          )}
          {currentPage === 5 && (
            <button type="submit">Soumettre</button>
          )}
        </div>
      </form>
      {submissionState === 1 && (
        <div className="processing-box">
          <p>Votre demande est en cours de traitement.</p>
        </div>
      )}
      {submissionState === 0 && (
        <div className="not-approved-box">
          <p>Votre demande n'a pas été approuvée.</p>
        </div>
      )}
      {submissionState === 2 && (
        <div className="approved-box">
          <p>Votre demande a été approuvée.</p>
        </div>
      )}
    </div>
  );
};

export default DemandeFinForm;
