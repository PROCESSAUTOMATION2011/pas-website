import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VerticalHeader from '../components/VerticalHeader';
import API_BASE from '../utils/api';

export default function EnquiryPage() {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    address: '',
    email: '',
    contactNo: '',
    requirementDetails: ''
  });
  
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [errors, setErrors] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  // Auto-close success popup after 5 seconds
  useEffect(() => {
    if (showSuccessPopup) {
      const timer = setTimeout(() => {
        setShowSuccessPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessPopup]);

  // Load OTP verification state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('enquiry_otp_verified');
    const savedEmail = localStorage.getItem('enquiry_email');
    if (savedState === 'true' && savedEmail) {
      setOtpVerified(true);
      setOtpSent(true);
      setFormData(prev => ({ ...prev, email: savedEmail }));
    }
  }, []);

  // Save OTP verification state to localStorage
  useEffect(() => {
    if (otpVerified) {
      localStorage.setItem('enquiry_otp_verified', 'true');
      localStorage.setItem('enquiry_email', formData.email);
    } else {
      localStorage.removeItem('enquiry_otp_verified');
      localStorage.removeItem('enquiry_email');
    }
  }, [otpVerified, formData.email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Special handling for contact number - only allow 10 digits (stored without +91)
    if (name === 'contactNo') {
      // Only allow digits, limit to 10 digits
      const numbersOnly = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, [name]: numbersOnly }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company name is required';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }

    if (!formData.contactNo.trim()) {
      newErrors.contactNo = 'Contact number is required';
    } else {
      // Validate: exactly 10 digits
      if (!/^\d{10}$/.test(formData.contactNo)) {
        newErrors.contactNo = 'Invalid format. Enter 10-digit mobile number';
      }
    }

    if (!formData.requirementDetails.trim()) {
      newErrors.requirementDetails = 'Requirement details are required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    // Validate email first
    if (!formData.email.trim()) {
      setErrors({ email: 'Email is required' });
      setStatus({ type: 'error', message: 'Please enter your email address' });
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setErrors({ email: 'Invalid email format' });
      setStatus({ type: 'error', message: 'Please enter a valid email address' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });
    setOtp('');

    try {
      const response = await axios.post(`${API_BASE}/api/enquiry/otp/send`, {
        email: formData.email,
        contactNo: formData.contactNo ? `+91${formData.contactNo}` : undefined
      }, {
        timeout: 30000, // 30 seconds timeout for mobile networks
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        setOtpSent(true);
        setOtpVerified(false); // Reset verification state
        setStatus({ type: 'success', message: response.data.message || 'OTP sent to your email' });
        // Clear localStorage when new OTP is sent
        localStorage.removeItem('enquiry_otp_verified');
      } else {
        setStatus({ type: 'error', message: response.data.message || 'Failed to send OTP' });
    }
    } catch (error) {
      console.error('OTP Send Error:', error);
      
      // Detailed error handling
      let errorMessage = 'Failed to send OTP. Please try again.';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your internet connection. If the problem persists, contact support.';
      } else if (error.response) {
        // Server responded with error
        if (error.response.status === 429) {
          errorMessage = 'Too many requests. Please wait 15 minutes before requesting another OTP.';
        } else if (error.response.status === 0) {
          errorMessage = 'Cannot connect to server. Please check your internet connection.';
        } else {
          errorMessage = error.response.data?.message || `Server error (${error.response.status}). Please try again.`;
        }
      } else if (error.request) {
        // Request made but no response
        errorMessage = 'No response from server. Please check your internet connection.';
      }
      
      setStatus({ type: 'error', message: errorMessage });
    } finally {
    setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp || otp.length !== 6 || !/^\d+$/.test(otp)) {
      setStatus({ type: 'error', message: 'Please enter a valid 6-digit OTP' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      const response = await axios.post(`${API_BASE}/api/enquiry/otp/verify`, {
        email: formData.email,
        contactNo: formData.contactNo ? `+91${formData.contactNo}` : undefined,
        otp: otp
      }, {
        timeout: 30000, // 30 seconds timeout for mobile networks
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success && response.data.verified) {
        setOtpVerified(true);
        setStatus({ type: 'success', message: 'OTP verified successfully! You can now submit your enquiry.' });
      } else {
        setStatus({ type: 'error', message: response.data.message || 'Invalid OTP' });
      }
    } catch (error) {
      console.error('OTP Verify Error:', error);
      
      let errorMessage = 'Failed to verify OTP. Please try again.';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.response) {
        errorMessage = error.response.data?.message || `Server error (${error.response.status}). Please try again.`;
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your internet connection.';
      }
      
      setStatus({ type: 'error', message: errorMessage });
    } finally {
    setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setStatus({ type: 'error', message: 'Please fill all required fields correctly' });
      return;
    }

    if (!otpVerified) {
      setStatus({ type: 'error', message: 'Please verify OTP before submitting' });
      return;
    }

    setLoading(true);
    setStatus({ type: '', message: '' });

    try {
      // Prepare form data with +91 prefix for contact number
      const submitData = {
        ...formData,
        contactNo: formData.contactNo ? `+91${formData.contactNo}` : ''
      };
      
      const response = await axios.post(`${API_BASE}/api/enquiry/submit`, submitData, {
        timeout: 30000, // 30 seconds timeout for mobile networks
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // Clear status message
        setStatus({ type: '', message: '' });
        
        // Show cinematic success popup
        setShowSuccessPopup(true);
        
        // Reset form
        setFormData({
          name: '',
          companyName: '',
          address: '',
          email: '',
          contactNo: '',
          requirementDetails: ''
        });
        setOtp('');
        setOtpSent(false);
        setOtpVerified(false);
        localStorage.removeItem('enquiry_otp_verified');
        localStorage.removeItem('enquiry_email');
      } else {
        setStatus({ type: 'error', message: response.data.message || 'Failed to submit enquiry' });
      }
    } catch (error) {
      console.error('Enquiry Submit Error:', error);
      
      let errorMessage = 'Failed to submit enquiry. Please try again.';
      
      if (error.code === 'ECONNABORTED' || error.message.includes('timeout')) {
        errorMessage = 'Request timed out. Please check your internet connection and try again.';
      } else if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
        errorMessage = 'Network error. Please check your internet connection.';
      } else if (error.response) {
        if (error.response.status === 403) {
          errorMessage = error.response.data?.message || 'OTP verification required. Please verify OTP again.';
          setOtpVerified(false);
          localStorage.removeItem('enquiry_otp_verified');
        } else {
          errorMessage = error.response.data?.message || `Server error (${error.response.status}). Please try again.`;
        }
      } else if (error.request) {
        errorMessage = 'No response from server. Please check your internet connection.';
      }
      
      setStatus({ type: 'error', message: errorMessage });
    } finally {
    setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-h-[100dvh] bg-gradient-to-br from-blue-50 via-white to-blue-50 w-full max-w-[100vw] overflow-x-hidden">
      <VerticalHeader />
      
      <div className="md:ml-56 lg:ml-64 min-h-screen min-h-[100dvh] flex items-start md:items-center justify-center p-3 xs:p-4 sm:p-6 md:p-8 pb-24 sm:pb-28 md:pb-8 md:pt-0 min-w-0 content-below-mobile-header">
        <div className="w-full max-w-2xl bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 xs:p-4 sm:p-6 md:p-8 mt-14 sm:mt-16 md:mt-0 mb-6 sm:mb-8 md:mb-0 overflow-visible relative min-w-0">
          <h1 className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2 text-center break-words w-full max-w-full">Enquiry Form</h1>
          <p className="text-xs xs:text-sm sm:text-base text-gray-600 text-center mb-4 sm:mb-6 md:mb-8">Please fill in all the details below</p>

          {status.message && !showSuccessPopup && (
            <div className={`mb-6 p-4 rounded-lg ${
              status.type === 'success' 
                ? 'bg-green-50 text-green-800 border border-green-200' 
                : 'bg-red-50 text-red-800 border border-red-200'
            }`}>
              {status.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
            {/* Name */}
        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your full name"
                required
              />
              {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

            {/* Company Name */}
        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Company Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.companyName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your company name"
                required
              />
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
        </div>

            {/* Address */}
        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows="3"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter your complete address"
                required
              />
              {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
            </div>

            {/* Email with OTP */}
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full sm:flex-1 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="your.email@example.com"
                  required
                  disabled={otpVerified}
                />
                <button
                  type="button"
                  onClick={handleSendOTP}
                  disabled={loading || otpVerified || !formData.email}
                  className={`w-full sm:w-auto sm:min-w-[140px] px-6 py-3.5 rounded-lg font-semibold text-base transition-all shadow-md whitespace-nowrap relative z-10 flex items-center justify-center ${
                    otpVerified
                      ? 'bg-green-500 text-white cursor-not-allowed'
                      : loading || !formData.email
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 shadow-lg'
                  }`}
                  style={{ minHeight: '48px', lineHeight: '1.5' }}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <span className="animate-spin">⏳</span> Sending...
                    </span>
                  ) : otpVerified ? (
                    'Verified ✓'
                  ) : otpSent ? (
                    'Resend OTP'
                  ) : (
                    'Send OTP'
                  )}
                </button>
        </div>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

            {/* OTP Verification */}
            {otpSent && !otpVerified && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Enter OTP <span className="text-red-500">*</span>
                </label>
                <div className="flex flex-col md:flex-row gap-2">
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '').slice(0, 6);
                      setOtp(value);
                    }}
                    className="w-full md:flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg tracking-widest font-bold"
                    placeholder="000000"
                    maxLength={6}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOTP}
                    disabled={loading || otp.length !== 6}
                    className={`w-full md:w-auto md:min-w-[120px] px-6 py-3 rounded-lg font-semibold text-base transition-all shadow-md whitespace-nowrap ${
                      loading || otp.length !== 6
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 shadow-lg'
                    }`}
                  >
                    Verify OTP
          </button>
        </div>
                <p className="text-xs text-gray-600 mt-2">OTP is valid for 5 minutes</p>
          </div>
        )}

            {/* Contact Number */}
        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-600 font-semibold pointer-events-none z-10">
                  +91
                </div>
                <input
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.contactNo ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="XXXXXXXXXX"
                  required
                  maxLength={13}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter 10-digit mobile number (e.g., 9876543210)</p>
              {errors.contactNo && <p className="text-red-500 text-xs mt-1">{errors.contactNo}</p>}
        </div>

            {/* Requirement Details */}
        <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Requirement Details <span className="text-red-500">*</span>
              </label>
              <textarea
                name="requirementDetails"
                value={formData.requirementDetails}
                onChange={handleChange}
                rows="5"
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.requirementDetails ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Describe your requirements in detail..."
                required
              />
              {errors.requirementDetails && <p className="text-red-500 text-xs mt-1">{errors.requirementDetails}</p>}
        </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!otpVerified || loading}
              className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all ${
                !otpVerified || loading
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 shadow-lg hover:shadow-xl'
              }`}
            >
              {loading ? 'Submitting...' : !otpVerified ? 'Verify OTP to Submit' : 'Submit Enquiry'}
        </button>
      </form>
        </div>
      </div>

      {/* Cinematic Success Popup */}
      {showSuccessPopup && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-3 xs:p-4 sm:p-6 safe-area-inset-top safe-area-inset-bottom"
          style={{
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(10px)',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-out'
          }}
          onClick={() => setShowSuccessPopup(false)}
        >
          <div 
            className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl max-w-md w-full max-w-[calc(100vw-1.5rem)] p-5 xs:p-6 sm:p-8 relative overflow-hidden transform transition-all max-h-[90dvh] overflow-y-auto"
            style={{
              animation: 'slideUp 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Background Gradient */}
            <div 
              className="absolute inset-0 opacity-10"
              style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
                animation: 'gradientShift 3s ease infinite',
                backgroundSize: '200% 200%'
              }}
            />

            {/* Success Icon with Animation */}
            <div className="relative z-10 flex flex-col items-center">
              <div 
                className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-lg"
                style={{
                  animation: 'scaleIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                  animationDelay: '0.2s',
                  animationFillMode: 'both'
                }}
              >
                <svg 
                  className="w-12 h-12 text-white"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  style={{
                    animation: 'checkmark 0.6s ease-out 0.4s',
                    animationFillMode: 'both',
                    strokeDasharray: 50,
                    strokeDashoffset: 50
                  }}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={3} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
              </div>

              {/* Success Message */}
              <h2 
                className="text-xl xs:text-2xl sm:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 text-center"
                style={{
                  animation: 'fadeInUp 0.6s ease-out 0.3s',
                  animationFillMode: 'both'
                }}
              >
                Enquiry Submitted Successfully!
              </h2>
              
              <p 
                className="text-gray-600 text-center mb-4 sm:mb-6 text-sm sm:text-base md:text-lg"
                style={{
                  animation: 'fadeInUp 0.6s ease-out 0.4s',
                  animationFillMode: 'both'
                }}
              >
                Thank you for your enquiry. We have received your request and will contact you soon.
              </p>

              {/* Close Button */}
              <button
                onClick={() => setShowSuccessPopup(false)}
                className="px-6 sm:px-8 py-2.5 sm:py-3 min-h-[44px] bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                style={{
                  animation: 'fadeInUp 0.6s ease-out 0.5s',
                  animationFillMode: 'both'
                }}
              >
                Close
              </button>
            </div>

            {/* Sparkle Effects */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '0.7s' }} />
            <div className="absolute top-1/2 right-8 w-1 h-1 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '0.9s' }} />
          </div>
        </div>
      )}

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes scaleIn {
          from {
            transform: scale(0);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        @keyframes checkmark {
          from {
            stroke-dashoffset: 50;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
} 
