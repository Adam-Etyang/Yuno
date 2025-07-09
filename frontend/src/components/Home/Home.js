import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../ui/button';
import { ArrowRight, MousePointer } from 'lucide-react';
import './Home.css';

const Home = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [typewriterText, setTypewriterText] = useState('Smart booking');
  const [isTickerPaused, setIsTickerPaused] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const words = ['Smart booking', 'Easy scheduling', 'Event management', 'Campus hub'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const typewriter = () => {
      const currentWord = words[wordIndex];
      
      if (isDeleting) {
        setTypewriterText(currentWord.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setTypewriterText(currentWord.substring(0, charIndex + 1));
        charIndex++;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        setTimeout(() => {
          isDeleting = true;
        }, 2000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }

      const speed = isDeleting ? 100 : 200;
      setTimeout(typewriter, speed);
    };

    typewriter();
  }, []);

  // Sample events data - using the same structure as the original EventsList
  const events = [
    {
      id: 1,
      title: 'Annual tech conference',
      subtitle: 'June 25, 2025 • Main auditorium',
      description: 'Join industry leaders and innovators for a day of cutting-edge technology discussions, networking opportunities, and hands-on workshops.',
      image: '/images/top-5-conferences-2022-tom.jpeg',
      date: '2025-06-25',
      time: '9:00 AM',
      location: 'Main Auditorium',
      category: 'academic',
      club: 'Computer Science Club',
      currentAttendees: 45,
      maxAttendees: 100,
      price: 0
    },
    {
      id: 2,
      title: 'Student Art exhibition',
      subtitle: 'June 20-25, 2025 • Gallery hall',
      description: 'Showcase of exceptional student artwork from all disciplines. Experience creativity, talent, and artistic vision from our campus community.',
      image: '/images/2015 UJE_exhibition Display.jpg',
      date: '2025-06-20',
      time: '6:00 PM',
      location: 'Gallery Hall',
      category: 'social',
      club: 'Art Society',
      currentAttendees: 23,
      maxAttendees: 50,
      price: 0
    },
    {
      id: 3,
      title: 'Career Fair 2025',
      subtitle: 'June 28, 2025 • Sports Complex',
      description: 'Connect with top employers, explore internship opportunities, and kickstart your career journey with over 100 participating companies.',
      image: '/images/Shorelight_Career_Fair_Explainer.webp',
      date: '2025-06-28',
      time: '10:00 AM',
      location: 'Sports Complex',
      category: 'academic',
      club: 'Career Services',
      currentAttendees: 78,
      maxAttendees: 200,
      price: 0
    },
    {
      id: 4,
      title: 'Campus Music Festival',
      subtitle: 'July 5, 2025 • Amphitheater',
      description: 'An evening of live performances featuring local bands, student musicians, and special guest artists. Food trucks and activities included.',
      image: '/images/Jazz+Band+Festival+2011.jpeg',
      date: '2025-07-05',
      time: '7:00 PM',
      location: 'Amphitheater',
      category: 'social',
      club: 'Music Club',
      currentAttendees: 120,
      maxAttendees: 300,
      price: 15
    },
    {
      id: 5,
      title: 'Research Symposium',
      subtitle: 'July 12, 2025 • Science Building',
      description: 'Discover groundbreaking research from faculty and graduate students across all departments. Poster sessions and presentations included.',
      image: '/images/research_image.jpeg',
      date: '2025-07-12',
      time: '9:00 AM',
      location: 'Science Building',
      category: 'academic',
      club: 'Research Council',
      currentAttendees: 34,
      maxAttendees: 80,
      price: 0
    },
    {
      id: 6,
      title: 'International Food Festival',
      subtitle: 'July 18, 2025 • Campus Quad',
      description: 'Celebrate diversity with authentic cuisine from around the world. Cultural performances, cooking demonstrations, and community fun.',
      image: '/images/food-fest.webp',
      date: '2025-07-18',
      time: '5:00 PM',
      location: 'Campus Quad',
      category: 'social',
      club: 'International Students Association',
      currentAttendees: 89,
      maxAttendees: 150,
      price: 10
    },
    {
      id: 7,
      title: 'Alumni Homecoming',
      subtitle: 'August 2, 2025 • Multiple Venues',
      description: 'Welcome back our distinguished alumni for a weekend of reconnection, celebration, and campus tours. Dinner gala and awards ceremony included.',
      image: '/images/Being-an-Alumni-of-a-University.jpg',
      date: '2025-08-02',
      time: '6:00 PM',
      location: 'Multiple Venues',
      category: 'social',
      club: 'Alumni Association',
      currentAttendees: 156,
      maxAttendees: 250,
      price: 25
    }
  ];

  const partnerUniversities = [
    { name: 'MIT', logo: '/images/MIT_logo.svg' },
    { name: 'Caltech', logo: '/images/Caltech_Logo.png' },
    { name: 'Harvard', logo: '/images/Harvard_University_logo.png' },
    { name: 'Columbia', logo: '/images/Columbia_University_Logo.svg.png' },
    { name: 'Yale', logo: '/images/Yale_University_Logo.png' }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Hero section */}
      <section id="home" className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            One Platform. Endless Campus Experiences.
          </h1>
          <p className="hero-description">
            From reserving auditoriums to grabbing event tickets — manage all your campus bookings in one seamless platform.
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="scroll-indicator">
          <div className="mouse-icon">
            <MousePointer className="w-6 h-6" />
          </div>
          <p className="scroll-text">Scroll to explore</p>
        </div>
      </section>

      {/* Call to action */}
      <section id="about" className="cta-section">
        <div className="cta-content">
          <h2 className="cta-title">
            Streamline your campus experience with{' '}
            <span className="typewriter">{typewriterText}</span>
          </h2>
          <p className="cta-description">
            Transform how your campus manages events and resources with our comprehensive booking system.
            Whether you're organizing academic conferences, student gatherings, or need to reserve lecture halls and
            equipment, our platform connects students, faculty, and administrators in one centralized hub.
            Say goodbye to scheduling conflicts and hello to seamless event planning.
            From ticket management to resource allocation, we've got your campus covered with intelligent booking solutions
            that maximize facility utilization and enhance the overall campus experience.
          </p>
          <div className="cta-buttons">
            {isAuthenticated ? (
              <>
                <Button
                  onClick={() => navigate('/events')}
                  className="btn-primary"
                >
                  Browse Events
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/dashboard')}
                  className="btn-secondary"
                >
                  Go to Dashboard
                </Button>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate('/register')}
                  className="btn-primary"
                >
                  Sign Up Now
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => navigate('/login')}
                  className="btn-secondary"
                >
                  Learn More
                </Button>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Sample events */}
      <section id="events" className="events-section">
        <div className="events-container">
          <h2 className="events-title">Upcoming Events</h2>
          <div className="events-grid">
            {events.slice(0, 6).map((event) => (
              <div
                key={event.id}
                className="event-card-link"
                onClick={() => navigate(`/events/${event.id}`)}
              >
                <div className="event-card">
                  <img src={event.image} alt={event.title} className="event-image" />
                  <div className="event-content">
                    <h3 className="event-title">{event.title}</h3>
                    <p className="event-subtitle">{event.subtitle}</p>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="view-more-container">
          <Button
            variant="outline"
            onClick={() => navigate('/events')}
            className="btn-view-more"
          >
            View more events
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Ticker carousel */}
      <section className="ticker-section">
        <div className="ticker-container">
          <h2 className="ticker-title">Partner Universities</h2>
          <div 
            className="ticker-wrapper"
            onMouseEnter={() => setIsTickerPaused(true)}
            onMouseLeave={() => setIsTickerPaused(false)}
          >
            <div className={`ticker-content ${isTickerPaused ? 'paused' : ''}`}>
              {partnerUniversities.map((university, index) => (
                <img
                  key={index}
                  src={university.logo}
                  alt={university.name}
                  className="ticker-item"
                />
              ))}
              {/* Duplicate for seamless loop */}
              {partnerUniversities.map((university, index) => (
                <img
                  key={`duplicate-${index}`}
                  src={university.logo}
                  alt={university.name}
                  className="ticker-item"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">
          <p className="footer-text">© 2025 Yuno. All rights reserved.</p>
          <p className="footer-links">
            Designed with care.
            <a href="#" className="footer-link">Privacy Policy</a> |
            <a href="#" className="footer-link">Terms of Service</a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;