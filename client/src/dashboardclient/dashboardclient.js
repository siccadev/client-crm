import SidebarC from './sidebarclient';
import React from 'react';
import Header from './headerclient';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap CSS

const DashboardClient = () => {
  // Replace these values with the actual data from your API or database
  const totalDemands = 10;
  const approvedDemands = 7;
  const notApprovedDemands = 3;

  return (
    <div>
      <Header/>
      <SidebarC/>
      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Total Demands</h5>
                <h6 className="card-subtitle mb-2 text-muted">Finance Demands Filled</h6>
                <p className="card-text display-4">{totalDemands}</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Approved Demands</h5>
                <h6 className="card-subtitle mb-2 text-muted">Approved vs Not Approved</h6>
                <div className="d-flex justify-content-between">
                  <p className="card-text display-4 text-success">{approvedDemands}</p>
                  <p className="card-text display-4 text-danger">{notApprovedDemands}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardClient;
