import React, { useState, useEffect } from 'react';
import HeroBanner from '../components/careers/HeroBanner';
import WhyWorkWithUs from '../components/careers/WhyWorkWithUs';
import CareerDevelopment from '../components/careers/CareerDevelopment';
import DiversityInclusion from '../components/careers/DiversityInclusion';
import GlobalPresenceMap from '../components/careers/GlobalPresenceMap';
import VerticalHeader from '../components/VerticalHeader';
import { apiRequest } from '../utils/api';

const Careers = () => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [showBanner, setShowBanner] = useState(true);
  // OTP state
  const [otpStep, setOtpStep] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [otpLoading, setOtpLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [pendingFormData, setPendingFormData] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setShowBanner(false);
      } else {
        setShowBanner(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cooldown timer effect
  React.useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError('');
    setOtpError('');
    setOtp('');
    setOtpStep(false);
    setOtpSent(false);
    setResendCooldown(0);
    const form = e.target;
    const formData = new FormData(form);
    // Generate unique Application ID
    const now = new Date();
    const pad = (n) => n.toString().padStart(2, '0');
    const appId = `APP-${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
    formData.append('applicationId', appId);
    // Get phone and email from form
    const phone = formData.get('mobile');
    const email = formData.get('email');
    if (!phone || !email) {
      setError('Mobile number and email are required for OTP verification.');
      setLoading(false);
      return;
    }
    setPendingFormData(formData);
    try {
      await apiRequest('/api/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ contact: phone, type: 'sms' })
      });
      await apiRequest('/api/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ contact: email, type: 'email' })
      });
      setOtpStep(true);
      setOtpSent(true);
      setResendCooldown(30);
    } catch (err) {
      setError('Failed to send OTP. Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setOtpError('');
    try {
      // Get phone and email from pendingFormData
      const phone = pendingFormData.get('mobile');
      const email = pendingFormData.get('email');
      await apiRequest('/api/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ contact: phone, code: otp, type: 'sms' })
      });
      await apiRequest('/api/auth/otp/verify', {
        method: 'POST',
        body: JSON.stringify({ contact: email, code: otp, type: 'email' })
      });
      // Proceed with application submission
      const res = await fetch('/api/apply', {
        method: 'POST',
        body: pendingFormData,
      });
      if (res.ok) {
        setSuccess(true);
        setShowModal(true);
        setTimeout(() => setShowModal(false), 4000);
        setOtpStep(false);
        setOtp('');
        setOtpSent(false);
        setResendCooldown(0);
        setPendingFormData(null);
        document.querySelector('form').reset();
      } else {
        const errorData = await res.json();
        setOtpError(errorData.message || 'Failed to submit application.');
      }
    } catch (err) {
      setOtpError('Invalid or expired OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    setOtpLoading(true);
    setOtpError('');
    try {
      const phone = pendingFormData.get('mobile');
      const email = pendingFormData.get('email');
      await apiRequest('/api/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ contact: phone, type: 'sms' })
      });
      await apiRequest('/api/auth/otp/send', {
        method: 'POST',
        body: JSON.stringify({ contact: email, type: 'email' })
      });
      setOtpSent(true);
      setResendCooldown(30);
    } catch (err) {
      setOtpError('Failed to resend OTP. Please try again.');
    } finally {
      setOtpLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden">
      <VerticalHeader />
      <div className="flex-1 flex flex-col min-h-screen min-w-0 px-3 xs:px-4 sm:px-6 pb-6 md:pt-0 ml-0 md:ml-56 lg:ml-64 content-below-mobile-header">
        <HeroBanner show={showBanner} />
        <div className="w-full max-w-3xl mx-auto min-w-0">
          <section className="w-full bg-white rounded-lg shadow p-4 xs:p-5 sm:p-6 md:p-8 mt-4 mb-6 sm:mb-8">
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold mb-3 sm:mb-4 text-center break-words w-full max-w-full px-1">Join Our Team</h2>
            <p className="mb-6 text-gray-700 text-center">
              At <b>Process Automation Solutions</b>, we believe in the power of passionate, skilled individuals to drive meaningful impact. We don't operate with large corporate structures or extensive hierarchies—instead, we offer a focused, hands-on work environment where your contribution truly matters.<br/><br/>
              If you are looking for an opportunity to grow alongside a dedicated team, we invite you to submit your application using the form below.
            </p>
            <div className="mb-6 text-gray-600 text-sm">
              <b>Application Instructions:</b> Please fill out the form carefully and completely. The following details are required:
            </div>
            
            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  {error}
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
              <div>
                <label className="block font-medium mb-1">Full Name</label>
                <input name="fullName" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Aadhaar Number</label>
                <input name="aadhaar" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Mobile Number</label>
                <input name="mobile" type="tel" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Email</label>
                <input name="email" type="email" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Name of Institution Studied</label>
                <input name="institution" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Area of Specialization</label>
                <input name="specialization" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Expected Salary</label>
                <input name="expectedSalary" type="text" className="w-full border rounded px-3 py-2" required />
              </div>
              <div>
                <label className="block font-medium mb-1">Upload Resume (PDF only)</label>
                <input name="resume" type="file" accept="application/pdf" className="w-full" required />
              </div>
              <button type="submit" className="w-full py-3 px-6 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all text-lg tracking-wide transform hover:scale-105 duration-200" disabled={loading}>
                {loading ? 'Sending OTP...' : 'Submit Application'}
              </button>
            </form>
            <div className="mt-4 text-xs text-gray-500 text-center">
              
            </div>
          </section>
          <div className="w-full">
            <WhyWorkWithUs />
            <CareerDevelopment />
            <DiversityInclusion />
            <GlobalPresenceMap />
          </div>
          {/* Success Modal Popup */}
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
              <div className="bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-2xl shadow-2xl p-0 max-w-sm w-full text-center animate-fade-in-up relative border-4 border-blue-300">
                <button onClick={() => setShowModal(false)} className="absolute top-3 right-3 text-white hover:text-blue-200 text-2xl font-bold focus:outline-none">&times;</button>
                <div className="flex flex-col items-center p-10">
                  <div className="bg-white rounded-full p-3 shadow mb-4">
                    <svg className="w-16 h-16 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="white"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2l4-4" /></svg>
                  </div>
                  <h3 className="text-2xl font-extrabold mb-2 text-white drop-shadow">Application Submitted Successfully!</h3>
                  <p className="text-blue-100 font-medium">Thank you for applying.<br/>Your application has been received.<br/>We appreciate your interest in joining our team.</p>
                </div>
              </div>
            </div>
          )}
          {/* OTP Modal */}
          {otpStep && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />
              <form onSubmit={handleVerifyOtp} className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-8 max-w-sm w-full text-center border border-blue-200 dark:border-blue-900 animate-fade-in-up">
                <h3 className="text-xl font-bold mb-2 text-primary">OTP Verification</h3>
                <p className="mb-4 text-gray-700 dark:text-gray-200 text-sm">Enter the OTP sent to your phone and email.<br/>OTP is valid for 2 minutes.</p>
                <input
                  type="text"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full border rounded px-4 py-3 text-lg mb-3"
                  placeholder="Enter OTP"
                  maxLength={6}
                  required
                  autoFocus
                />
                {otpError && <div className="text-red-500 text-xs mb-2">{otpError}</div>}
                <button
                  type="submit"
                  className="w-full py-3 px-6 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-bold shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all text-lg tracking-wide transform hover:scale-105 duration-200"
                  disabled={otpLoading}
                >
                  {otpLoading ? 'Verifying...' : 'Verify & Submit'}
                </button>
                <button
                  type="button"
                  className="mt-3 w-full py-2 px-4 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold shadow focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-base tracking-wide"
                  onClick={() => { setOtpStep(false); setOtp(''); setOtpError(''); }}
                  disabled={otpLoading}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="mt-3 w-full py-2 px-4 rounded-xl bg-blue-100 hover:bg-blue-200 text-blue-700 font-bold shadow focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-base tracking-wide disabled:opacity-50"
                  onClick={handleResendOtp}
                  disabled={otpLoading || resendCooldown > 0}
                >
                  {resendCooldown > 0 ? `Resend OTP (${resendCooldown}s)` : 'Resend OTP'}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          0% { 
            opacity: 0; 
            transform: translateY(40px) scale(0.95); 
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1); 
          }
        }
        .animate-fade-in-up { 
          animation: fade-in-up 0.5s cubic-bezier(0.23, 1, 0.32, 1) both; 
        }
      `}</style>
    </div>
  );
};

export default Careers; 