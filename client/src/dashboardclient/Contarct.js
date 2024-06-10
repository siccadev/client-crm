import React, { useState } from 'react';
import Modal from 'react-modal';

const ContractForm = () => {
  const [formData, setFormData] = useState({
    contract_number: '',
    contract_type: '',
    start_date: '',
    end_date: '',
    financing_mode: '',
    monthly_amount: '',
    equipment_type: '',
    owner_first_name: '',
    owner_last_name: '',
    electronic_signature: ''
  });

  const [showModal, setShowModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/contart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        console.log('Contract created successfully');
        setShowModal(true); // Show modal after successful contract creation
        // Reset form data after successful submission if needed
        // setFormData({ /* reset form data */ });
      } else {
        console.error('Failed to create contract');
      }
    } catch (error) {
      console.error('Error creating contract:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    // Reload the page
    window.location.reload();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="contract_number" value={formData.contract_number} onChange={handleInputChange} placeholder="Contract Number" />
        <input type="text" name="contract_type" value={formData.contract_type} onChange={handleInputChange} placeholder="Contract Type" />
        <input type="date" name="start_date" value={formData.start_date} onChange={handleInputChange} placeholder="Start Date" />
        <input type="date" name="end_date" value={formData.end_date} onChange={handleInputChange} placeholder="End Date" />
        <input type="text" name="financing_mode" value={formData.financing_mode} onChange={handleInputChange} placeholder="Financing Mode" />
        <input type="number" name="monthly_amount" value={formData.monthly_amount} onChange={handleInputChange} placeholder="Monthly Amount" />
        <input type="text" name="equipment_type" value={formData.equipment_type} onChange={handleInputChange} placeholder="Equipment Type" />
        <input type="text" name="owner_first_name" value={formData.owner_first_name} onChange={handleInputChange} placeholder="Owner First Name" />
        <input type="text" name="owner_last_name" value={formData.owner_last_name} onChange={handleInputChange} placeholder="Owner Last Name" />
        <input type="text" name="electronic_signature" value={formData.electronic_signature} onChange={handleInputChange} placeholder="Electronic Signature" />
        
        <button type="submit">Submit</button>
      </form>

      {/* Modal for contract sign-in */}
      <Modal isOpen={showModal} onRequestClose={handleCloseModal}>
        <h2>Contract Signed!</h2>
        {/* Add any content you want to show in the modal */}
        <button onClick={handleCloseModal}>Close</button>
      </Modal>
    </div>
  );
};

export default ContractForm;
