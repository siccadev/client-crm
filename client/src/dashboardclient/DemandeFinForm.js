import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Page1 from './Page1';
import Page2 from './Page2';
import Page3 from './Page3';
import Page4 from './Page4';
import Page5 from './Page5';
import './demande.css';
import Header from './headerclient';
import SidebarC from './sidebarclient';

const DemandeFinForm = () => {
  const [demandeFin, setDemandeFin] = useState({
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
    Cl_Be_Nom_Prenom: '',
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
    status: '',
  });

  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDemandeFin({ ...demandeFin, [name]: value });
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
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
      console.log(data);
      navigate('/dashboardclient');
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
          <button type="button" onClick={() => setCurrentPage(1)}>
            Annuler
          </button>
          <button type="button" onClick={handlePrevious} disabled={currentPage === 1}>
            Previous
          </button>
          {currentPage < 5 && (
            <button type="button" onClick={handleNext}>
              Suivant
            </button>
          )}
          {currentPage === 5 && (
            <button type="submit">Soumettre</button>
          )}
        </div>
      </form>
    </div>
  );
};

export default DemandeFinForm;