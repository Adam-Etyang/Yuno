import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Chip,
  InputAdornment,
  Pagination
} from '@mui/material';
import { Search, Event, LocationOn, AccessTime, Person } from '@mui/icons-material';

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priceFilter, setPriceFilter] = useState('all');
  const [page, setPage] = useState(1);
  const eventsPerPage = 9;

  // Mock events data
  const mockEvents = [
    {
      id: 1,
      title: 'Computer Science Career Fair',
      description: 'Meet top tech companies and explore career opportunities in computer science.',
      date: '2024-01-15',
      time: '10:00 AM - 4:00 PM',
      location: 'Main Auditorium',
      price: 0,
      category: 'Career',
      organizer: 'CS Department',
      capacity: 200,
      registered: 150,
      image: '/src/assets/images/Shorelight_Career_Fair_Explainer.webp'
    },
    {
      id: 2,
      title: 'Jazz Band Concert',
      description: 'An evening of jazz music performed by the university jazz band.',
      date: '2024-01-18',
      time: '7:00 PM - 9:00 PM',
      location: 'Music Hall',
      price: 15,
      category: 'Music',
      organizer: 'Music Department',
      capacity: 150,
      registered: 120,
      image: '/src/assets/images/Jazz+Band+Festival+2011.jpeg'
    },
    {
      id: 3,
      title: 'Research Symposium',
      description: 'Presentations on cutting-edge research from various departments.',
      date: '2024-01-20',
      time: '9:00 AM - 5:00 PM',
      location: 'Conference Center',
      price: 25,
      category: 'Academic',
      organizer: 'Research Office',
      capacity: 100,
      registered: 85,
      image: '/src/assets/images/research_image.jpeg'
    },
    {
      id: 4,
      title: 'Basketball Tournament',
      description: 'Inter-department basketball tournament with exciting prizes.',
      date: '2024-01-22',
      time: '2:00 PM - 6:00 PM',
      location: 'Sports Complex',
      price: 5,
      category: 'Sports',
      organizer: 'Athletics Department',
      capacity: 300,
      registered: 250,
      image: '/src/assets/images/college-career-fair1.webp'
    },
    {
      id: 5,
      title: 'Art Exhibition',
      description: 'Student and faculty artwork showcase featuring various mediums.',
      date: '2024-01-25',
      time: '6:00 PM - 8:00 PM',
      location: 'Art Gallery',
      price: 0,
      category: 'Arts',
      organizer: 'Art Department',
      capacity: 80,
      registered: 60,
      image: '/src/assets/images/2015 UJE_exhibition Display.jpg'
    },
    {
      id: 6,
      title: 'Startup Pitch Competition',
      description: 'Students pitch their innovative business ideas to investors.',
      date: '2024-01-28',
      time: '1:00 PM - 5:00 PM',
      location: 'Business School',
      price: 10,
      category: 'Business',
      organizer: 'Business School',
      capacity: 120,
      registered: 95,
      image: '/src/assets/images/Being-an-Alumni-of-a-University.jpg'
    }
  ];

  useEffect(() => {
    setEvents(mockEvents);
    setFilteredEvents(mockEvents);
  }, []);

  useEffect(() => {
    let filtered = events;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.organizer.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    // Price filter
    if (priceFilter === 'free') {
      filtered = filtered.filter(event => event.price === 0);
    } else if (priceFilter === 'paid') {
      filtered = filtered.filter(event => event.price > 0);
    }

    setFilteredEvents(filtered);
    setPage(1);
  }, [searchTerm, categoryFilter, priceFilter, events]);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Career': 'primary',
      'Music': 'secondary',
      'Academic': 'success',
      'Sports': 'warning',
      'Arts': 'info',
      'Business': 'error'
    };
    return colors[category] || 'default';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isEventFull = (event) => {
    return event.registered >= event.capacity;
  };

  const isEventSoon = (event) => {
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  const paginatedEvents = filteredEvents.slice(
    (page - 1) * eventsPerPage,
    page * eventsPerPage
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Events
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Discover and join exciting events happening on campus
        </Typography>
      </Box>

      {/* Search and Filters */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryFilter}
              label="Category"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Career">Career</MenuItem>
              <MenuItem value="Music">Music</MenuItem>
              <MenuItem value="Academic">Academic</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Arts">Arts</MenuItem>
              <MenuItem value="Business">Business</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <FormControl fullWidth>
            <InputLabel>Price</InputLabel>
            <Select
              value={priceFilter}
              label="Price"
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <MenuItem value="all">All Prices</MenuItem>
              <MenuItem value="free">Free</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>

      {/* Events Grid */}
      <Grid container spacing={3}>
        {paginatedEvents.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Box
                sx={{
                  height: 200,
                  backgroundImage: `url(${event.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    display: 'flex',
                    gap: 1
                  }}
                >
                  <Chip
                    label={event.category}
                    color={getCategoryColor(event.category)}
                    size="small"
                  />
                  {isEventSoon(event) && (
                    <Chip
                      label="Soon"
                      color="warning"
                      size="small"
                    />
                  )}
                  {isEventFull(event) && (
                    <Chip
                      label="Full"
                      color="error"
                      size="small"
                    />
                  )}
                </Box>
              </Box>
              
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {event.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {event.description}
                </Typography>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Event sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {formatDate(event.date)}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <AccessTime sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.time}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.location}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Person sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                  <Typography variant="body2" color="text.secondary">
                    {event.organizer}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Chip
                    label={event.price === 0 ? 'Free' : `$${event.price}`}
                    color={event.price === 0 ? 'success' : 'primary'}
                    size="small"
                  />
                  <Typography variant="caption" color="text.secondary">
                    {event.registered}/{event.capacity} registered
                  </Typography>
                </Box>
              </CardContent>
              
              <CardActions>
                <Button
                  size="small"
                  variant="contained"
                  fullWidth
                  onClick={() => navigate(`/events/${event.id}`)}
                  disabled={isEventFull(event)}
                >
                  {isEventFull(event) ? 'Event Full' : 'View Details'}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Pagination */}
      {filteredEvents.length > eventsPerPage && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination
            count={Math.ceil(filteredEvents.length / eventsPerPage)}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}

      {/* No Results */}
      {filteredEvents.length === 0 && (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No events found matching your criteria
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your search or filters
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default Events; 