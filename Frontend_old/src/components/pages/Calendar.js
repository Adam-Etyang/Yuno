import React from 'react';
import { Container, Typography, Paper, Box } from '@mui/material';

const Calendar = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Calendar
      </Typography>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Calendar View Coming Soon
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This will show all events in a calendar format with scheduling capabilities.
        </Typography>
      </Paper>
    </Container>
  );
};

export default Calendar; 