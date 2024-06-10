import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SidebarC from './sidebarclient';
import Header from './headerclient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS
import axios from 'axios';
import { userState } from '../Recoil/Rstore';
import { useRecoilValue } from 'recoil';

const DashboardClient = () => {
  const [totalDemands, setTotalDemands] = useState(0);
  const [approvedDemands, setApprovedDemands] = useState(0);
  const [notApprovedDemands, setNotApprovedDemands] = useState(0);
  const [processingDemands, setProcessingDemands] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const navigate = useNavigate();
  const user = useRecoilValue(userState);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const userID = user.id;

        // Fetch counts from the backend
        const [totalResponse, approvedResponse, notApprovedResponse, processingResponse] = await Promise.all([
          axios.get(`http://localhost:3001/demandesfin/user/${userID}/count`),
          axios.get(`http://localhost:3001/demandesfin/user/${userID}/approved/count`),
          axios.get(`http://localhost:3001/demandesfin/user/${userID}/not-approved/count`),
          axios.get(`http://localhost:3001/demandesfin/user/${userID}/still-processing/count`)
        ]);

        // Extract counts from responses
        const total = totalResponse.data.data;
        const approved = approvedResponse.data.data;
        const notApproved = notApprovedResponse.data.data;
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

    // Fetch counts initially
    fetchCounts();

    // Polling mechanism: Fetch counts every 10 seconds
    const pollingInterval = setInterval(fetchCounts, 10000);

    // Cleanup function to clear interval on component unmount
    return () => clearInterval(pollingInterval);
  }, [user.id]);

  const handleNavigate = (status) => {
    navigate(`/gestion-opportunites/${status}`);
  };

  const submitFeedback = async () => {
    try {
      await axios.post('http://localhost:3001/feedback', { username: user.username, feedback });
      setFeedback('');
      setFeedbackSubmitted(true);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <div>
      <Header />
      <SidebarC />
      <div className="container mt-5">
        {feedbackSubmitted ? (
          <div className="alert alert-success" role="alert">
            Feedback submitted successfully!
          </div>
        ) : (
          <div className="form-group">
            <label htmlFor="feedbackInput">Feedback</label>
            <textarea
              className="form-control"
              id="feedbackInput"
              rows="3"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            ></textarea>
            <button className="btn btn-primary mt-3" onClick={submitFeedback}>
              Submit Feedback
            </button>
          </div>
        )}
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
