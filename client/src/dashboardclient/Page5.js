import React from 'react';
import './page123.css';

const Page5 = ({ demandeFin, handleChange }) => {
  return (
    <div class="container">
<label>
    Taux d'intérêt du financement :
    <input type="number" step="0.01" name="DF_Taux" value={demandeFin.DF_Taux} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Taux effectif global du financement :
    <input type="number" step="0.01" name="DF_TEG" value={demandeFin.DF_TEG} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Périodicité du financement :
    <input type="text" name="DF_Periode" value={demandeFin.DF_Periode} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Identifiant de la succursale :
    <input type="number" name="IDSuccursales" value={demandeFin.IDSuccursales} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Provenance de la demande de financement :
    <input type="text" name="DF_Provenance" value={demandeFin.DF_Provenance} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Identifiant du chargé du dossier :
    <input type="number" name="DF_Charge_Dossier" value={demandeFin.DF_Charge_Dossier} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Relevé d'identité bancaire du client :
    <input type="text" name="DF_RIB" value={demandeFin.DF_RIB} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Nom et prénom de la caution :
    <input type="text" name="DF_Caution_NP" value={demandeFin.DF_Caution_NP} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Numéro de la carte d'identité nationale de la caution :
    <input type="text" name="DF_Caution_CIN" value={demandeFin.DF_Caution_CIN} onChange={handleChange} className="input-field"/>
  </label>
  <label>
    Nom et prénom de l'hypothécaire :
    <input type="text" name="DF_Hyp_NP" value={demandeFin.DF_Hyp_NP} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Numéro de la carte d'identité nationale de l'hypothécaire :
    <input type="text" name="DF_Hyp_CIN" value={demandeFin.DF_Hyp_CIN} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Objet de l'hypothèque :
    <input type="text" name="DF_Hyp_Objet" value={demandeFin.DF_Hyp_Objet} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Valeur de l'hypothèque :
    <input type="number" name="DF_Hyp_Val" value={demandeFin.DF_Hyp_Val} onChange={handleChange} className="input-field" />
  </label>
</div>
  );
};

export default Page5;