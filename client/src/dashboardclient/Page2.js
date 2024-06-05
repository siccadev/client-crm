import React from 'react';
import './page123.css';


const Page2 = ({ demandeFin, handleChange }) => {
  return (
    <div class="container">
      <h2 className='title'>Informations sur le client</h2>
  <label>
     Type PM :
    <input type="text" name="KTPM" value={demandeFin.KTPM} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Forme Juridique :
    <input type="text" name="KFJUR" value={demandeFin.KFJUR} onChange={handleChange}  className="input-field" />
  </label>
  <label>
    Régime Fiscal :
    <input type="text" name="KRGM" value={demandeFin.KRGM} onChange={handleChange}  className="input-field" />
  </label>
  <label>
  Reg. Comm. / Id. Unique :
    <input type="text" name="Cl_RC_UI" value={demandeFin.Cl_RC_UI} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Matricule Fiscal :
    <input type="text" name="Cl_Mat_Fisc" value={demandeFin.Cl_Mat_Fisc} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Date de création :
    <input type="date" name="Cl_Date_Creat" value={demandeFin.Cl_Date_Creat} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Capital :
    <input type="number" name="Cl_Capital" value={demandeFin.Cl_Capital} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Adresse :
    <input type="text" name="Cl_Adresse" value={demandeFin.Cl_Adresse} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Code Postal :
    <input type="text" name="KLOC" value={demandeFin.KLOC} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Type Id. PM :
    <input type="text" name="KTIDPM" value={demandeFin.KTIDPM} onChange={handleChange} className="input-field" />
  </label>
  <label>
    Numéro d'identification PM :
    <input type="text" name="Cl_NumIdPM" value={demandeFin.Cl_NumIdPM} onChange={handleChange} className="input-field" />
  </label>
  <label>
  Activité :
    <input type="text" name="KNAT_SC" value={demandeFin.KNAT_SC} onChange={handleChange} className="input-field" />
  </label>
  </div>
  );
};

export default Page2;
