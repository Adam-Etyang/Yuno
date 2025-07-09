import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockEvents } from '../../mock/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  TrendingUp, 
  Bookmark,
  Plus,
  Search,
  Filter
} from 'lucide-react';

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter events based on search and category
  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || event.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const myEvents = mockEvents.filter(event => event.attendees?.includes(user?.id));
  const upcomingEvents = mockEvents.filter(event => new Date(event.date) > new Date()).slice(0, 5);

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'social':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'sports':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Student Dashboard</h1>
          <p className="text-gray-400">Welcome back, {user?.name}! Here's what's happening on campus.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">My Events</p>
                  <p className="text-2xl font-bold text-white">{myEvents.length}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                  <Bookmark className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Upcoming</p>
                  <p className="text-2xl font-bold text-white">{upcomingEvents.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Events</p>
                  <p className="text-2xl font-bold text-white">{mockEvents.length}</p>
                </div>
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                  <TrendingUp className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Notifications</p>
                  <p className="text-2xl font-bold text-white">3</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                  <span className="text-yellow-400 text-xl">🔔</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* My Events */}
          <div className="lg:col-span-2">
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">My Events</CardTitle>
                  <Button
                    onClick={() => navigate('/events')}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                  >
                    Browse All Events
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                {myEvents.length > 0 ? (
                  <div className="space-y-4">
                    {myEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-green-500/30 cursor-pointer transition-all duration-300"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white">{event.title}</h3>
                          <Badge className={`${getCategoryColor(event.category)} border`}>
                            {event.category}
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm mb-3 line-clamp-2">{event.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-green-400" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1 text-green-400" />
                            {event.time}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1 text-green-400" />
                            {event.location}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                      <Calendar className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No events yet</h3>
                    <p className="text-gray-400 mb-4">Start exploring campus events to get involved!</p>
                    <Button
                      onClick={() => navigate('/events')}
                      className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                    >
                      Browse Events
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-3">
                  <Button
                    onClick={() => navigate('/events')}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Browse Events
                  </Button>
                  <Button
                    onClick={() => navigate('/calendar')}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    View Calendar
                  </Button>
                  <Button
                    onClick={() => navigate('/profile')}
                    variant="outline"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    My Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Events */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Upcoming Events</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-3">
                  {upcomingEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-3 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-green-500/30 cursor-pointer transition-all duration-300"
                      onClick={() => navigate(`/events/${event.id}`)}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-white text-sm">{event.title}</h4>
                        <Badge className={`${getCategoryColor(event.category)} border text-xs`}>
                          {event.category}
                        </Badge>
                      </div>
                      <div className="space-y-1 text-xs text-gray-400">
                        <div className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1 text-green-400" />
                          {formatDate(event.date)}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-3 h-3 mr-1 text-green-400" />
                          {event.time}
                        </div>
                      </div>
                    </div>
                  ))}
                  {upcomingEvents.length === 0 && (
                    <p className="text-gray-400 text-sm text-center py-4">No upcoming events</p>
                  )}
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
                      <p className="text-white text-xs">Registered for Career Fair</p>
                      <p className="text-gray-400 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                      <span className="text-blue-400 text-xs">📅</span>
                    </div>
                    <div>
                      <p className="text-white text-xs">New event: Jazz Night</p>
                      <p className="text-gray-400 text-xs">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                      <span className="text-purple-400 text-xs">🎉</span>
                    </div>
                    <div>
                      <p className="text-white text-xs">Spring Festival completed</p>
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

export default StudentDashboard;