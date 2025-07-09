import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Paper,
  Avatar
} from '@mui/material';
import {
  Event,
  Add,
  CalendarToday,
  TrendingUp,
  People,
  School,
  AdminPanelSettings,
  Assignment
} from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { currentUser, isAdmin, isFaculty } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalEvents: 24,
    upcomingEvents: 8,
    totalTickets: 156,
    totalRevenue: 2840
  });

  // Mock upcoming events
  const upcomingEvents = [
    {
      id: 1,
      title: 'Computer Science Career Fair',
      date: '2024-01-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      price: 0,
      organizer: 'CS Department'
    },
    {
      id: 2,
      title: 'Jazz Band Concert',
      date: '2024-01-18',
      time: '7:00 PM',
      location: 'Music Hall',
      price: 15,
      organizer: 'Music Department'
    },
    {
      id: 3,
      title: 'Research Symposium',
      date: '2024-01-20',
      time: '9:00 AM',
      location: 'Conference Center',
      price: 25,
      organizer: 'Research Office'
    }
  ];

  const getQuickActions = () => {
    const actions = [
      {
        title: 'Browse Events',
        description: 'View all upcoming events',
        icon: <Event />,
        action: () => navigate('/events'),
        color: 'primary'
      },
      {
        title: 'View Calendar',
        description: 'Check your schedule',
        icon: <CalendarToday />,
        action: () => navigate('/calendar'),
        color: 'secondary'
      }
    ];

    if (isFaculty() || isAdmin()) {
      actions.push({
        title: 'Create Event',
        description: 'Organize a new event',
        icon: <Add />,
        action: () => navigate('/create-event'),
        color: 'success'
      });
    }

    if (isAdmin()) {
      actions.push({
        title: 'View Analytics',
        description: 'Check platform statistics',
        icon: <TrendingUp />,
        action: () => navigate('/analytics'),
        color: 'warning'
      });
    }

    return actions;
  };

  const getRoleSpecificContent = () => {
    if (isAdmin()) {
      return (
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AdminPanelSettings sx={{ mr: 1, verticalAlign: 'middle' }} />
                Admin Overview
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Total Users" 
                    secondary="1,247 registered users" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Event />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Active Events" 
                    secondary="24 events this month" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <TrendingUp />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Revenue" 
                    secondary={`$${stats.totalRevenue} this month`} 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    if (isFaculty()) {
      return (
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <School sx={{ mr: 1, verticalAlign: 'middle' }} />
                Faculty Tools
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Assignment />
                  </ListItemIcon>
                  <ListItemText 
                    primary="My Events" 
                    secondary="Manage your organized events" 
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <People />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Student Attendance" 
                    secondary="Track event participation" 
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>
      );
    }

    return (
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              <School sx={{ mr: 1, verticalAlign: 'middle' }} />
              Student Dashboard
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <Event />
                </ListItemIcon>
                <ListItemText 
                  primary="My Tickets" 
                  secondary="View your purchased tickets" 
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <CalendarToday />
                </ListItemIcon>
                <ListItemText 
                  primary="My Schedule" 
                  secondary="Events you're attending" 
                />
              </ListItem>
            </List>
          </CardContent>
        </Card>
      </Grid>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome back, {currentUser?.name}!
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Here's what's happening on campus today
        </Typography>
      </Box>

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Total Events
              </Typography>
              <Typography variant="h4">
                {stats.totalEvents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Upcoming Events
              </Typography>
              <Typography variant="h4">
                {stats.upcomingEvents}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Tickets Sold
              </Typography>
              <Typography variant="h4">
                {stats.totalTickets}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Revenue
              </Typography>
              <Typography variant="h4">
                ${stats.totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                {getQuickActions().map((action, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Button
                      variant="outlined"
                      fullWidth
                      startIcon={action.icon}
                      onClick={action.action}
                      sx={{ height: 60, justifyContent: 'flex-start' }}
                    >
                      <Box sx={{ textAlign: 'left' }}>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Box>
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Role Specific Content */}
        {getRoleSpecificContent()}
      </Grid>

      {/* Upcoming Events */}
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Upcoming Events
              </Typography>
              <Grid container spacing={2}>
                {upcomingEvents.map((event) => (
                  <Grid item xs={12} md={4} key={event.id}>
                    <Paper elevation={1} sx={{ p: 2 }}>
                      <Typography variant="h6" gutterBottom>
                        {event.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {new Date(event.date).toLocaleDateString()} at {event.time}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        📍 {event.location}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label={event.price === 0 ? 'Free' : `$${event.price}`}
                          color={event.price === 0 ? 'success' : 'primary'}
                          size="small"
                        />
                        <Button 
                          size="small" 
                          variant="outlined"
                          onClick={() => navigate(`/events/${event.id}`)}
                        >
                          View Details
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard; 