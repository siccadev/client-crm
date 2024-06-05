import React from 'react';
import './page123.css';


const Page3 = ({ demandeFin, handleChange }) => {
  return (
    <div class="container">
<label>
  Secteur d'Activité :
    <input type="text" name="KNATS_S" value={demandeFin.KNATS_S} onChange={handleChange} className="input-field" />
  </label>
  <label>
  Groupe de Sociétés :
    <input type="text" name="GSCode" value={demandeFin.GSCode} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Patrimoine :
    <input type="text" name="Cl_Patrimoine" value={demandeFin.Cl_Patrimoine} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Valeur du patrimoine :
    <input type="number" name="Cl_Val_Patrimoine" value={demandeFin.Cl_Val_Patrimoine} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Régime matrimonial :
    <input type="number" name="Cl_Regime_Matrimonial" value={demandeFin.Cl_Regime_Matrimonial} onChange={handleChange} className="input-field"/>
  </label>
  <label>
    Bénéficiaire effectif - Nom et prénom :
    <input type="text" name="Cl_BE_Nom_Prenom" value={demandeFin.Cl_BE_Nom_Prenom} onChange={handleChange}className="input-field" />
  </label>
  <label>
    Bénéficiaire effectif - Type Id. BE :
    <input type="text" name="Cl_BE_KTIDPM" value={demandeFin.Cl_BE_KTIDPM} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Bénéficiaire effectif - Numéro d'identification :
    <input type="text" name="Cl_BE_NumId" value={demandeFin.Cl_BE_NumId} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Bénéficiaire effectif - Adresse :
    <input type="text" name="Cl_BE_Adresse" value={demandeFin.Cl_BE_Adresse} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Bénéficiaire effectif - Nationalité BE :
    <input type="text" name="Cl_BE_KPAYS" value={demandeFin.Cl_BE_KPAYS} onChange={handleChange}  className="input-field" />
  </label>
    </div>
  );
};

export default Page3;