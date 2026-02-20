import React from 'react';
import pasLogo from '../assets/pas-logo.png';

const Footer = () => (
  <footer className="bg-white w-full max-w-[100vw] flex items-center justify-center min-h-[56px] h-14 xs:h-16 sm:h-20 md:h-[100px] py-2 px-2 xs:px-3 sm:px-4 md:px-0 safe-area-inset-bottom">
    <div className="max-w-[1400px] mx-auto px-2 xs:px-4 sm:px-6 md:px-10 flex items-center justify-between h-full w-full min-w-0 gap-2">
      <span className="text-gray-500 text-[10px] xs:text-xs sm:text-sm md:text-base text-center flex-1 min-w-0 leading-tight sm:leading-normal">
        &copy; 2025 Process Automation Solutions. All rights reserved.
      </span>
      <div className="flex items-center gap-1 xs:gap-2 sm:gap-4 ml-1 xs:ml-2 sm:ml-4 justify-end flex-shrink-0">
        <img 
          src={pasLogo} 
          alt="PAS Logo" 
          className="h-8 xs:h-10 sm:h-14 md:h-[72px] w-auto max-w-[80px] xs:max-w-none object-contain select-none block" 
        />
      </div>
    </div>
  </footer>
);

export default Footer; 