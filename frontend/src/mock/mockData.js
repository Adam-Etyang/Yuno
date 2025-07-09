// Mock data for the campus event management platform

export const mockUsers = [
  {
    id: 1,
    email: 'student@university.edu',
    password: 'student123',
    name: 'Alex Johnson',
    role: 'student',
    profilePicture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    interests: ['sports', 'social', 'academic'],
    tickets: ['1', '3'],
    notifications: [
      { id: 1, message: 'Your ticket for Tech Conference has been confirmed', type: 'success', read: false },
      { id: 2, message: 'New event: Basketball Tournament - Check it out!', type: 'info', read: false }
    ]
  },
  {
    id: 2,
    email: 'faculty@university.edu',
    password: 'faculty123',
    name: 'Dr. Sarah Wilson',
    role: 'faculty',
    profilePicture: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=150&h=150&fit=crop&crop=face',
    createdEvents: ['1', '2', '4'],
    notifications: [
      { id: 1, message: '15 new registrations for your Tech Conference', type: 'info', read: false }
    ]
  },
  {
    id: 3,
    email: 'admin@university.edu',
    password: 'admin123',
    name: 'Michael Chen',
    role: 'admin',
    profilePicture: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdEvents: ['3', '5'],
    notifications: [
      { id: 1, message: 'Event approval needed for Basketball Tournament', type: 'warning', read: false }
    ]
  }
];

export const mockEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    description: 'Annual technology conference featuring industry leaders and cutting-edge innovations.',
    date: '2025-08-15',
    time: '09:00',
    endTime: '17:00',
    location: 'Main Auditorium',
    price: 25,
    category: 'academic',
    club: 'Computer Science Club',
    maxAttendees: 200,
    currentAttendees: 67,
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
    createdBy: 2,
    createdAt: '2025-07-01',
    tags: ['technology', 'conference', 'networking'],
    status: 'published'
  },
  {
    id: '2',
    title: 'Cultural Night',
    description: 'Celebrate diversity with performances, food, and cultural exhibitions from around the world.',
    date: '2025-08-20',
    time: '18:00',
    endTime: '22:00',
    location: 'Student Center',
    price: 15,
    category: 'social',
    club: 'International Student Association',
    maxAttendees: 300,
    currentAttendees: 156,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=600&h=400&fit=crop',
    createdBy: 2,
    createdAt: '2025-07-05',
    tags: ['culture', 'performance', 'international'],
    status: 'published'
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    description: 'Inter-department basketball championship with exciting matches and prizes.',
    date: '2025-08-25',
    time: '14:00',
    endTime: '18:00',
    location: 'Sports Complex',
    price: 10,
    category: 'sports',
    club: 'Athletic Department',
    maxAttendees: 500,
    currentAttendees: 234,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&h=400&fit=crop',
    createdBy: 3,
    createdAt: '2025-07-10',
    tags: ['basketball', 'tournament', 'sports'],
    status: 'published'
  },
  {
    id: '4',
    title: 'Career Fair',
    description: 'Meet with top employers and explore career opportunities in various fields.',
    date: '2025-09-01',
    time: '10:00',
    endTime: '16:00',
    location: 'Exhibition Hall',
    price: 0,
    category: 'academic',
    club: 'Career Services',
    maxAttendees: 400,
    currentAttendees: 89,
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&h=400&fit=crop',
    createdBy: 2,
    createdAt: '2025-07-15',
    tags: ['career', 'networking', 'jobs'],
    status: 'published'
  },
  {
    id: '5',
    title: 'Art Exhibition',
    description: 'Showcasing student artwork and creative projects from various disciplines.',
    date: '2025-09-10',
    time: '12:00',
    endTime: '20:00',
    location: 'Art Gallery',
    price: 8,
    category: 'social',
    club: 'Art Society',
    maxAttendees: 150,
    currentAttendees: 45,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop',
    createdBy: 3,
    createdAt: '2025-07-20',
    tags: ['art', 'exhibition', 'creativity'],
    status: 'published'
  }
];

export const mockTickets = [
  {
    id: '1',
    eventId: '1',
    userId: 1,
    qrCode: 'QR123456789',
    purchaseDate: '2025-07-25',
    price: 25,
    status: 'confirmed',
    paymentMethod: 'M-Pesa'
  },
  {
    id: '3',
    eventId: '3',
    userId: 1,
    qrCode: 'QR987654321',
    purchaseDate: '2025-07-28',
    price: 10,
    status: 'confirmed',
    paymentMethod: 'PayPal'
  }
];

export const mockCalendarEvents = [
  {
    id: '1',
    title: 'Tech Conference 2025',
    start: '2025-08-15T09:00:00',
    end: '2025-08-15T17:00:00',
    location: 'Main Auditorium',
    type: 'event'
  },
  {
    id: '2',
    title: 'Cultural Night',
    start: '2025-08-20T18:00:00',
    end: '2025-08-20T22:00:00',
    location: 'Student Center',
    type: 'event'
  },
  {
    id: '3',
    title: 'Basketball Tournament',
    start: '2025-08-25T14:00:00',
    end: '2025-08-25T18:00:00',
    location: 'Sports Complex',
    type: 'event'
  }
];

export const mockAnalytics = {
  totalEvents: 5,
  totalTicketsSold: 591,
  totalRevenue: 8975,
  monthlyData: [
    { month: 'Jan', events: 2, revenue: 1200 },
    { month: 'Feb', events: 3, revenue: 1800 },
    { month: 'Mar', events: 4, revenue: 2400 },
    { month: 'Apr', events: 2, revenue: 1600 },
    { month: 'May', events: 5, revenue: 3200 },
    { month: 'Jun', events: 3, revenue: 2100 },
    { month: 'Jul', events: 4, revenue: 2800 }
  ],
  categoryStats: [
    { category: 'Academic', count: 2, revenue: 2500 },
    { category: 'Social', count: 2, revenue: 1800 },
    { category: 'Sports', count: 1, revenue: 1200 }
  ]
};

// Helper functions for mock data management
export const getUserById = (id) => mockUsers.find(user => user.id === id);
export const getEventById = (id) => mockEvents.find(event => event.id === id);
export const getTicketById = (id) => mockTickets.find(ticket => ticket.id === id);
export const getUserTickets = (userId) => mockTickets.filter(ticket => ticket.userId === userId);
export const getEventsByCreator = (creatorId) => mockEvents.filter(event => event.createdBy === creatorId);