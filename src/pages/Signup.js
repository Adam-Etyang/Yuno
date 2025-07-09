import React, { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Link,
  Grid
} from '@mui/material';
import { useAuth } from '../context/AuthContext';

const initialForm = {
  orgName: '',
  email: '',
  password: ''
};

const Signup = () => {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState({ label: '', color: '', percent: 0, show: false });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  // Validation functions
  const validateOrgName = () => {
    const value = form.orgName.trim();
    if (value.length < 2) return 'Organization name must be at least 2 characters long';
    if (!/^[a-zA-Z0-9\s'-]+$/.test(value)) return 'Organization name can only contain letters, numbers, spaces, hyphens, and apostrophes';
    return '';
  };
  const validateEmail = () => {
    const value = form.email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
    return '';
  };
  const validatePassword = () => {
    const value = form.password;
    if (value.length < 8) return 'Password must be at least 8 characters long';
    if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
    return '';
  };

  // Password strength logic
  const updatePasswordStrength = (value) => {
    if (!value) return setPasswordStrength({ label: '', color: '', percent: 0, show: false });
    let strength = 0;
    if (value.length >= 8) strength++;
    if (/[a-z]/.test(value)) strength++;
    if (/[A-Z]/.test(value)) strength++;
    if (/\d/.test(value)) strength++;
    if (/[^a-zA-Z\d]/.test(value)) strength++;
    let label = 'Very Weak', color = '#dc2626';
    switch (strength) {
      case 0:
      case 1: label = 'Very Weak'; color = '#dc2626'; break;
      case 2: label = 'Weak'; color = '#ea580c'; break;
      case 3: label = 'Fair'; color = '#eab308'; break;
      case 4: label = 'Good'; color = '#22c55e'; break;
      case 5: label = 'Strong'; color = '#16a34a'; break;
      default: break;
    }
    setPasswordStrength({ label: `Password strength: ${label}`, color, percent: (strength / 5) * 100, show: true });
  };

  // Step validation
  const validateStep = () => {
    let err = {};
    if (step === 1) {
      const msg = validateOrgName();
      if (msg) err.orgName = msg;
    }
    if (step === 2) {
      const msg = validateEmail();
      if (msg) err.email = msg;
    }
    if (step === 3) {
      const msg = validatePassword();
      if (msg) err.password = msg;
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  // Navigation
  const handleNext = () => {
    if (validateStep()) {
      if (step < 4) {
        setStep(step + 1);
      } else {
        setSuccess(true);
        setStep(5);
      }
    }
  };
  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  // Input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (name === 'password') updatePasswordStrength(value);
  };

  // Progress bar
  const progressPercent = ((step - 1) / 4) * 100;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!validateStep()) {
      return;
    }

    setLoading(true);

    try {
      const result = await signup(form);
      if (result.success) {
        navigate('/dashboard');
      } else {
        setErrors({ general: result.error });
      }
    } catch (err) {
      setErrors({ general: 'An error occurred during signup' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper elevation={3} sx={{ padding: 4, width: '100%' }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            Join Yuno
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" gutterBottom>
            Create your account to start managing campus events
          </Typography>

          {errors.general && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {errors.general}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
            </div>
            <div className="step-indicator" id="stepIndicator">
              {step < 5 ? `Step ${step} of 4` : ''}
            </div>
            <div className="step-content">
              {/* Step 1 */}
              <div className={`step${step === 1 ? ' active' : ''}`} data-step="1">
                <h2>Welcome!</h2>
                <p>Let's create your account. We'll guide you through each step to make this as easy as possible.</p>
                <div className="form-group">
                  <label htmlFor="orgName">What's the name of your organization?</label>
                  <input
                    type="text"
                    id="orgName"
                    name="orgName"
                    placeholder="Enter organization name"
                    value={form.orgName}
                    onChange={handleChange}
                    className={errors.orgName ? 'error' : ''}
                    autoFocus={step === 1}
                  />
                  <div className={`error-message${errors.orgName ? ' show' : ''}`} id="orgNameError">{errors.orgName}</div>
                </div>
              </div>
              {/* Step 2 */}
              <div className={`step${step === 2 ? ' active' : ''}`} data-step="2">
                <h2>Contact Information</h2>
                <p>We'll need your email address to keep in touch and secure your account.</p>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'error' : ''}
                    autoFocus={step === 2}
                  />
                  <div className={`error-message${errors.email ? ' show' : ''}`} id="emailError">{errors.email}</div>
                </div>
              </div>
              {/* Step 3 */}
              <div className={`step${step === 3 ? ' active' : ''}`} data-step="3">
                <h2>Secure Your Account</h2>
                <p>Choose a strong password to keep your account safe.</p>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    className={errors.password ? 'error' : ''}
                    autoFocus={step === 3}
                  />
                  <div
                    className="password-strength"
                    id="passwordStrength"
                    style={{ display: passwordStrength.show ? 'block' : 'none' }}
                  >
                    <div className="strength-bar">
                      <div
                        className="strength-fill"
                        id="strengthFill"
                        style={{ width: `${passwordStrength.percent}%`, background: passwordStrength.color }}
                      ></div>
                    </div>
                    <div className="strength-text" id="strengthText" style={{ color: passwordStrength.color }}>
                      {passwordStrength.label}
                    </div>
                  </div>
                  <div className={`error-message${errors.password ? ' show' : ''}`} id="passwordError">{errors.password}</div>
                </div>
              </div>
              {/* Step 4: Review */}
              <div className={`step${step === 4 ? ' active' : ''}`} data-step="4">
                <h2>Almost Done!</h2>
                <p>Let's review your information before creating your account.</p>
                <div className="form-group">
                  <p><strong>Organization:</strong> <span id="reviewOrgName">{form.orgName}</span></p>
                  <p><strong>Email:</strong> <span id="reviewEmail">{form.email}</span></p>
                  <p>By creating an account, you agree to our Terms of Service and Privacy Policy.</p>
                </div>
              </div>
              {/* Step 5: Success */}
              <div className={`step${step === 5 ? ' active' : ''}`} data-step="5">
                <div className="success-animation">
                  <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none" />
                    <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8" />
                  </svg>
                  <h2>Account Created Successfully!</h2>
                  <p>Welcome to our platform, <span id="successOrgName">{form.orgName}</span>! You can now start exploring.</p>
                </div>
              </div>
            </div>
            <div className="button-group">
              <button
                type="button"
                className="btn btn-secondary"
                id="prevBtn"
                style={{ display: step > 1 && step < 5 ? 'inline-block' : 'none' }}
                onClick={handlePrev}
              >
                Previous
              </button>
              <button
                type="button"
                className="btn btn-primary"
                id="nextBtn"
                onClick={handleNext}
                style={{ display: step < 5 ? 'inline-block' : 'none' }}
              >
                {step === 4 ? 'Create Account' : 'Next'}
              </button>
            </div>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Signup; 