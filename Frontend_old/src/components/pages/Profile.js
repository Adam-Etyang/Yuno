import React, { useState } from 'react';
import { Container, Typography, Paper, Box, TextField, Button, Grid, Avatar, Chip } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, updateProfile } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    department: currentUser?.department || ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = () => {
    updateProfile(formData);
    setEditing(false);
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>
      
      <Paper elevation={3} sx={{ p: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <Avatar sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}>
              {currentUser?.name?.charAt(0) || 'U'}
            </Avatar>
            <Chip 
              label={currentUser?.role?.toUpperCase()} 
              color="primary" 
              sx={{ mb: 2 }}
            />
            <Typography variant="h6">{currentUser?.name}</Typography>
            <Typography variant="body2" color="text.secondary">
              {currentUser?.email}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={8}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  disabled={!editing}
                />
              </Grid>
              
              <Grid item xs={12}>
                {editing ? (
                  <Box sx={{ mt: 2 }}>
                    <Button variant="contained" onClick={handleSave} sx={{ mr: 2 }}>
                      Save Changes
                    </Button>
                    <Button variant="outlined" onClick={() => setEditing(false)}>
                      Cancel
                    </Button>
                  </Box>
                ) : (
                  <Button variant="contained" onClick={() => setEditing(true)} sx={{ mt: 2 }}>
                    Edit Profile
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Profile; 