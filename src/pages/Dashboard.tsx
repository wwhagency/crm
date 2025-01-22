import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Clients from './dashboard/Clients';
import Services from './dashboard/Services';
import Orders from './dashboard/Orders';
import Payments from './dashboard/Payments';
import Messages from './dashboard/Messages';
import Overview from './dashboard/Overview';

function Dashboard() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/clients" element={<Clients />} />
      <Route path="/services" element={<Services />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/payments" element={<Payments />} />
      <Route path="/messages" element={<Messages />} />
    </Routes>
  );
}

export default Dashboard;