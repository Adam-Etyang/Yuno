import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockEvents } from '../../mock/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Share2,
  Bookmark,
  Edit,
  Trash2,
  ArrowLeft,
  ExternalLink,
  Mail,
  Phone,
  Globe
} from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const fetchEvent = async () => {
      setIsLoading(true);
      try {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500));
        const foundEvent = mockEvents.find(e => e.id === parseInt(id));
        setEvent(foundEvent);
        
        // Check if user is registered (simulate)
        if (isAuthenticated && foundEvent) {
          setIsRegistered(foundEvent.attendees?.includes(user?.id) || false);
        }
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [id, user, isAuthenticated]);

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsRegistered(!isRegistered);
      // Update event attendees count
      setEvent(prev => ({
        ...prev,
        currentAttendees: isRegistered 
          ? prev.currentAttendees - 1 
          : prev.currentAttendees + 1
      }));
    } catch (error) {
      console.error('Error registering for event:', error);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: event.title,
        text: event.description,
        url: window.location.href,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast notification here
    }
  };

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
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
            <div className="w-8 h-8 border-2 border-gray-600 border-t-green-500 rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Loading Event</h2>
          <p className="text-gray-400">Please wait while we load the event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
            <span className="text-gray-400 text-2xl">⚠️</span>
          </div>
          <h2 className="text-xl font-semibold text-white mb-2">Event Not Found</h2>
          <p className="text-gray-400 mb-4">The event you're looking for doesn't exist or has been removed.</p>
          <Button
            onClick={() => navigate('/events')}
            className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/events')}
            className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Events
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Event Image */}
            <div className="relative rounded-lg overflow-hidden">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={`${getCategoryColor(event.category)} border`}>
                  {event.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4">
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={handleShare}
                    className="bg-black/50 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="bg-black/50 backdrop-blur-sm border-gray-600 text-white hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Bookmark className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Event Details */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">{event.title}</CardTitle>
                    <p className="text-gray-400">{event.description}</p>
                  </div>
                  {(user?.role === 'faculty' || user?.role === 'admin') && event.organizer === user?.id && (
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => navigate(`/events/${event.id}/edit`)}
                        className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-600 text-red-400 hover:bg-red-500/10 hover:border-red-500 transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                        <Calendar className="w-5 h-5 text-green-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Date & Time</p>
                        <p className="text-white font-medium">{formatDate(event.date)}</p>
                        <p className="text-gray-300 text-sm">{formatTime(event.time)}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                        <MapPin className="w-5 h-5 text-blue-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Location</p>
                        <p className="text-white font-medium">{event.location}</p>
                        <Button
                          variant="link"
                          className="p-0 h-auto text-green-400 hover:text-green-300"
                        >
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Get Directions
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center border border-purple-500/30">
                        <Users className="w-5 h-5 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Attendees</p>
                        <p className="text-white font-medium">
                          {event.currentAttendees} / {event.maxAttendees}
                        </p>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-1">
                          <div 
                            className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(event.currentAttendees / event.maxAttendees) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                        <DollarSign className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Price</p>
                        <p className="text-white font-medium">
                          {event.price === 0 ? 'Free' : `KES ${event.price}`}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-indigo-500/20 rounded-lg flex items-center justify-center border border-indigo-500/30">
                        <Globe className="w-5 h-5 text-indigo-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Organized by</p>
                        <p className="text-white font-medium">{event.club}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center border border-pink-500/30">
                        <Mail className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-gray-400 text-sm">Contact</p>
                        <p className="text-white font-medium">events@university.edu</p>
                        <p className="text-gray-300 text-sm">+1 (555) 123-4567</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300">
                    This event promises to be an exciting opportunity for students to connect, learn, and grow together. 
                    Don't miss out on this amazing experience!
                  </p>
                  <h4 className="text-white font-semibold mt-4 mb-2">What to Bring:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Student ID</li>
                    <li>• Comfortable clothing</li>
                    <li>• Enthusiasm and positive attitude</li>
                  </ul>
                  <h4 className="text-white font-semibold mt-4 mb-2">Important Notes:</h4>
                  <ul className="text-gray-300 space-y-1">
                    <li>• Please arrive 15 minutes early</li>
                    <li>• Food and drinks will be provided</li>
                    <li>• Photography will be taken during the event</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 sticky top-8">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Register for Event</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white mb-1">
                      {event.price === 0 ? 'Free' : `KES ${event.price}`}
                    </p>
                    <p className="text-gray-400 text-sm">
                      {event.currentAttendees} of {event.maxAttendees} spots filled
                    </p>
                  </div>

                  <Button
                    onClick={handleRegister}
                    disabled={event.currentAttendees >= event.maxAttendees && !isRegistered}
                    className={`w-full ${
                      isRegistered
                        ? 'bg-red-500 hover:bg-red-600 text-white border-0 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300'
                        : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {isRegistered ? 'Cancel Registration' : 'Register Now'}
                  </Button>

                  {event.currentAttendees >= event.maxAttendees && !isRegistered && (
                    <p className="text-red-400 text-sm text-center">
                      This event is full. Join the waitlist to be notified if spots become available.
                    </p>
                  )}

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Registration closes {formatDate(event.date)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Organizer</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-12 h-12 border-2 border-green-500/30">
                    <AvatarImage src="/path-to-organizer-image.jpg" alt="Organizer" />
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
                      {event.club.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-white font-medium">{event.club}</p>
                    <p className="text-gray-400 text-sm">Event Organizer</p>
                  </div>
                </div>
                <div className="mt-4 space-y-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Contact Organizer
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                  >
                    <Globe className="w-4 h-4 mr-2" />
                    Visit Website
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Similar Events */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Similar Events</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-3">
                  {mockEvents
                    .filter(e => e.category === event.category && e.id !== event.id)
                    .slice(0, 3)
                    .map((similarEvent) => (
                      <div
                        key={similarEvent.id}
                        className="p-3 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-green-500/30 cursor-pointer transition-all duration-300"
                        onClick={() => navigate(`/events/${similarEvent.id}`)}
                      >
                        <h4 className="font-medium text-white text-sm mb-1">{similarEvent.title}</h4>
                        <p className="text-gray-400 text-xs">{formatDate(similarEvent.date)}</p>
                        <Badge className={`${getCategoryColor(similarEvent.category)} border text-xs mt-1`}>
                          {similarEvent.category}
                        </Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;