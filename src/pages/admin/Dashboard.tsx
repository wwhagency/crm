import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Overview from './Overview';
import Users from './Users';
import ServiceManagement from './ServiceManagement';
import OrderManagement from './OrderManagement';
import PaymentManagement from './PaymentManagement';
import Analytics from './Analytics';

function AdminDashboard() {
  return (
    <Routes>
      <Route path="/" element={<Overview />} />
      <Route path="/users" element={<Users />} />
      <Route path="/services" element={<ServiceManagement />} />
      <Route path="/orders" element={<OrderManagement />} />
      <Route path="/payments" element={<PaymentManagement />} />
      <Route path="/analytics" element={<Analytics />} />
    </Routes>
  );
}

export default AdminDashboard;