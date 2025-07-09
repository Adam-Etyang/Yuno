import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Edit,
  Save,
  X,
  Camera,
  Settings,
  Bell,
  Shield,
  LogOut
} from 'lucide-react';

const Profile = () => {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEditing(false);
      // Here you would typically update the user data in your backend
      console.log('Updated profile:', formData);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleCancel = () => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      phone: user?.phone || '',
      location: user?.location || '',
      bio: user?.bio || ''
    });
    setIsEditing(false);
  };

  const handleLogout = () => {
    logout();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'faculty':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'student':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
          <p className="text-gray-400">Manage your account settings and preferences</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Profile */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile Header */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardContent className="bg-gray-800/20 p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Avatar className="w-24 h-24 border-4 border-green-500/30">
                        <AvatarImage src={user?.profilePicture} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white text-2xl">
                          {user?.name?.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <Button
                        size="sm"
                        variant="outline"
                        className="absolute -bottom-2 -right-2 w-8 h-8 p-0 bg-gray-800/80 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                      >
                        <Camera className="w-4 h-4" />
                      </Button>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2">{user?.name}</h2>
                      <p className="text-gray-400 mb-2">{user?.email}</p>
                      <Badge className={`${getRoleColor(user?.role)} border`}>
                        {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {isEditing ? (
                      <>
                        <Button
                          onClick={handleSave}
                          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          onClick={handleCancel}
                          className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-red-400 hover:border-red-500 transition-all duration-300"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => setIsEditing(true)}
                        className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-green-400" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Update your personal details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="text-gray-300">Location</Label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 disabled:opacity-50"
                    />
                  </div>

                  <div className="md:col-span-2 space-y-2">
                    <Label htmlFor="bio" className="text-gray-300">Bio</Label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      disabled={!isEditing}
                      rows={4}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-md px-3 py-2 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500 disabled:opacity-50 resize-none"
                      placeholder="Tell us about yourself..."
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Statistics */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Account Statistics</CardTitle>
                <CardDescription className="text-gray-400">
                  Your activity and engagement on the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="text-2xl font-bold text-white mb-1">12</div>
                    <div className="text-gray-400 text-sm">Events Attended</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="text-2xl font-bold text-white mb-1">5</div>
                    <div className="text-gray-400 text-sm">Events Created</div>
                  </div>
                  <div className="text-center p-4 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="text-2xl font-bold text-white mb-1">8</div>
                    <div className="text-gray-400 text-sm">Days Active</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Details */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Account Details</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                      <User className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">User ID</p>
                      <p className="text-white font-medium">{user?.id}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                      <Calendar className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Member Since</p>
                      <p className="text-white font-medium">{formatDate(user?.createdAt)}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email Verified</p>
                      <p className="text-green-400 font-medium">✓ Verified</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Account Settings
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Shield className="w-4 h-4 mr-2" />
                    Privacy & Security
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full justify-start border-red-600 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/30">
                      <span className="text-green-400 text-xs">✓</span>
                    </div>
                    <div>
                      <p className="text-white text-xs">Registered for "Career Fair"</p>
                      <p className="text-gray-400 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                      <span className="text-blue-400 text-xs">📅</span>
                    </div>
                    <div>
                      <p className="text-white text-xs">Updated profile information</p>
                      <p className="text-gray-400 text-xs">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                      <span className="text-purple-400 text-xs">🎉</span>
                    </div>
                    <div>
                      <p className="text-white text-xs">Attended "Spring Festival"</p>
                      <p className="text-gray-400 text-xs">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;