import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import DashboardAdmin from './dashboardadmin/Dashboardadmin';
import DemandeFinForm from './dashboardclient/DemandeFinForm.js';
import DashboardClient from './dashboardclient/dashboardclient';
import ForgotPassword from './elements/ForgotPassword';
import Login from './elements/Login';
import Register from './elements/Register';
import Home from './home/Home';
import Dashboard from './home/dashboard';
import GestionOpportunites from './dashboardadmin/GestionOpportunites';
import Profile from './dashboardclient/profile.js';
import Total from './dashboardclient/Total.js';
import Approved from './dashboardclient/Approved.js';
import Notapproved from './dashboardclient/Notapproved.js';
import Processing from './dashboardclient/Processing.js';
import Contract from './dashboardclient/Contarct.js';
import SuiviPaiement from './dashboardadmin/suivipaiment.js'; // Import SuiviPaiement component
// Import PaymentStatistics component
import Statistiques from './dashboardadmin/Statistiques.js'; // Import Statistiques component
import { RecoilRoot } from 'recoil';

import risk from "./dashboardadmin/GestionRisques.js";
import Client from './dashboardadmin/ClientStats.js'


function App() {
  return (
    <RecoilRoot>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboardadmin" element={<DashboardAdmin />} />
          <Route path="/dashboardclient" element={<DashboardClient />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/demendesfin" element={<DemandeFinForm />} />
          <Route path="/gestion-opportunites" element={<GestionOpportunites />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Notapproved" element={<Notapproved />} />
          <Route path="/Approved" element={<Approved />} />
          <Route path="/Total" element={<Total />} />
          <Route path="/Processing" element={<Processing />} />
          <Route path="/" element={<DashboardClient />} />
          <Route path="/Contract" element={<Contract />} />
          <Route path="/late-payments" element={<SuiviPaiement />} />          <Route path="/payment-statistics" element={<Statistiques />} /> {/* Add this line for PaymentStatistics component */}
          <Route path="/statistiques" element={<Statistiques />} /> {/* Add this line for Statistiques component */}
          <Route path="/gestion-opportunites/:status" element={<GestionOpportunites />} />
          <Route path="/Clientstats" element={<Client />} />


        </Routes>
      </Router>
    </RecoilRoot>
  );
}

export default App;
