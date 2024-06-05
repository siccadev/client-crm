import React from 'react';
import './page123.css';



const Page1 = ({ demandeFin, handleChange }) => {
  return (
    <div className='container'>
      <h1 className='item'> Informations générales </h1>
      <label className='label'>
        Date de la demande :
        <input type="date" name="DF_Date" value={demandeFin.DF_Date} onChange={handleChange} className="input-field" />
      </label>
       Raison sociale :
        <input type="text" name="Cl_RaiSoc" value={demandeFin.Cl_RaiSoc} onChange={handleChange} className="input-field" />
      <label>
Type de client :
<select name="Cl_Type" value={demandeFin.Cl_Type} onChange={handleChange} className="select-field" >
<option value={0}>Particulier</option>
<option value={1}>Entreprise</option>
</select>
</label>
<label>

</label>
{demandeFin.Cl_Type === '0' && (
  <>
    <label>
    Nom :
    <input type="text" name="Cl_Nom" value={demandeFin.Cl_Nom} onChange={handleChange} className="input-field" />
    </label>
    <label>
    Prénom :
    <input type="text" name="Cl_Prenom" value={demandeFin.Cl_Prenom} onChange={handleChange} className="input-field" />
    </label>
  </>
)}

{demandeFin.Cl_Type === '1' && (
  <label>
  Sigle :
  <input type="text" name="Cl_Sigle" value={demandeFin.Cl_Sigle} onChange={handleChange} className="input-field" />
  </label>
)}
    </div>
  );
};

export default Page1;
