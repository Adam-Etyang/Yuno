import React from 'react';
import { useAuth } from '../../context/AuthContext';
import StudentDashboard from './StudentDashboard';
import FacultyDashboard from './FacultyDashboard';

const Dashboard = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Admin uses the same dashboard as Faculty for now
  if (user.role === 'student') {
    return <StudentDashboard />;
  } else if (user.role === 'faculty' || user.role === 'admin') {
    return <FacultyDashboard />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Unknown User Role</h2>
        <p className="text-gray-600">Please contact support for assistance.</p>
      </div>
    </div>
  );
};

export default Dashboard;