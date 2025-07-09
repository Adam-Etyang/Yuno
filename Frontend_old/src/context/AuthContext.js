import React, { createContext, useContext, useState, useEffect } from 'react';
import {mockUsers} from '../mock/mockData';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{
    //check if user is logged in or not
    const savedUser = localStorage.getItem('campus_user');
    if (savedUser){
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);


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