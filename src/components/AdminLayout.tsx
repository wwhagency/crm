import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import {
  Building2,
  Users,
  Package,
  ShoppingCart,
  CreditCard,
  BarChart2,
  LogOut,
  LayoutDashboard,
  Shield
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: LayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuthStore();

  const navigation = [
    { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Users', href: '/admin/dashboard/users', icon: Users },
    { name: 'Services', href: '/admin/dashboard/services', icon: Package },
    { name: 'Orders', href: '/admin/dashboard/orders', icon: ShoppingCart },
    { name: 'Payments', href: '/admin/dashboard/payments', icon: CreditCard },
    { name: 'Analytics', href: '/admin/dashboard/analytics', icon: BarChart2 },
  ];

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg">
        <div className="flex items-center justify-center h-16 px-4 bg-blue-600">
          <Building2 className="h-8 w-8 text-white" />
          <Shield className="h-4 w-4 text-white absolute ml-6 mt-4" />
          <span className="ml-4 text-white font-semibold">Admin Panel</span>
        </div>

        <nav className="mt-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-blue-600 ${
                  location.pathname === item.href ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="ml-3">{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4">
          <div className="flex items-center px-4 py-2 mb-4">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                <span className="text-red-600 font-semibold">
                  {user?.full_name?.[0]?.toUpperCase()}
                </span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">{user?.full_name}</p>
              <p className="text-xs text-red-500 font-semibold uppercase">{user?.role}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center w-full px-4 py-2 text-gray-600 hover:bg-gray-50 hover:text-red-600"
          >
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="p-8">{children}</main>
      </div>
    </div>
  );
}

export default AdminLayout;