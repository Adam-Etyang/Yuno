import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  DollarSign,
  Image,
  Plus,
  ArrowLeft,
  Save,
  Eye
} from 'lucide-react';

const CreateEvent = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    endTime: '',
    location: '',
    maxAttendees: '',
    price: '0',
    image: '',
    tags: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategoryChange = (value) => {
    setFormData(prev => ({
      ...prev,
      category: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would typically send the data to your backend
      console.log('Event data:', formData);
      
      // Navigate to the new event or events list
      navigate('/events');
    } catch (error) {
      console.error('Error creating event:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreview = () => {
    // This would open a preview modal or navigate to a preview page
    console.log('Preview event:', formData);
  };

  const categories = [
    { value: 'academic', label: 'Academic' },
    { value: 'social', label: 'Social' },
    { value: 'sports', label: 'Sports' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'career', label: 'Career' },
    { value: 'workshop', label: 'Workshop' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300 mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
              <h1 className="text-3xl font-bold text-white mb-2">Create New Event</h1>
              <p className="text-gray-400">Fill in the details below to create your event</p>
            </div>
            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={handlePreview}
                className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white">Basic Information</CardTitle>
                  <CardDescription className="text-gray-400">
                    Provide the essential details about your event
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-gray-800/20 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-gray-300">
                      Event Title *
                    </Label>
                    <Input
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Enter event title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-gray-300">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      name="description"
                      placeholder="Describe your event in detail"
                      value={formData.description}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="category" className="text-gray-300">
                      Category *
                    </Label>
                    <Select value={formData.category} onValueChange={handleCategoryChange}>
                      <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 focus:ring-green-500">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-800 border-gray-700 text-white">
                        {categories.map(category => (
                          <SelectItem key={category.value} value={category.value} className="hover:bg-gray-700">
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-gray-300">
                      Event Image URL
                    </Label>
                    <div className="relative">
                      <Image className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="image"
                        name="image"
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={handleChange}
                        className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Date & Time */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-green-400" />
                    Date & Time
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Set when your event will take place
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-gray-800/20">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date" className="text-gray-300">
                        Date *
                      </Label>
                      <Input
                        id="date"
                        name="date"
                        type="date"
                        value={formData.date}
                        onChange={handleChange}
                        required
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="time" className="text-gray-300">
                        Start Time *
                      </Label>
                      <Input
                        id="time"
                        name="time"
                        type="time"
                        value={formData.time}
                        onChange={handleChange}
                        required
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endTime" className="text-gray-300">
                        End Time
                      </Label>
                      <Input
                        id="endTime"
                        name="endTime"
                        type="time"
                        value={formData.endTime}
                        onChange={handleChange}
                        className="bg-gray-700/50 border-gray-600 text-white focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Location & Capacity */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white flex items-center">
                    <MapPin className="w-5 h-5 mr-2 text-green-400" />
                    Location & Capacity
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Where will your event take place and how many people can attend?
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-gray-800/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-300">
                        Location *
                      </Label>
                      <Input
                        id="location"
                        name="location"
                        type="text"
                        placeholder="Enter event location"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="maxAttendees" className="text-gray-300">
                        Maximum Attendees *
                      </Label>
                      <Input
                        id="maxAttendees"
                        name="maxAttendees"
                        type="number"
                        min="1"
                        placeholder="Enter maximum capacity"
                        value={formData.maxAttendees}
                        onChange={handleChange}
                        required
                        className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white flex items-center">
                    <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                    Pricing
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    Set the price for your event (0 for free events)
                  </CardDescription>
                </CardHeader>
                <CardContent className="bg-gray-800/20">
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-gray-300">
                      Ticket Price (KES)
                    </Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={formData.price}
                      onChange={handleChange}
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500"
                    />
                    <p className="text-gray-400 text-sm">
                      Enter 0 for free events
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Event Preview */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 sticky top-8">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white">Event Preview</CardTitle>
                </CardHeader>
                <CardContent className="bg-gray-800/20">
                  <div className="space-y-4">
                    {formData.image && (
                      <div className="aspect-video bg-gray-700/50 rounded-lg overflow-hidden">
                        <img
                          src={formData.image}
                          alt="Event preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-white">
                        {formData.title || 'Event Title'}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-3">
                        {formData.description || 'Event description will appear here...'}
                      </p>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center text-gray-300">
                        <Calendar className="w-4 h-4 mr-2 text-green-400" />
                        {formData.date || 'Date not set'}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Clock className="w-4 h-4 mr-2 text-green-400" />
                        {formData.time || 'Time not set'}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <MapPin className="w-4 h-4 mr-2 text-green-400" />
                        {formData.location || 'Location not set'}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <Users className="w-4 h-4 mr-2 text-green-400" />
                        Max: {formData.maxAttendees || 'Not set'}
                      </div>
                      <div className="flex items-center text-gray-300">
                        <DollarSign className="w-4 h-4 mr-2 text-green-400" />
                        {formData.price === '0' || !formData.price ? 'Free' : `KES ${formData.price}`}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white">Actions</CardTitle>
                </CardHeader>
                <CardContent className="bg-gray-800/20">
                  <div className="space-y-3">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white border-0 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isLoading ? (
                        <div className="flex items-center">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Creating Event...
                        </div>
                      ) : (
                        <>
                          <Save className="w-4 h-4 mr-2" />
                          Create Event
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/dashboard')}
                      className="w-full border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-green-400 hover:border-green-500 transition-all duration-300"
                    >
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tips */}
              <Card className="bg-gray-800/50 backdrop-blur-sm border border-gray-700">
                <CardHeader className="bg-gray-800/30">
                  <CardTitle className="text-white">Tips for Success</CardTitle>
                </CardHeader>
                <CardContent className="bg-gray-800/20">
                  <div className="space-y-3 text-sm">
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Use clear, descriptive titles</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Include all relevant details in the description</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Choose an appropriate category</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Set realistic capacity limits</p>
                    </div>
                    <div className="flex items-start space-x-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">Add high-quality images</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;