import React, { useState, useEffect } from 'react';
import pasLogo from '../assets/pas-logo.png';

const AnniversaryPopup = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Use sessionStorage instead of localStorage - shows on every new visit
    // This means popup will appear when user visits the site (new session),
    // but won't show again on page refresh in the same session
    const hasSeenPopupThisSession = sessionStorage.getItem('pas_15years_popup_seen_session');
    
    console.log('🔍 AnniversaryPopup component loaded!');
    console.log('🔍 hasSeenPopupThisSession:', hasSeenPopupThisSession);
    
    // Show popup if not seen in this session - will show again on next visit
    if (!hasSeenPopupThisSession) {
      console.log('✅ Will show popup in 1 second...');
      const timer = setTimeout(() => {
        console.log('✅ SHOWING POPUP NOW!');
        setIsVisible(true);
        document.body.style.overflow = 'hidden';
      }, 1000);

      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      console.log('ℹ️ Popup already seen in this session. Will show again on next visit.');
    }
  }, []);

  useEffect(() => {
    // Handle body scroll based on popup visibility
    if (isVisible && !isClosing) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible, isClosing]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      // Store in sessionStorage - popup will show again on next visit (new session)
      sessionStorage.setItem('pas_15years_popup_seen_session', 'true');
    }, 500);
  };

  const handleContinue = () => {
    handleClose();
  };

  // Debug: Log visibility state
  console.log('🎬 AnniversaryPopup render - isVisible:', isVisible, 'isClosing:', isClosing);
  
  if (!isVisible) {
    return null;
  }

  return (
    <>
      {/* Backdrop with transparent blur - only blur, no white overlay */}
      <div
        className={`fixed inset-0 z-[9998] flex items-center justify-center p-4 transition-all duration-700 ease-out ${
          isClosing ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          background: 'transparent',
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
        }}
        onClick={handleClose}
      >
        {/* Animated particles background - blue theme */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full opacity-15 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 6 + 2}px`,
                height: `${Math.random() * 6 + 2}px`,
                background: 'linear-gradient(135deg, #60A5FA 0%, #3B82F6 50%, #2563EB 100%)',
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${Math.random() * 4 + 3}s`,
              }}
            />
          ))}
        </div>

        {/* Minimal vignette effect - very subtle */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.05) 100%)',
          }}
        />
      </div>

      {/* Main Popup Card */}
      <div
        className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 transition-all duration-700 ease-out pointer-events-none ${
          isClosing ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <div
          className="relative max-w-2xl w-full pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          style={{
            animation: 'slideUpFadeIn 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          {/* White/Blue Glass Card - matching website theme */}
          <div
            className="relative rounded-3xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(224, 242, 254, 0.98) 50%, rgba(255, 255, 255, 0.95) 100%)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              boxShadow: `
                0 25px 50px -12px rgba(59, 130, 246, 0.3),
                0 0 0 1px rgba(59, 130, 246, 0.15),
                inset 0 1px 0 rgba(255, 255, 255, 0.9),
                0 0 60px rgba(96, 165, 250, 0.2)
              `,
            }}
          >
            {/* Blue Rim Light Glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-20"
              style={{
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, transparent 50%, rgba(96, 165, 250, 0.4) 100%)',
                filter: 'blur(20px)',
              }}
            />

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 z-20 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 bg-blue-100 hover:bg-blue-200"
              style={{
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(59, 130, 246, 0.3)',
              }}
            >
              <svg
                className="w-5 h-5 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Content Container */}
            <div className="relative px-8 py-12 md:px-12 md:py-16">
              {/* Logo Section - PROMINENT, NO PILL CONTAINER */}
              <div className="flex justify-center mb-8 relative">
                {/* Blue Light Rays Halo */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    animation: 'pulseGlow 3s ease-in-out infinite',
                  }}
                >
                  <div
                    className="w-64 h-64 rounded-full opacity-15"
                    style={{
                      background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%)',
                      filter: 'blur(40px)',
                      animation: 'rotateGlow 8s linear infinite',
                    }}
                  />
                </div>

                {/* Logo - STANDALONE, PROMINENT, NO CONTAINER */}
                <div className="relative z-10" style={{ animation: 'floatLogo 4s ease-in-out infinite' }}>
                  <img
                    src={pasLogo}
                    alt="PAS Logo"
                    className="w-48 h-auto md:w-56 object-contain object-center select-none mx-auto"
                    draggable={false}
                    style={{
                      filter: 'drop-shadow(0 8px 24px rgba(59, 130, 246, 0.4))',
                      imageRendering: 'auto',
                      maxWidth: '100%',
                    }}
                  />
                </div>

              </div>

              {/* Main Headline - Blue theme */}
              <h1
                className="text-3xl md:text-5xl font-bold text-center mb-4"
                style={{
                  background: 'linear-gradient(135deg, #2563EB 0%, #3B82F6 50%, #60A5FA 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
                  letterSpacing: '-0.02em',
                  lineHeight: '1.2',
                }}
              >
                15th Year of Continuous Excellence
              </h1>

              {/* Sub Text - Gray theme */}
              <p
                className="text-base md:text-lg text-center text-gray-700 mb-10 leading-relaxed max-w-xl mx-auto"
                style={{
                  textShadow: '0 1px 3px rgba(255, 255, 255, 0.8)',
                  letterSpacing: '0.01em',
                  fontWeight: 500,
                }}
              >
                Successfully serving with innovation, reliability, and trust - and still growing stronger.
              </p>

              {/* Achievement Emblem (Laurel/Abstract Badge) - Blue theme */}
              <div className="flex justify-center mb-10 opacity-30">
                <svg
                  width="120"
                  height="40"
                  viewBox="0 0 120 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 20 L30 10 L40 20 L50 10 L60 20 L70 10 L80 20 L90 10 L100 20"
                    stroke="rgba(59, 130, 246, 0.6)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <circle cx="60" cy="20" r="8" fill="rgba(59, 130, 246, 0.2)" />
                </svg>
              </div>

              {/* CTA Button - Blue theme */}
              <div className="flex justify-center">
                <button
                  onClick={handleContinue}
                  className="group relative px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                  style={{
                    border: '2px solid rgba(59, 130, 246, 0.8)',
                    boxShadow: `
                      0 8px 24px rgba(59, 130, 246, 0.4),
                      inset 0 1px 0 rgba(255, 255, 255, 0.3),
                      0 0 20px rgba(59, 130, 246, 0.3)
                    `,
                  }}
                >
                  {/* Button Glow Effect */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, rgba(96, 165, 250, 0.4) 100%)',
                      filter: 'blur(10px)',
                    }}
                  />
                  
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Our Journey
                    <svg
                      className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Micro Reflections on Glass - White */}
            <div
              className="absolute top-0 left-0 w-full h-1/2 pointer-events-none opacity-40"
              style={{
                background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.4) 0%, transparent 100%)',
                borderRadius: '24px 24px 0 0',
              }}
            />
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes slideUpFadeIn {
          from {
            opacity: 0;
            transform: translateY(50px) scale(0.9);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes floatLogo {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.2;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.1);
          }
        }

        @keyframes rotateGlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }


        @keyframes float {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
            opacity: 0.2;
          }
          50% {
            transform: translateY(-20px) translateX(10px);
            opacity: 0.4;
          }
        }

        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default AnniversaryPopup;

