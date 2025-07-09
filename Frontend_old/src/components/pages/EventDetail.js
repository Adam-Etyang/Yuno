import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import {
  Event,
  LocationOn,
  AccessTime,
  Person,
  AttachMoney,
  Group,
  CalendarToday,
  Description,
  Payment
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const EventDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookingDialog, setBookingDialog] = useState(false);
  const [bookingData, setBookingData] = useState({
    quantity: 1,
    paymentMethod: 'mpesa'
  });
  const [bookingLoading, setBookingLoading] = useState(false);

  // Mock event data
  const mockEvent = {
    id: parseInt(id),
    title: 'Computer Science Career Fair',
    description: 'Join us for an exciting career fair featuring top technology companies from around the world. This event provides students with the opportunity to network with industry professionals, learn about internship and job opportunities, and gain insights into the latest trends in computer science and technology.',
    longDescription: `The Computer Science Career Fair is our flagship event that brings together students, faculty, and industry leaders. 

    What to expect:
    • Networking sessions with tech professionals
    • Company presentations and Q&A sessions
    • Resume review workshops
    • Interview preparation tips
    • Internship and job opportunities
    • Free refreshments and giveaways
    
    This is a must-attend event for any student interested in pursuing a career in technology.`,
    date: '2024-01-15',
    time: '10:00 AM - 4:00 PM',
    location: 'Main Auditorium',
    address: '123 University Ave, Campus Center',
    price: 0,
    category: 'Career',
    organizer: 'CS Department',
    organizerEmail: 'cs-dept@university.edu',
    capacity: 200,
    registered: 150,
    image: 'https://via.placeholder.com/800x400/1976d2/ffffff?text=Career+Fair',
    requirements: [
      'Bring multiple copies of your resume',
      'Dress professionally',
      'Research participating companies beforehand',
      'Prepare elevator pitch'
    ],
    schedule: [
      { time: '10:00 AM', activity: 'Registration and Welcome' },
      { time: '10:30 AM', activity: 'Opening Remarks' },
      { time: '11:00 AM', activity: 'Company Presentations' },
      { time: '12:00 PM', activity: 'Networking Lunch' },
      { time: '1:00 PM', activity: 'Resume Review Sessions' },
      { time: '2:00 PM', activity: 'Interview Workshops' },
      { time: '3:00 PM', activity: 'One-on-One Networking' },
      { time: '4:00 PM', activity: 'Closing Remarks' }
    ]
  };

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setEvent(mockEvent);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleBooking = () => {
    setBookingDialog(true);
  };

  const handleBookingSubmit = async () => {
    setBookingLoading(true);
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    setBookingLoading(false);
    setBookingDialog(false);
    // Show success message or redirect
    alert('Booking successful! Check your email for confirmation.');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isEventFull = () => {
    return event?.registered >= event?.capacity;
  };

  const isEventSoon = () => {
    if (!event) return false;
    const eventDate = new Date(event.date);
    const today = new Date();
    const diffTime = eventDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7 && diffDays >= 0;
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  if (!event) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography>Event not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Button onClick={() => navigate('/events')} sx={{ mb: 2 }}>
          ← Back to Events
        </Button>
        <Typography variant="h3" gutterBottom>
          {event.title}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label={event.category} color="primary" />
          {isEventSoon() && <Chip label="Soon" color="warning" />}
          {isEventFull() && <Chip label="Full" color="error" />}
          <Chip 
            label={event.price === 0 ? 'Free' : `$${event.price}`} 
            color={event.price === 0 ? 'success' : 'primary'} 
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Event Image */}
          <Card sx={{ mb: 3 }}>
            <Box
              sx={{
                height: 400,
                backgroundImage: `url(${event.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          </Card>

          {/* Event Description */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                About This Event
              </Typography>
              <Typography variant="body1" paragraph>
                {event.longDescription}
              </Typography>
            </CardContent>
          </Card>

          {/* Event Schedule */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Event Schedule
              </Typography>
              <List>
                {event.schedule.map((item, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <AccessTime />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.activity}
                      secondary={item.time}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Requirements */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                What to Bring
              </Typography>
              <List>
                {event.requirements.map((requirement, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={requirement} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Booking Card */}
          <Card sx={{ mb: 3, position: 'sticky', top: 20 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Book Your Spot
              </Typography>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="h4" color="primary">
                  {event.price === 0 ? 'Free' : `$${event.price}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  per person
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <CalendarToday />
                  </ListItemIcon>
                  <ListItemText
                    primary={formatDate(event.date)}
                    secondary={event.time}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOn />
                  </ListItemIcon>
                  <ListItemText
                    primary={event.location}
                    secondary={event.address}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Group />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${event.registered}/${event.capacity} registered`}
                    secondary="spots remaining"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Person />
                  </ListItemIcon>
                  <ListItemText
                    primary={event.organizer}
                    secondary="Event Organizer"
                  />
                </ListItem>
              </List>

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleBooking}
                disabled={isEventFull()}
                sx={{ mt: 2 }}
              >
                {isEventFull() ? 'Event Full' : 'Book Now'}
              </Button>

              {isEventFull() && (
                <Alert severity="info" sx={{ mt: 2 }}>
                  This event is at full capacity. Contact the organizer to join the waitlist.
                </Alert>
              )}
            </CardContent>
          </Card>

          {/* Organizer Contact */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Contact Organizer
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Have questions about this event?
              </Typography>
              <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                href={`mailto:${event.organizerEmail}`}
              >
                Email Organizer
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Booking Dialog */}
      <Dialog open={bookingDialog} onClose={() => setBookingDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Book Event Ticket</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">{event.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {formatDate(event.date)} at {event.time}
            </Typography>
          </Box>
          
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Number of Tickets"
                type="number"
                value={bookingData.quantity}
                onChange={(e) => setBookingData({...bookingData, quantity: parseInt(e.target.value)})}
                inputProps={{ min: 1, max: 5 }}
              />
            </Grid>
            {event.price > 0 && (
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Payment Method</InputLabel>
                  <Select
                    value={bookingData.paymentMethod}
                    label="Payment Method"
                    onChange={(e) => setBookingData({...bookingData, paymentMethod: e.target.value})}
                  >
                    <MenuItem value="mpesa">M-Pesa</MenuItem>
                    <MenuItem value="paypal">PayPal</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            )}
            <Grid item xs={12}>
              <Typography variant="h6">
                Total: ${event.price * bookingData.quantity}
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setBookingDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleBookingSubmit} 
            variant="contained"
            disabled={bookingLoading}
          >
            {bookingLoading ? 'Processing...' : 'Confirm Booking'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EventDetail; 