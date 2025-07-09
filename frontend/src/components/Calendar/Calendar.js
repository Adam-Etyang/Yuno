import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEvents } from '../../mock/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Users,
  Filter
} from 'lucide-react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const getEventsForDate = (date) => {
    const dateString = formatDate(date);
    return mockEvents.filter(event => event.date === dateString);
  };

  const getAllEventsInMonth = (year, month) => {
    return mockEvents.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
    setSelectedDate(null);
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'academic':
        return 'bg-blue-500';
      case 'social':
        return 'bg-purple-500';
      case 'sports':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getBadgeColor = (category) => {
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

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const monthEvents = getAllEventsInMonth(year, month);

  // Create calendar grid
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate) : [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Event Calendar</h1>
          <p className="text-gray-400">View all campus events in calendar format</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <CalendarIcon className="w-5 h-5 text-green-400" />
                    {monthNames[month]} {year}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth(-1)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => navigateMonth(1)}
                      className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-1 mb-2">
                  {daysOfWeek.map(day => (
                    <div key={day} className="p-2 text-center font-medium text-gray-400 text-sm">
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-1">
                  {calendarDays.map((day, index) => {
                    if (day === null) {
                      return <div key={index} className="h-24 p-1"></div>;
                    }
                    
                    const date = new Date(year, month, day);
                    const dayEvents = getEventsForDate(date);
                    const isSelected = selectedDate && formatDate(selectedDate) === formatDate(date);
                    const isToday = formatDate(date) === formatDate(new Date());
                    
                    return (
                      <div
                        key={day}
                        className={`h-24 p-1 border rounded-lg cursor-pointer transition-all duration-300 ${
                          isSelected ? 'bg-green-500/20 border-green-500/50 shadow-lg shadow-green-500/20' : 
                          isToday ? 'bg-yellow-500/20 border-yellow-500/50 shadow-lg shadow-yellow-500/20' : 
                          'bg-gray-700/30 border-gray-600 hover:bg-gray-700/50 hover:border-green-500/30'
                        }`}
                        onClick={() => setSelectedDate(date)}
                      >
                        <div className="h-full flex flex-col">
                          <div className={`text-sm font-medium ${
                            isToday ? 'text-yellow-400' : 
                            isSelected ? 'text-green-400' : 
                            'text-white'
                          }`}>
                            {day}
                          </div>
                          <div className="flex-1 overflow-hidden">
                            {dayEvents.slice(0, 2).map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className={`text-xs p-1 rounded mb-1 cursor-pointer ${getCategoryColor(event.category)} text-white shadow-sm hover:shadow-md transition-all duration-200`}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  navigate(`/events/${event.id}`);
                                }}
                              >
                                {event.title.substring(0, 15)}...
                              </div>
                            ))}
                            {dayEvents.length > 2 && (
                              <div className="text-xs text-gray-400">
                                +{dayEvents.length - 2} more
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Month Summary */}
            <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-white">Month Summary</CardTitle>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Total Events</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {monthEvents.length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Academic</span>
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                      {monthEvents.filter(e => e.category === 'academic').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Social</span>
                    <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                      {monthEvents.filter(e => e.category === 'social').length}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Sports</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      {monthEvents.filter(e => e.category === 'sports').length}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Date Events */}
            {selectedDate && (
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white">
                    {selectedDate.toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="bg-gray-800/20">
                  {selectedDateEvents.length > 0 ? (
                    <div className="space-y-3">
                      {selectedDateEvents.map((event) => (
                        <div
                          key={event.id}
                          className="p-3 bg-gray-700/30 rounded-lg border border-gray-600 hover:border-green-500/30 cursor-pointer transition-all duration-300"
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-medium text-white text-sm">{event.title}</h4>
                            <Badge className={`${getBadgeColor(event.category)} border text-xs`}>
                              {event.category}
                            </Badge>
                          </div>
                          <div className="space-y-1 text-xs text-gray-400">
                            <div className="flex items-center">
                              <Clock className="w-3 h-3 mr-1 text-green-400" />
                              {event.time}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="w-3 h-3 mr-1 text-green-400" />
                              {event.location}
                            </div>
                            <div className="flex items-center">
                              <Users className="w-3 h-3 mr-1 text-green-400" />
                              {event.currentAttendees}/{event.maxAttendees}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-sm">No events scheduled for this date.</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;