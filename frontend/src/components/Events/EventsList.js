import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockEvents } from '../../mock/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Calendar, MapPin, Users, Search, Filter, SlidersHorizontal } from 'lucide-react';

const EventsList = () => {
  const [events, setEvents] = useState(mockEvents);
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedClub, setSelectedClub] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const categories = ['all', 'academic', 'social', 'sports'];
  const clubs = ['all', ...new Set(mockEvents.map(event => event.club))];

  useEffect(() => {
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.club.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    // Club filter
    if (selectedClub !== 'all') {
      filtered = filtered.filter(event => event.club === selectedClub);
    }

    // Price filter
    if (priceFilter !== 'all') {
      if (priceFilter === 'free') {
        filtered = filtered.filter(event => event.price === 0);
      } else if (priceFilter === 'paid') {
        filtered = filtered.filter(event => event.price > 0);
      }
    }

    setFilteredEvents(filtered);
  }, [searchTerm, selectedCategory, selectedClub, priceFilter, events]);

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
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'social':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'sports':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedClub('all');
    setPriceFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Campus Events</h1>
          <p className="text-gray-400">Discover and join amazing events happening on campus</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-700 p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search events, locations, or clubs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
              />
            </div>

            {/* Filter Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
            </Button>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-700">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {categories.map(category => (
                        <SelectItem key={category} value={category} className="hover:bg-gray-700">
                          {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Club/Organization
                  </label>
                  <Select value={selectedClub} onValueChange={setSelectedClub}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="All Clubs" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      {clubs.map(club => (
                        <SelectItem key={club} value={club} className="hover:bg-gray-700">
                          {club === 'all' ? 'All Clubs' : club}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price
                  </label>
                  <Select value={priceFilter} onValueChange={setPriceFilter}>
                    <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 focus:ring-green-500">
                      <SelectValue placeholder="All Prices" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700 text-white">
                      <SelectItem value="all" className="hover:bg-gray-700">All Prices</SelectItem>
                      <SelectItem value="free" className="hover:bg-gray-700">Free Events</SelectItem>
                      <SelectItem value="paid" className="hover:bg-gray-700">Paid Events</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={clearFilters} 
                  size="sm"
                  className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                >
                  Clear Filters
                </Button>
                <span className="text-sm text-gray-400 py-2">
                  {filteredEvents.length} event{filteredEvents.length !== 1 ? 's' : ''} found
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-green-500/50 hover:shadow-green-500/20 group">
              <div className="relative h-48" onClick={() => navigate(`/events/${event.id}`)}>
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(event.category)} border`}>
                    {event.category}
                  </Badge>
                </div>
                <div className="absolute top-4 right-4">
                  <div className="bg-black/80 backdrop-blur-sm rounded-lg p-2 text-center shadow-lg">
                    <div className="text-sm font-bold text-white">
                      {formatDate(event.date).split(' ')[1]}
                    </div>
                    <div className="text-xs text-gray-300">
                      {formatDate(event.date).split(' ')[0]}
                    </div>
                  </div>
                </div>
              </div>
              <CardHeader className="bg-gray-800/30">
                <CardTitle className="text-lg text-white group-hover:text-green-400 transition-colors duration-300">{event.title}</CardTitle>
                <p className="text-sm text-gray-400 line-clamp-2">{event.description}</p>
              </CardHeader>
              <CardContent className="bg-gray-800/20">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-gray-300">
                    <Calendar className="w-4 h-4 mr-2 text-green-400" />
                    {formatDate(event.date)} at {event.time}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <MapPin className="w-4 h-4 mr-2 text-green-400" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-300">
                    <Users className="w-4 h-4 mr-2 text-green-400" />
                    {event.currentAttendees} / {event.maxAttendees} attendees
                  </div>
                  <div className="text-xs text-gray-500">
                    Organized by {event.club}
                  </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-green-400">
                    {event.price === 0 ? 'Free' : `KES ${event.price}`}
                  </span>
                  <Button
                    onClick={() => navigate(`/events/${event.id}`)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300"
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-700">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">No events found</h3>
            <p className="text-gray-400 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsList;