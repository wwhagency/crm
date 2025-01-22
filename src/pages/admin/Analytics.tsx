import React from 'react';
import { BarChart2, TrendingUp, DollarSign, Users } from 'lucide-react';

function Analytics() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Analytics</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Revenue Overview</h2>
            <DollarSign className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Revenue data visualization coming soon</p>
            </div>
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Growth Metrics</h2>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <TrendingUp className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Growth metrics visualization coming soon</p>
            </div>
          </div>
        </div>

        {/* User Analytics */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">User Analytics</h2>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Users className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>User analytics visualization coming soon</p>
            </div>
          </div>
        </div>

        {/* Service Performance */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Service Performance</h2>
            <BarChart2 className="h-5 w-5 text-gray-400" />
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart2 className="h-12 w-12 mx-auto mb-2 text-gray-400" />
              <p>Service performance metrics coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;