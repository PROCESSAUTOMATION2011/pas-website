import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import pasLogo from '../assets/pas-logo.png';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isCareers = location.pathname === '/careers';
  const headerBg = isCareers ? 'bg-[#4CB3FF] border-b border-[#4CB3FF]' : 'bg-white border-b border-gray-100';
  const navLinkBase = 'px-5 py-2 rounded-lg font-bold text-base tracking-wide border border-transparent focus:outline-none focus:ring-2';
  const navLink = isCareers
    ? `${navLinkBase} text-white bg-[#4CB3FF] hover:bg-white hover:text-[#4CB3FF] shadow-sm hover:shadow-md transition-all duration-150 hover:border-white focus:ring-white`
    : `${navLinkBase} text-blue-500 bg-white hover:bg-blue-100 hover:text-blue-700 shadow-sm hover:shadow-md transition-all duration-150 hover:border-blue-200 focus:ring-blue-300`;

  return (
    <>
    <header className={`w-full max-w-[100vw] ${headerBg} font-sans relative z-30 safe-area-inset-top`}>
      <div className="max-w-[1400px] mx-auto px-3 xs:px-4 sm:px-6 md:px-10 py-3 sm:py-4 md:py-6 flex items-center justify-between gap-2 min-w-0">
        {/* Logo & Branding */}
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-shrink">
          <img
            src={pasLogo}
            alt="PAS Logo"
            className="h-10 xs:h-12 sm:h-14 md:h-[72px] w-auto max-w-[140px] xs:max-w-[160px] sm:max-w-none object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Desktop Navigation - only from lg (1024px) so tablet/853px gets hamburger */}
        <nav className="hidden lg:flex gap-3 xl:gap-6 items-center flex-shrink-0">
          <Link to="/products" className={navLink}>Products</Link>
          <Link to="/automations" className={navLink}>Automations</Link>
          <Link to="/modscan" className={navLink}>PAS Modscan</Link>
          <Link to="/about" className={navLink}>About Us</Link>
          <Link to="/enquiry" className={navLink}>Enquiry</Link>
          <Link to="/contact" className={navLink}>Contact Us</Link>
        </nav>

        {/* Hamburger - shown below lg (1024px): phones and tablets like 853px */}
        <button
          className={`lg:hidden flex-shrink-0 relative w-12 h-12 xs:w-14 xs:h-14 rounded-xl xs:rounded-2xl focus:outline-none overflow-hidden group
            ${mobileMenuOpen 
              ? 'bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-500 shadow-[0_0_30px_rgba(56,189,248,0.7)]' 
              : 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-500 shadow-[0_0_20px_rgba(56,189,248,0.6)]'
            }
            transition-all duration-500 ease-out
            hover:scale-110 hover:shadow-[0_0_40px_rgba(56,189,248,0.8)]
            active:scale-95
          `}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55), background 0.5s ease, box-shadow 0.5s ease'
          }}
        >
          {/* Animated glow ring */}
          <span className={`absolute inset-0 rounded-2xl transition-all duration-500 ${mobileMenuOpen ? 'animate-pulse' : ''}`}
            style={{
              background: mobileMenuOpen 
                ? 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)' 
                : 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)'
            }}
          />
          
          {/* Hamburger lines container */}
          <div className="absolute inset-0 flex flex-col justify-center items-center">
            {/* Top line */}
            <span 
              className={`block w-7 h-[3px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]
                transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                ${mobileMenuOpen ? 'rotate-45 translate-y-[7px] w-8' : 'translate-y-0'}`}
            />
            {/* Middle line */}
            <span 
              className={`block w-7 h-[3px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] my-[5px]
                transition-all duration-300
                ${mobileMenuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'}`}
            />
            {/* Bottom line */}
            <span 
              className={`block w-7 h-[3px] rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]
                transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
                ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px] w-8' : 'translate-y-0'}`}
            />
          </div>

          {/* Sparkle effects when open */}
          {mobileMenuOpen && (
            <>
              <span className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-ping" />
              <span className="absolute bottom-2 left-2 w-1.5 h-1.5 bg-cyan-200 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
              <span className="absolute top-3 left-3 w-1 h-1 bg-white rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
            </>
          )}
        </button>
      </div>

    </header>

      {/* Side menu (hamburger) - shown below lg (1024px) */}
      {/* Backdrop overlay */}
      <div 
        className={`lg:hidden fixed inset-0 z-40 transition-all duration-500
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ 
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: mobileMenuOpen ? 'blur(8px)' : 'blur(0px)',
          WebkitBackdropFilter: mobileMenuOpen ? 'blur(8px)' : 'blur(0px)',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Side drawer - 280px so matches VerticalHeader on other pages */}
      <div 
        className={`lg:hidden fixed top-0 right-0 h-full z-50 w-[280px] max-w-[85vw] 
          transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          bg-gradient-to-b from-white via-blue-50 to-white`}
        style={{ 
          boxShadow: mobileMenuOpen ? '-10px 0 50px rgba(0,0,0,0.2)' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Menu content - no X button; close by tapping backdrop or selecting a link */}
        <nav className="relative z-10 flex flex-col pt-16 px-6 gap-3 h-full">
          {/* Logo at top */}
          <div className="mb-8 flex justify-center">
            <img 
              src={pasLogo} 
              alt="PAS Logo" 
              className="h-16 w-auto object-contain" 
            />
          </div>

          {[
            { to: '/products', label: 'Products', delay: '0ms' },
            { to: '/automations', label: 'Automations', delay: '80ms' },
            { to: '/modscan', label: 'PAS Modscan', delay: '160ms' },
            { to: '/about', label: 'About Us', delay: '240ms' },
            { to: '/enquiry', label: 'Enquiry', delay: '320ms' },
            { to: '/contact', label: 'Contact Us', delay: '400ms' }
          ].map((item, idx) => (
            <Link 
              key={item.to}
              to={item.to} 
              className={`group flex items-center w-full py-4 px-6 rounded-2xl font-bold text-lg
                transition-all duration-500 ease-out
                ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-[100px] opacity-0'}
                text-blue-600 bg-gradient-to-r from-white via-blue-50 to-blue-100
                hover:from-blue-100 hover:to-pink-100 hover:text-pink-600
                hover:shadow-lg hover:scale-[1.03] 
                active:scale-[0.97]
                border border-blue-200 hover:border-blue-300 shadow-md
              `}
              style={{ 
                transitionDelay: mobileMenuOpen ? item.delay : '0ms',
              }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="group-hover:tracking-wider transition-all duration-300">{item.label}</span>
              <svg 
                className="w-5 h-5 ml-auto text-blue-500 group-hover:text-pink-600 transition-all duration-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          ))}

          {/* Bottom decoration */}
          <div className="mt-auto mb-8 text-center">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Process Automation Solutions</p>
          </div>
        </nav>

        {/* Glow effects */}
        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-5 w-24 h-24 bg-blue-100/30 rounded-full blur-3xl" />
      </div>
    </>
  );
};

export default Header; 