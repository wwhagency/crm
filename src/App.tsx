import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import Register from './pages/Register';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';

function App() {
  const { loadUser, user, loading } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route 
          path="/admin/login" 
          element={user?.role === 'admin' ? <Navigate to="/admin/dashboard" /> : <AdminLogin />} 
        />
        <Route 
          path="/admin/dashboard/*" 
          element={
            user?.role === 'admin' 
              ? <AdminLayout><AdminDashboard /></AdminLayout> 
              : <Navigate to="/admin/login" />
          } 
        />

        {/* Client/Staff Routes */}
        <Route 
          path="/login" 
          element={!user ? <Login /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/register" 
          element={!user ? <Register /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard/*" 
          element={
            user && user.role !== 'admin' 
              ? <Layout><Dashboard /></Layout> 
              : <Navigate to="/login" />
          } 
        />
        
        {/* Root redirect */}
        <Route 
          path="/" 
          element={
            user?.role === 'admin' 
              ? <Navigate to="/admin/dashboard" />
              : <Navigate to="/dashboard" />
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;