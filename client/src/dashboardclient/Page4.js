import React from 'react';
import './page123.css';

const Page4 = ({ demandeFin, handleChange }) => {
  return (
    <div class="container">
      <h3 className='title'>Informations sur le projet</h3>
      <label className='label'>
        Type de projet :
        <select name="DF_Type_Projet" value={demandeFin.DF_Type_Projet} onChange={handleChange}>
          <option value={0}>Immobilier</option>
          <option value={1}>Professionnel</option>
          <option value={2}>Personnel</option>
        </select>
      </label>
      <label>
        Description du projet :
        <textarea name="DF_Projet" value={demandeFin.DF_Projet} onChange={handleChange} />
      </label>
      <label>
        Montant hors taxe :
        <input type="number" name="DF_Montant_HT" value={demandeFin.DF_Montant_HT} onChange={handleChange}  className="input-field"/>
      </label>
      <label>
        TVA :
        <input type="number" name="DF_TVA" value={demandeFin.DF_TVA} onChange={handleChange}  className="input-field" />
      </label>
      <label>
        Montant TTC :
        <input type="number" name="DF_Montant_TTC" value={demandeFin.DF_Montant_TTC} onChange={handleChange} className="input-field" />
      </label>
  <label>
    Auto-financement TTC :
    <input type="number" step="0.01" name="DF_Auto_FinTTC" value={demandeFin.DF_Auto_FinTTC} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Durée du financement (en mois) :
    <input type="number" name="DF_Durée" value={demandeFin.DF_Durée} onChange={handleChange} className="input-field"/>
  </label>
  <label>
    Type de taux :
    <select name="Type_Taux" value={demandeFin.Type_Taux} onChange={handleChange} className="select-field">
      <option value="0">Fixe</option>
      <option value="1">Variable</option>
    </select>
  </label>
  </div>
  );
};

export default Page4;