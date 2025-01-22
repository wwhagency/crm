import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Building2, Shield } from 'lucide-react';
import { useAuthStore } from '../store/authStore';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn, user } = useAuthStore();

  // Redirect if already logged in as admin
  if (user?.role === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  }

  // Redirect non-admin users to regular dashboard
  if (user && user.role !== 'admin') {
    return <Navigate to="/dashboard" />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password, true); // true flag for admin login
    } catch (err) {
      setError('Invalid admin credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <div className="relative">
            <Building2 className="h-12 w-12 text-blue-600" />
            <Shield className="h-6 w-6 text-red-500 absolute -bottom-2 -right-2" />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">Admin Portal</h2>
        <p className="text-center text-gray-600 mb-6">Sign in to manage your CRM</p>
        
        {error && (
          <div className="bg-red-50 text-red-500 p-3 rounded-md mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Admin Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Sign In as Admin
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Not an admin?{' '}
          <Link to="/login" className="text-blue-600 hover:text-blue-700">
            Regular Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AdminLogin;