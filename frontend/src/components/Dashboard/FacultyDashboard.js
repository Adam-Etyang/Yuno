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
  Plus,
  Edit,
  Trash2,
  Eye,
  BarChart3,
  Settings,
  Bell
} from 'lucide-react';

const FacultyDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');

  // Filter events created by the current faculty member
  const myEvents = mockEvents.filter(event => event.organizer === user?.id);
  const upcomingEvents = myEvents.filter(event => new Date(event.date) > new Date()).slice(0, 5);
  const pastEvents = myEvents.filter(event => new Date(event.date) < new Date()).slice(0, 5);

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

  const getEventStats = () => {
    const totalEvents = myEvents.length;
    const totalAttendees = myEvents.reduce((sum, event) => sum + event.currentAttendees, 0);
    const averageAttendance = totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0;
    const upcomingCount = upcomingEvents.length;

    return { totalEvents, totalAttendees, averageAttendance, upcomingCount };
  };

  const stats = getEventStats();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Faculty Dashboard</h1>
          <p className="text-gray-400">Manage your events and track engagement, {user?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Events</p>
                  <p className="text-2xl font-bold text-white">{stats.totalEvents}</p>
                </div>
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                  <Calendar className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Total Attendees</p>
                  <p className="text-2xl font-bold text-white">{stats.totalAttendees}</p>
                </div>
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-400 text-sm">Avg. Attendance</p>
                  <p className="text-2xl font-bold text-white">{stats.averageAttendance}</p>
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
                  <p className="text-gray-400 text-sm">Upcoming</p>
                  <p className="text-2xl font-bold text-white">{stats.upcomingCount}</p>
                </div>
                <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                  <Bell className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
            <CardHeader className="bg-gray-800/30">
              <CardTitle className="text-white">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="bg-gray-800/20">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => navigate('/create-event')}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create New Event
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/analytics')}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Analytics
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/settings')}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
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
                  <div className="flex space-x-2">
                    <Button
                      variant={selectedTab === 'overview' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTab('overview')}
                      className={selectedTab === 'overview' 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300'
                      }
                    >
                      Overview
                    </Button>
                    <Button
                      variant={selectedTab === 'upcoming' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTab('upcoming')}
                      className={selectedTab === 'upcoming' 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300'
                      }
                    >
                      Upcoming
                    </Button>
                    <Button
                      variant={selectedTab === 'past' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedTab('past')}
                      className={selectedTab === 'past' 
                        ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300'
                        : 'border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300'
                      }
                    >
                      Past
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                {selectedTab === 'overview' && (
                  <div className="space-y-4">
                    {myEvents.slice(0, 3).map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-green-500/30 cursor-pointer transition-all duration-300"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white">{event.title}</h3>
                          <div className="flex space-x-2">
                            <Badge className={`${getCategoryColor(event.category)} border`}>
                              {event.category}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/events/${event.id}/edit`);
                              }}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
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
                            <Users className="w-4 h-4 mr-1 text-green-400" />
                            {event.currentAttendees}/{event.maxAttendees}
                          </div>
                        </div>
                      </div>
                    ))}
                    {myEvents.length === 0 && (
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
                          <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg font-medium text-white mb-2">No events yet</h3>
                        <p className="text-gray-400 mb-4">Create your first event to get started!</p>
                        <Button
                          onClick={() => navigate('/create-event')}
                          className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                        >
                          Create Event
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {selectedTab === 'upcoming' && (
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-green-500/30 cursor-pointer transition-all duration-300"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white">{event.title}</h3>
                          <div className="flex space-x-2">
                            <Badge className={`${getCategoryColor(event.category)} border`}>
                              {event.category}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/events/${event.id}/edit`);
                              }}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
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
                            <Users className="w-4 h-4 mr-1 text-green-400" />
                            {event.currentAttendees}/{event.maxAttendees}
                          </div>
                        </div>
                      </div>
                    ))}
                    {upcomingEvents.length === 0 && (
                      <p className="text-gray-400 text-center py-8">No upcoming events</p>
                    )}
                  </div>
                )}

                {selectedTab === 'past' && (
                  <div className="space-y-4">
                    {pastEvents.map((event) => (
                      <div
                        key={event.id}
                        className="p-4 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-green-500/30 cursor-pointer transition-all duration-300"
                        onClick={() => navigate(`/events/${event.id}`)}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <h3 className="font-semibold text-white">{event.title}</h3>
                          <div className="flex space-x-2">
                            <Badge className={`${getCategoryColor(event.category)} border`}>
                              {event.category}
                            </Badge>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/events/${event.id}`);
                              }}
                              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                            >
                              <Eye className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-gray-300">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1 text-green-400" />
                            {formatDate(event.date)}
                          </div>
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-1 text-green-400" />
                            {event.currentAttendees} attended
                          </div>
                        </div>
                      </div>
                    ))}
                    {pastEvents.length === 0 && (
                      <p className="text-gray-400 text-center py-8">No past events</p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
                      <p className="text-white text-xs">Event "Career Fair" created</p>
                      <p className="text-gray-400 text-xs">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
                      <span className="text-blue-400 text-xs">📊</span>
                    </div>
                    <div>
                      <p className="text-white text-xs">Analytics updated for "Jazz Night"</p>
                      <p className="text-gray-400 text-xs">1 day ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg border border-gray-600">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-500/30">
                      <span className="text-purple-400 text-xs">🎉</span>
                    </div>
                    <div>
                      <p className="text-white text-xs">"Spring Festival" completed successfully</p>
                      <p className="text-gray-400 text-xs">3 days ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Event Performance</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Most Popular Event</span>
                    <span className="text-white text-sm font-medium">Career Fair</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Avg. Registration Rate</span>
                    <span className="text-green-400 text-sm font-medium">85%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Student Satisfaction</span>
                    <span className="text-blue-400 text-sm font-medium">4.8/5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm">Events This Month</span>
                    <span className="text-purple-400 text-sm font-medium">6</span>
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

export default FacultyDashboard;