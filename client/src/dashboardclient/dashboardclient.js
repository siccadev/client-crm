import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarC from './sidebarclient';
import Header from './headerclient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import axios from 'axios';
import { userState } from '../Recoil/Rstore';
import { useRecoilValue } from 'recoil';
import ReconnectingWebSocket from 'reconnecting-websocket';

const DashboardClient = () => {
  const [totalDemands, setTotalDemands] = useState(0);
  const [approvedDemands, setApprovedDemands] = useState(0);
  const [notApprovedDemands, setNotApprovedDemands] = useState(0);
  const [processingDemands, setProcessingDemands] = useState(0);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userID = user.id;

        // Total Demands Count
        const totalResponse = await axios.get(`http://localhost:3001/demandesfin/user/${userID}/count`);
        const total = totalResponse.data.data;

        // Approved Demands Count
        const approvedResponse = await axios.get(`http://localhost:3001/demandesfin/user/${userID}/approved/count`);
        const approved = approvedResponse.data.data;

        // Not Approved Demands Count
        const notApprovedResponse = await axios.get(`http://localhost:3001/demandesfin/user/${userID}/not-approved/count`);
        const notApproved = notApprovedResponse.data.data;

        // Still Processing Demands Count
        const processingResponse = await axios.get(`http://localhost:3001/demandesfin/user/${userID}/still-processing/count`);
        const processing = processingResponse.data.data;

        // Update the state with the counts
        setTotalDemands(total);
        setApprovedDemands(approved);
        setNotApprovedDemands(notApproved);
        setProcessingDemands(processing);

      } catch (error) {
        console.error('Error fetching counts:', error);
      }
    };

    fetchCounts();

    // Setup WebSocket connection
    const rws = new ReconnectingWebSocket('ws://localhost:3001');

    rws.onopen = () => {
      console.log('WebSocket connection opened');
    };

    rws.onmessage = (event) => {
      const updatedData = JSON.parse(event.data);
      // Update state based on the received data
      setTotalDemands(updatedData.totalDemands);
      setApprovedDemands(updatedData.approvedDemands);
      setNotApprovedDemands(updatedData.notApprovedDemands);
      setProcessingDemands(updatedData.processingDemands);
    };

    rws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      rws.close();
    };
  }, [user.id]);

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
