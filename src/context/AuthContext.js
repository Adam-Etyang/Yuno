import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock user data - in a real app, this would come from your backend
  const mockUsers = [
    {
      id: 1,
      email: 'student@university.edu',
      name: 'John Student',
      role: 'student',
      department: 'Computer Science',
      studentId: 'STU001'
    },
    {
      id: 2,
      email: 'faculty@university.edu',
      name: 'Dr. Jane Faculty',
      role: 'faculty',
      department: 'Engineering',
      facultyId: 'FAC001'
    },
    {
      id: 3,
      email: 'admin@university.edu',
      name: 'Admin User',
      role: 'admin',
      department: 'Administration',
      adminId: 'ADM001'
    }
  ];

  const login = async (email, password) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Find user by email (mock authentication)
      const user = mockUsers.find(u => u.email === email);
      
      if (user) {
        setCurrentUser(user);
        localStorage.setItem('user', JSON.stringify(user));
        return { success: true, user };
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const signup = async (userData) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user (mock)
      const newUser = {
        id: Date.now(),
        ...userData,
        role: userData.role || 'student'
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updates) => {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  // Check if user can perform admin actions
  const isAdmin = () => currentUser?.role === 'admin';
  
  // Check if user can perform faculty actions
  const isFaculty = () => currentUser?.role === 'faculty' || currentUser?.role === 'admin';
  
  // Check if user can perform student actions
  const isStudent = () => currentUser?.role === 'student' || currentUser?.role === 'faculty' || currentUser?.role === 'admin';

  useEffect(() => {
    // Check for existing user session
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    updateProfile,
    isAdmin,
    isFaculty,
    isStudent,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 