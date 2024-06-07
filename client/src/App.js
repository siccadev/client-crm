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
import { RecoilRoot } from 'recoil';



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

          <Route path="/" element={<DashboardClient />} />
          <Route path="/gestion-opportunites/:status" element={<GestionOpportunites />} />
        </Routes>
      </Router>
    </RecoilRoot>

  );
}

export default App;
