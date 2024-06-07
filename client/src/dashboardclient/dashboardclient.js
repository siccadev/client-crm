import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarC from './sidebarclient';
import Header from './headerclient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import axios from 'axios';

const DashboardClient = () => {
  const [totalDemands, setTotalDemands] = useState(0);
  const [approvedDemands, setApprovedDemands] = useState(0);
  const [notApprovedDemands, setNotApprovedDemands] = useState(0);
  const [processingDemands, setProcessingDemands] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the demands from the backend
    const fetchDemands = async () => {
      try {
        const response = await axios.get('http://localhost:3001/demandesfin');
        const data = response.data;

        // Logging to debug
        console.log('Fetched data:', data);

        // Calculate the counts based on the data
        const total = data.length;
        const approved = data.filter(demand => demand.approvalStatus === 'Approved').length;
        const notApproved = data.filter(demand => demand.approvalStatus === 'Declined').length;
        const processing = data.filter(demand => demand.approvalStatus === 'Processing').length;

        // Logging to debug
        console.log('Total demands:', total);
        console.log('Approved demands:', approved);
        console.log('Not approved demands:', notApproved);
        console.log('Processing demands:', processing);

        // Update the state with the counts
        setTotalDemands(total);
        setApprovedDemands(approved);
        setNotApprovedDemands(notApproved);
        setProcessingDemands(processing);
      } catch (error) {
        console.error('Error fetching demands:', error);
      }
    };

    fetchDemands();
  }, []); // Run only once on component mount

  const handleNavigate = (status) => {
    navigate(`/gestion-opportunites/${status}`);
  };

  return (
    <div>
      <Header />
      <SidebarC />
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-4">
            <div className="card" onClick={() => handleNavigate('all')}>
              <div className="card-body">
                <h5 className="card-title">Total Demands</h5>
                <h6 className="card-subtitle mb-2 text-muted">Finance Demands Filled</h6>
                <p className="card-text display-4">{totalDemands}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" onClick={() => handleNavigate('approved')}>
              <div className="card-body">
                <h5 className="card-title">Approved Demands</h5>
                <h6 className="card-subtitle mb-2 text-muted">Number of Approved Demands</h6>
                <p className="card-text display-4 text-success">{approvedDemands}</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" onClick={() => handleNavigate('declined')}>
              <div className="card-body">
                <h5 className="card-title">Not Approved Demands</h5>
                <h6 className="card-subtitle mb-2 text-muted">Number of Not Approved Demands</h6>
                <p className="card-text display-4 text-danger">{notApprovedDemands}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <div className="card" onClick={() => handleNavigate('processing')}>
              <div className="card-body">
                <h5 className="card-title">Processing Demands</h5>
                <h6 className="card-subtitle mb-2 text-muted">Number of Demands that are still being processed</h6>
                <p className="card-text display-4 text-warning">{processingDemands}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
