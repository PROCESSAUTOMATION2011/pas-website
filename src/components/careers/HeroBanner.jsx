import React from 'react';
const HeroBanner = ({ show = true }) => (
  <section
    className={`w-full bg-[#4CB3FF] text-white px-6 text-center m-0 rounded-none z-10 transition-all duration-300 ease-in-out ${show ? 'opacity-100 translate-y-0 pt-10 pb-10' : 'opacity-0 -translate-y-10 pointer-events-none pt-2 pb-2'}`}
    style={{ margin: 0, borderRadius: 0 }}
  >
    <h1 className="text-xl xs:text-2xl md:text-4xl font-extrabold mb-2 transition-all duration-300 break-words w-full max-w-full px-1">Make an Impact. Shape the Future.</h1>
    <p className="text-base md:text-xl max-w-2xl mx-auto mb-4 transition-all duration-300">
      Join Process Automation Solutions and help us drive innovation, technical excellence, and global transformation.
    </p>
    {/* Buttons removed as requested */}
  </section>
);
export default HeroBanner; 