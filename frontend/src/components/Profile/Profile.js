import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { mockEvents, mockTickets, getUserTickets } from '../../mock/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Separator } from '../ui/separator';
import { useToast } from '../../hooks/use-toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Settings, 
  Ticket, 
  Heart,
  Edit3,
  Save,
  QrCode,
  Trophy,
  Star
} from 'lucide-react';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    bio: user?.bio || '',
    location: user?.location || '',
    interests: user?.interests || [],
    profilePicture: user?.profilePicture || ''
  });

  const userTickets = getUserTickets(user?.id);
  const registeredEvents = mockEvents.filter(event => 
    userTickets.some(ticket => ticket.eventId === event.id)
  );

  const availableInterests = ['academic', 'social', 'sports', 'technology', 'arts', 'music', 'business', 'science'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInterestToggle = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSaveProfile = async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update the user profile
      updateProfile(profileData);
      
      setIsEditing(false);
      toast({
        title: "Profile Updated!",
        description: "Your profile has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-100 text-blue-800';
      case 'social':
        return 'bg-purple-100 text-purple-800';
      case 'sports':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getInterestColor = (interest) => {
    const colors = [
      'bg-red-100 text-red-800',
      'bg-blue-100 text-blue-800',
      'bg-green-100 text-green-800',
      'bg-yellow-100 text-yellow-800',
      'bg-purple-100 text-purple-800',
      'bg-pink-100 text-pink-800',
      'bg-indigo-100 text-indigo-800',
      'bg-gray-100 text-gray-800'
    ];
    return colors[availableInterests.indexOf(interest) % colors.length];
  };

  const totalSpent = userTickets.reduce((sum, ticket) => sum + ticket.price, 0);
  const favoriteCategory = userTickets.length > 0 ? 
    userTickets.reduce((acc, ticket) => {
      const event = mockEvents.find(e => e.id === ticket.eventId);
      acc[event?.category] = (acc[event?.category] || 0) + 1;
      return acc;
    }, {}) : {};
  
  const mostAttendedCategory = Object.keys(favoriteCategory).reduce((a, b) => 
    favoriteCategory[a] > favoriteCategory[b] ? a : b, 'academic');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="relative">
                <Avatar className="w-32 h-32">
                  <AvatarImage src={profileData.profilePicture} alt={profileData.name} />
                  <AvatarFallback className="text-2xl">
                    {profileData.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button
                    size="sm"
                    className="absolute -bottom-2 -right-2 rounded-full"
                    onClick={() => {
                      const newUrl = prompt('Enter profile picture URL:');
                      if (newUrl) {
                        setProfileData(prev => ({ ...prev, profilePicture: newUrl }));
                      }
                    }}
                  >
                    <Edit3 className="w-3 h-3" />
                  </Button>
                )}
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900">{profileData.name}</h1>
                    <p className="text-gray-600 capitalize">{user?.role}</p>
                    <div className="flex items-center gap-2 mt-2 justify-center md:justify-start">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{profileData.email}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => {
                      if (isEditing) {
                        handleSaveProfile();
                      } else {
                        setIsEditing(true);
                      }
                    }}
                    disabled={isLoading}
                    className={isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}
                  >
                    {isLoading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    ) : isEditing ? (
                      <Save className="w-4 h-4 mr-2" />
                    ) : (
                      <Edit3 className="w-4 h-4 mr-2" />
                    )}
                    {isLoading ? 'Saving...' : isEditing ? 'Save Changes' : 'Edit Profile'}
                  </Button>
                </div>
                
                {profileData.bio && (
                  <p className="text-gray-600 mb-4">{profileData.bio}</p>
                )}
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-600 justify-center md:justify-start">
                  {profileData.phone && (
                    <div className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      {profileData.phone}
                    </div>
                  )}
                  {profileData.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {profileData.location}
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    Member since {formatDate(user?.createdAt || '2024-01-01')}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600">{userTickets.length}</h3>
              <p className="text-gray-600">Events Attended</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600">${totalSpent}</h3>
              <p className="text-gray-600">Total Spent</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-600">{profileData.interests.length}</h3>
              <p className="text-gray-600">Interests</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-2xl font-bold text-orange-600 capitalize">{mostAttendedCategory}</h3>
              <p className="text-gray-600">Favorite Category</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile">Profile Info</TabsTrigger>
            <TabsTrigger value="tickets">My Tickets</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Info Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    {isEditing ? (
                      <Input
                        id="name"
                        name="name"
                        value={profileData.name}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 rounded">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <p className="p-2 bg-gray-50 rounded text-gray-600">{profileData.email} (Cannot be changed)</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    {isEditing ? (
                      <Input
                        id="phone"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleInputChange}
                        placeholder="Enter phone number"
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 rounded">{profileData.phone || 'Not provided'}</p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    {isEditing ? (
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleInputChange}
                        placeholder="Enter your location"
                      />
                    ) : (
                      <p className="p-2 bg-gray-50 rounded">{profileData.location || 'Not provided'}</p>
                    )}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  {isEditing ? (
                    <Textarea
                      id="bio"
                      name="bio"
                      value={profileData.bio}
                      onChange={handleInputChange}
                      placeholder="Tell us about yourself..."
                      rows={4}
                    />
                  ) : (
                    <p className="p-2 bg-gray-50 rounded min-h-[100px]">{profileData.bio || 'No bio provided'}</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tickets Tab */}
          <TabsContent value="tickets" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Ticket className="w-5 h-5" />
                  My Event Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                {userTickets.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userTickets.map((ticket) => {
                      const event = mockEvents.find(e => e.id === ticket.eventId);
                      return (
                        <Card key={ticket.id} className="border-2 border-dashed border-gray-300 hover:border-blue-300 transition-colors">
                          <CardContent className="p-4">
                            <div className="text-center space-y-3">
                              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                                <QrCode className="w-10 h-10 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium">{event?.title}</h4>
                                <p className="text-sm text-gray-600">
                                  {formatDate(event?.date)} • {event?.time}
                                </p>
                                <p className="text-sm text-gray-600">{event?.location}</p>
                              </div>
                              <div className="space-y-2">
                                <Badge className={getCategoryColor(event?.category)}>
                                  {event?.category}
                                </Badge>
                                <div className="text-xs text-gray-500">
                                  <p>Ticket ID: {ticket.qrCode}</p>
                                  <p>Paid: ${ticket.price}</p>
                                  <p>Method: {ticket.paymentMethod}</p>
                                </div>
                                <Badge className="bg-green-100 text-green-800">
                                  {ticket.status}
                                </Badge>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets yet</h3>
                    <p className="text-gray-600">Register for events to see your tickets here</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Interests Tab */}
          <TabsContent value="interests" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  My Interests
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-medium">Current Interests</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {profileData.interests.length > 0 ? (
                      profileData.interests.map((interest) => (
                        <Badge key={interest} className={getInterestColor(interest)}>
                          {interest}
                          {isEditing && (
                            <button
                              onClick={() => handleInterestToggle(interest)}
                              className="ml-2 hover:bg-black/10 rounded-full p-0.5"
                            >
                              ×
                            </button>
                          )}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-gray-500">No interests selected</p>
                    )}
                  </div>
                </div>

                {isEditing && (
                  <div>
                    <Label className="text-base font-medium">Add Interests</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {availableInterests.filter(interest => !profileData.interests.includes(interest)).map((interest) => (
                        <Button
                          key={interest}
                          variant="outline"
                          size="sm"
                          onClick={() => handleInterestToggle(interest)}
                          className="capitalize"
                        >
                          + {interest}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div>
                  <h4 className="font-medium mb-3">Recommended Events Based on Your Interests</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockEvents
                      .filter(event => profileData.interests.includes(event.category))
                      .slice(0, 4)
                      .map((event) => (
                        <div key={event.id} className="p-3 border rounded-lg hover:bg-gray-50">
                          <div className="flex gap-3">
                            <img
                              src={event.image}
                              alt={event.title}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h5 className="font-medium text-sm">{event.title}</h5>
                              <p className="text-xs text-gray-600">{formatDate(event.date)}</p>
                              <Badge size="sm" className={getCategoryColor(event.category)}>
                                {event.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-medium mb-2">Account Information</h4>
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <p><span className="font-medium">Account Type:</span> {user?.role}</p>
                    <p><span className="font-medium">Member Since:</span> {formatDate(user?.createdAt || '2024-01-01')}</p>
                    <p><span className="font-medium">Total Events:</span> {userTickets.length}</p>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2">Notification Preferences</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates about events and tickets</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Event Reminders</p>
                        <p className="text-sm text-gray-600">Get reminders before your registered events</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">New Event Alerts</p>
                        <p className="text-sm text-gray-600">Be notified about new events matching your interests</p>
                      </div>
                      <input type="checkbox" defaultChecked className="rounded" />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h4 className="font-medium mb-2 text-red-600">Danger Zone</h4>
                  <div className="border border-red-200 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-3">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;