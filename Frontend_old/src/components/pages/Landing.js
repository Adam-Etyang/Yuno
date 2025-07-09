import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip
} from '@mui/material';
import { KeyboardArrowDown } from '@mui/icons-material';

//landing page :


const Landing = () => {
  const navigate = useNavigate();
  const [typewriterText, setTypewriterText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const typewriterWords = ['Smart booking', 'Event management', 'Campus experiences', 'Seamless planning'];
  
  const typewriterRef = useRef(null);
  const tickerRef = useRef(null);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % typewriterWords.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const word = typewriterWords[currentIndex];
    let charIndex = 0;
    
    const typeInterval = setInterval(() => {
      if (charIndex <= word.length) {
        setTypewriterText(word.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    
    return () => clearInterval(typeInterval);
  }, [currentIndex]);

  const events = [
    {
      id: 1,
      title: 'Annual Tech Conference',
      subtitle: 'June 25, 2025 • Main Auditorium',
      description: 'Join industry leaders and innovators for a day of cutting-edge technology discussions, networking opportunities, and hands-on workshops.',
      image: '/src/assets/images/top-5-conferences-2022-tom.jpeg'
    },
    {
      id: 2,
      title: 'Student Art Exhibition',
      subtitle: 'June 20-25, 2025 • Gallery Hall',
      description: 'Showcase of exceptional student artwork from all disciplines. Experience creativity, talent, and artistic vision from our campus community.',
      image: '/src/assets/images/2015 UJE_exhibition Display.jpg'
    },
    {
      id: 3,
      title: 'Career Fair 2025',
      subtitle: 'June 28, 2025 • Sports Complex',
      description: 'Connect with top employers, explore internship opportunities, and kickstart your career journey with over 100 participating companies.',
      image: '/src/assets/images/Shorelight_Career_Fair_Explainer.webp'
    },
    {
      id: 4,
      title: 'Campus Music Festival',
      subtitle: 'July 5, 2025 • Amphitheater',
      description: 'An evening of live performances featuring local bands, student musicians, and special guest artists. Food trucks and activities included.',
      image: '/src/assets/images/Jazz+Band+Festival+2011.jpeg'
    },
    {
      id: 5,
      title: 'Research Symposium',
      subtitle: 'July 12, 2025 • Science Building',
      description: 'Discover groundbreaking research from faculty and graduate students across all departments. Poster sessions and presentations included.',
      image: '/src/assets/images/research_image.jpeg'
    },
    {
      id: 6,
      title: 'International Food Festival',
      subtitle: 'July 18, 2025 • Campus Quad',
      description: 'Celebrate diversity with authentic cuisine from around the world. Cultural performances, cooking demonstrations, and community fun.',
      image: '/src/assets/images/food-fest.webp'
    }
  ];

  // Typewriter animation
  useEffect(() => {
    const typewriter = typewriterRef.current;
    if (!typewriter) return;
    const words = [
      'Intelligent reservations',
      'seamless planning',
      'effortless scheduling'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    function type() {
      const currentWord = words[wordIndex];
      const currentText = currentWord.substring(0, charIndex);
      typewriter.textContent = currentText;
      if (!isDeleting) {
        if (charIndex < currentWord.length) {
          charIndex++;
          timeout = setTimeout(type, 100);
        } else {
          isDeleting = true;
          timeout = setTimeout(type, 2000);
        }
      } else {
        if (charIndex > 0) {
          charIndex--;
          timeout = setTimeout(type, 50);
        } else {
          isDeleting = false;
          wordIndex = (wordIndex + 1) % words.length;
          timeout = setTimeout(type, 500);
        }
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, []);

  // Ticker animation
  useEffect(() => {
    const ticker = tickerRef.current;
    if (!ticker) return;
    const tickerParent = ticker.parentElement;
    let isPaused = false;
    let speed = 1;
    const originalContent = ticker.innerHTML;
    ticker.innerHTML = originalContent + originalContent + originalContent;
    let x = 0;
    const oneSetWidth = ticker.scrollWidth / 3;
    function animate() {
      if (!isPaused) {
        x -= speed;
        if (Math.abs(x) >= oneSetWidth) {
          x = 0;
        }
        ticker.style.transform = `translateX(${x}px)`;
      }
      requestAnimationFrame(animate);
    }
    tickerParent.addEventListener('mouseenter', () => { isPaused = true; });
    tickerParent.addEventListener('mouseleave', () => { isPaused = false; });
    animate();
    return () => {
      tickerParent.removeEventListener('mouseenter', () => { isPaused = true; });
      tickerParent.removeEventListener('mouseleave', () => { isPaused = false; });
    };
  }, []);

  return (
    <Box sx={{ minHeight: '100vh', background: '#0a0a0a' }}>
      {/* Hero Section */}
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          position: 'relative',
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 255, 136, 0.1))',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 50% 50%, rgba(0, 255, 136, 0.1) 0%, transparent 70%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h1"
            sx={{
              mb: 3,
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 700,
              background: 'linear-gradient(135deg, #00ff88, #00ccff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
              animation: 'title-glow 3s ease-in-out infinite',
              '@keyframes title-glow': {
                '0%, 100%': {
                  textShadow: '0 0 30px rgba(0, 255, 136, 0.5)',
                },
                '50%': {
                  textShadow: '0 0 50px rgba(0, 255, 136, 0.8), 0 0 70px rgba(0, 204, 255, 0.4)',
                },
              },
            }}
          >
            One Platform. Endless Campus Experiences.
          </Typography>
          
          <Typography
            variant="h5"
            sx={{
              mb: 6,
              color: '#cccccc',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            From reserving auditoriums to grabbing event tickets — manage all your campus bookings in one seamless platform.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/login')}
              sx={{
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              Sign In
            </Button>
          </Box>
        </Container>
        
        {/* Scroll Indicator */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            color: '#00ff88',
            animation: 'bounce 2s infinite',
            '@keyframes bounce': {
              '0%, 20%, 50%, 80%, 100%': {
                transform: 'translateX(-50%) translateY(0)',
              },
              '40%': {
                transform: 'translateX(-50%) translateY(-10px)',
              },
              '60%': {
                transform: 'translateX(-50%) translateY(-5px)',
              },
            },
          }}
        >
          <KeyboardArrowDown sx={{ fontSize: 40 }} />
          <Typography variant="body2" sx={{ mt: 1 }}>
            Scroll to explore
          </Typography>
        </Box>
      </Box>

      {/* Call to Action Section */}
      <Box
        sx={{
          py: 12,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.95), rgba(0, 204, 255, 0.1))',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 30% 70%, rgba(0, 255, 136, 0.05) 0%, transparent 70%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 4,
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 600,
            }}
          >
            Streamline your campus experience with{' '}
            <Box
              component="span"
              sx={{
                color: '#00ff88',
                fontWeight: 700,
                textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                animation: 'pulse 2s ease-in-out infinite',
                '@keyframes pulse': {
                  '0%, 100%': {
                    textShadow: '0 0 20px rgba(0, 255, 136, 0.5)',
                  },
                  '50%': {
                    textShadow: '0 0 30px rgba(0, 255, 136, 0.8), 0 0 40px rgba(0, 204, 255, 0.4)',
                  },
                },
              }}
            >
              {typewriterText}
            </Box>
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 6,
              maxWidth: '900px',
              mx: 'auto',
              color: '#cccccc',
              lineHeight: 1.8,
              fontSize: '1.1rem',
            }}
          >
            Transform how your campus manages events and resources with our comprehensive booking system.
            Whether you're organizing academic conferences, student gatherings, or need to reserve lecture halls and equipment,
            our platform connects students, faculty, and administrators in one centralized hub.
            Say goodbye to scheduling conflicts and hello to seamless event planning.
          </Typography>
          
          <Box sx={{ textAlign: 'center' }}>
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/signup')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
                mr: 2,
                mb: { xs: 2, sm: 0 },
              }}
            >
              Sign Up Now
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/events')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.2rem',
                fontWeight: 600,
              }}
            >
              Explore Events
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Events Section */}
      <Box
        sx={{
          py: 12,
          background: '#0a0a0a',
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'radial-gradient(circle at 70% 30%, rgba(0, 204, 255, 0.05) 0%, transparent 70%)',
            zIndex: 0,
          }
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            variant="h2"
            sx={{
              textAlign: 'center',
              mb: 8,
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 600,
              background: 'linear-gradient(135deg, #00ff88, #00ccff)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Upcoming Events
          </Typography>
          
          <Grid container spacing={4}>
            {events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)',
                      boxShadow: '0 20px 40px rgba(0, 255, 136, 0.3)',
                    },
                  }}
                  onClick={() => navigate(`/events/${event.id}`)}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.image}
                    alt={event.title}
                    sx={{
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                    }}
                  />
                  <CardContent sx={{ p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 600,
                        color: '#ffffff',
                      }}
                    >
                      {event.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        mb: 2,
                        color: '#00ff88',
                        fontWeight: 500,
                      }}
                    >
                      {event.subtitle}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#cccccc',
                        lineHeight: 1.6,
                      }}
                    >
                      {event.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/events')}
              sx={{
                px: 6,
                py: 2,
                fontSize: '1.1rem',
                fontWeight: 600,
              }}
            >
              View More Events →
            </Button>
          </Box>
        </Container>
      </Box>

      {/* Ticker Section */}
      <section className="ticker-section">
        <div className="ticker-container">
          <h2 className="ticker-title">Partner Universities</h2>
          <div className="ticker-wrapper">
            <div className="ticker-content" id="ticker" ref={tickerRef}>
              {/* Ticker content will be populated here */}
            </div>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Landing; 