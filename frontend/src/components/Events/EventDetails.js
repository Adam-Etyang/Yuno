import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { mockEvents, mockUsers, mockTickets } from '../../mock/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Separator } from '../ui/separator';
import { useToast } from '../../hooks/use-toast';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Tag, 
  ArrowLeft, 
  Share2, 
  Heart, 
  CreditCard,
  QrCode,
  CheckCircle
} from 'lucide-react';

const EventDetails = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [event, setEvent] = useState(null);
  const [isRegistered, setIsRegistered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    const foundEvent = mockEvents.find(e => e.id === id);
    setEvent(foundEvent);
    
    if (user && foundEvent) {
      const userTickets = mockTickets.filter(ticket => ticket.userId === user.id);
      const hasTicket = userTickets.some(ticket => ticket.eventId === foundEvent.id);
      setIsRegistered(hasTicket);
    }
  }, [id, user]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
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

  const handleRegister = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    if (event.price > 0) {
      setShowPaymentModal(true);
      return;
    }

    // Handle free event registration
    setIsLoading(true);
    
    setTimeout(() => {
      setIsRegistered(true);
      setIsLoading(false);
      toast({
        title: "Registration Successful!",
        description: `You've successfully registered for ${event.title}. Check your profile for your ticket.`,
      });
    }, 1500);
  };

  const handlePayment = (paymentMethod) => {
    setIsLoading(true);
    setShowPaymentModal(false);
    
    setTimeout(() => {
      setIsRegistered(true);
      setIsLoading(false);
      toast({
        title: "Payment Successful!",
        description: `Payment processed via ${paymentMethod}. You're registered for ${event.title}!`,
      });
    }, 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link Copied!",
      description: "Event link has been copied to your clipboard.",
    });
  };

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading event details...</p>
        </div>
      </div>
    );
  }

  const organizer = mockUsers.find(u => u.id === event.createdBy);
  const attendancePercentage = (event.currentAttendees / event.maxAttendees) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/events')}
          className="mb-6 flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Events
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Event Image */}
            <div className="relative h-96 rounded-lg overflow-hidden mb-6">
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <Badge className={getCategoryColor(event.category)}>
                  {event.category}
                </Badge>
              </div>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  variant="secondary"
                  size="icon"
                  onClick={handleShare}
                  className="bg-white/80 hover:bg-white"
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="icon"
                  className="bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Event Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-3xl">{event.title}</CardTitle>
                <p className="text-gray-600 text-lg">{event.description}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{formatDate(event.date)}</p>
                      <p className="text-sm text-gray-600">{event.time} - {event.endTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-red-600" />
                    <div>
                      <p className="font-medium">{event.location}</p>
                      <p className="text-sm text-gray-600">Campus Location</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">{event.currentAttendees} / {event.maxAttendees}</p>
                      <p className="text-sm text-gray-600">Attendees</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Tag className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-medium">{event.club}</p>
                      <p className="text-sm text-gray-600">Organized by</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Tags */}
                <div>
                  <h4 className="font-medium mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
                      <Badge key={index} variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Attendance Progress */}
                <div>
                  <h4 className="font-medium mb-2">Event Capacity</h4>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${attendancePercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {Math.round(attendancePercentage)}% full
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Organizer Info */}
            {organizer && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Event Organizer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={organizer.profilePicture} alt={organizer.name} />
                      <AvatarFallback>{organizer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-lg">{organizer.name}</h4>
                      <p className="text-gray-600 capitalize">{organizer.role}</p>
                      <p className="text-sm text-gray-500">{organizer.email}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Registration Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-center">
                  {event.price === 0 ? 'Free Event' : `$${event.price}`}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isRegistered ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-green-800">You're Registered!</h4>
                      <p className="text-sm text-green-600">Check your profile for your ticket</p>
                    </div>
                    <Button
                      onClick={() => navigate('/profile')}
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      View My Ticket
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Button
                      onClick={handleRegister}
                      disabled={isLoading || event.currentAttendees >= event.maxAttendees}
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isLoading ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      ) : event.price > 0 ? (
                        <CreditCard className="w-4 h-4 mr-2" />
                      ) : (
                        <CheckCircle className="w-4 h-4 mr-2" />
                      )}
                      {isLoading ? 'Processing...' : 
                       event.currentAttendees >= event.maxAttendees ? 'Event Full' :
                       event.price > 0 ? 'Buy Ticket' : 'Register Free'}
                    </Button>
                    
                    {event.currentAttendees >= event.maxAttendees && (
                      <p className="text-sm text-red-600 text-center">
                        This event is currently full. Check back later for cancellations.
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Event Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Event Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Category</span>
                  <Badge className={getCategoryColor(event.category)}>
                    {event.category}
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">
                    {event.time} - {event.endTime}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium">
                    {new Date(event.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Status</span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    {event.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md mx-4">
            <CardHeader>
              <CardTitle>Complete Payment</CardTitle>
              <p className="text-gray-600">Select your payment method</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-blue-600">${event.price}</p>
                <p className="text-sm text-gray-600">for {event.title}</p>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={() => handlePayment('M-Pesa')}
                  className="w-full bg-green-600 hover:bg-green-700"
                  disabled={isLoading}
                >
                  Pay with M-Pesa
                </Button>
                <Button
                  onClick={() => handlePayment('PayPal')}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={isLoading}
                >
                  Pay with PayPal
                </Button>
              </div>
              
              <Button
                variant="outline"
                onClick={() => setShowPaymentModal(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default EventDetails;