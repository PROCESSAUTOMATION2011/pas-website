import React, { useState } from 'react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/products', label: 'Products' },
  { href: '/automations', label: 'Automations' },
  { href: '/modscan', label: 'PAS Modscan' },
  { href: '/about', label: 'About Us' },
  { href: '/enquiry', label: 'Enquiry' },
  { href: '/contact', label: 'Contact Us' },
];

const VerticalHeader = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  return (
    <>
      {/* Desktop Sidebar - Hidden on mobile */}
      <aside className="hidden md:flex w-56 lg:w-64 min-h-screen bg-white border-r flex-col items-center pt-6 lg:pt-10 fixed top-0 left-0 h-full z-20">
        <img
          src={require('../assets/pas-logo.png')}
          alt="PAS Logo"
          className="h-14 lg:h-[72px] w-auto max-w-[180px] object-contain select-none mb-6 lg:mb-8 transition-transform duration-300 ease-in-out hover:scale-110 focus:scale-110"
          draggable={false}
        />
        <nav className="flex flex-col gap-3 lg:gap-5 items-center w-full mt-2 lg:mt-4 px-2">
          {navLinks.map(link => (
            link.href === '/' && currentPath === '/' ? null : (
              <a
                key={link.href}
                href={link.href}
                className="w-[92%] max-w-[220px] text-center px-3 py-2.5 lg:px-5 lg:py-3 rounded-xl font-bold text-sm lg:text-base tracking-wide bg-gradient-to-r from-white via-blue-50 to-blue-100 text-blue-600 shadow-md border border-blue-200 transition-all duration-200 transform hover:scale-105 hover:from-blue-100 hover:to-pink-100 hover:text-pink-600 hover:shadow-xl focus:ring-4 focus:ring-blue-200 focus:outline-none"
                style={{ letterSpacing: '0.03em', boxShadow: '0 2px 8px 0 rgba(80, 80, 200, 0.08)' }}
              >
                {link.label}
              </a>
            )
          ))}
        </nav>
      </aside>

      {/* Mobile Header - Visible only on mobile */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-100 safe-area-inset-top">
        <div className="flex items-center justify-between px-3 xs:px-4 py-2.5 sm:py-3 min-w-0">
          <img
            src={require('../assets/pas-logo.png')}
            alt="PAS Logo"
            className="h-10 xs:h-12 w-auto max-w-[120px] xs:max-w-[140px] object-contain select-none flex-shrink"
            draggable={false}
          />
          
          {/* Cinematic Hamburger Button - Light Blue */}
          <button
            className={`flex-shrink-0 relative w-11 h-11 xs:w-12 xs:h-12 rounded-xl focus:outline-none overflow-hidden
              ${mobileMenuOpen 
                ? 'bg-gradient-to-br from-sky-400 via-cyan-500 to-blue-500 shadow-[0_0_25px_rgba(56,189,248,0.6)]' 
                : 'bg-gradient-to-br from-sky-400 via-sky-500 to-blue-500 shadow-[0_0_15px_rgba(56,189,248,0.5)]'
              }
              transition-all duration-500 ease-out
              hover:scale-105 active:scale-95
            `}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            style={{
              transform: mobileMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55), background 0.4s ease, box-shadow 0.4s ease'
            }}
          >
            <div className="absolute inset-0 flex flex-col justify-center items-center">
              <span className={`block w-6 h-[2.5px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-500 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px]' : ''}`} />
              <span className={`block w-6 h-[2.5px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] my-[4px] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
              <span className={`block w-6 h-[2.5px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.7)] transition-all duration-500 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px]' : ''}`} />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Side Menu - backdrop same as home (Header) */}
      <div 
        className={`md:hidden fixed inset-0 z-40 transition-all duration-500
          ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ 
          background: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: mobileMenuOpen ? 'blur(8px)' : 'blur(0px)',
          WebkitBackdropFilter: mobileMenuOpen ? 'blur(8px)' : 'blur(0px)',
        }}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Side drawer - exact same width as home (Header): 280px on mobile */}
      <div 
        className={`md:hidden fixed top-0 right-0 h-full z-50 w-[280px] max-w-[85vw]
          transition-all duration-500 ease-[cubic-bezier(0.68,-0.55,0.265,1.55)]
          ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          bg-gradient-to-b from-white via-blue-50 to-white`}
        style={{ 
          boxShadow: mobileMenuOpen ? '-10px 0 50px rgba(0,0,0,0.2)' : 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <nav className="relative z-10 flex flex-col pt-16 px-6 gap-3 h-full">
          <div className="mb-8 flex justify-center">
            <img 
              src={require('../assets/pas-logo.png')} 
              alt="PAS Logo" 
              className="h-16 w-auto object-contain" 
            />
          </div>

          {navLinks.map((link, idx) => (
            <a 
              key={link.href}
              href={link.href}
              className={`group flex items-center w-full py-4 px-6 rounded-2xl font-bold text-lg
                transition-all duration-500 ease-out
                ${mobileMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-[100px] opacity-0'}
                text-blue-600 bg-gradient-to-r from-white via-blue-50 to-blue-100
                hover:from-blue-100 hover:to-pink-100 hover:text-pink-600
                hover:shadow-lg hover:scale-[1.03]
                active:scale-[0.97]
                border border-blue-200 hover:border-blue-300 shadow-md
              `}
              style={{ transitionDelay: mobileMenuOpen ? `${idx * 80}ms` : '0ms' }}
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="group-hover:tracking-wider transition-all duration-300">{link.label}</span>
              <svg className="w-5 h-5 ml-auto text-blue-500 group-hover:text-pink-600 transition-all duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          ))}

          <div className="mt-auto mb-8 text-center">
            <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mb-4" />
            <p className="text-gray-500 text-sm">Process Automation Solutions</p>
          </div>
        </nav>

        <div className="absolute top-20 right-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-40 left-5 w-24 h-24 bg-blue-100/30 rounded-full blur-3xl" />
      </div>
    </>
  );
};

export default VerticalHeader; 