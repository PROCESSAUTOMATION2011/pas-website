import React from 'react';
import crouzetLogo from '../assets/crouzet.png';
import kukenLogo from '../assets/kuken.png';
import deltaLogo from '../assets/delta.webp';
import mitsubishiLogo from '../assets/mitsubishi.png';
import honeywellLogo from '../assets/honeywell.png';

const BrandAffiliationDisclaimer = ({ additionalMargin = false, textColor = 'black' }) => {
  return (
    <section
      className="brand-affiliation-section w-full flex flex-col items-center justify-center py-6"
      style={{
        background: 'transparent',
        border: 'none',
        boxShadow: 'none',
        textAlign: 'center',
        pointerEvents: 'none',
        marginTop: additionalMargin ? '2cm' : '0',
      }}
    >
      <div
        className="text-base md:text-lg font-bold text-center mb-3"
        style={{
          color: textColor,
          textShadow: textColor === 'white' ? '0 2px 12px rgba(0,0,0,0.45)' : 'none',
          fontFamily: 'Roboto, Open Sans, sans-serif',
          pointerEvents: 'auto',
        }}
      >
        We deal with trusted sources of automation products from top brands like:
      </div>
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 w-full" style={{ pointerEvents: 'auto' }}>
        <img src={crouzetLogo} alt="Crouzet" className="h-10 md:h-14 object-contain" style={{ maxWidth: '120px' }} />
        <img src={kukenLogo} alt="KUKEN" className="h-10 md:h-14 object-contain" style={{ maxWidth: '140px' }} />
        <img src={deltaLogo} alt="Delta" className="h-10 md:h-14 object-contain" style={{ maxWidth: '100px' }} />
        <img src={mitsubishiLogo} alt="Mitsubishi" className="h-10 md:h-14 object-contain" style={{ maxWidth: '160px' }} />
        <img src={honeywellLogo} alt="Honeywell" className="h-10 md:h-14 object-contain" style={{ maxWidth: '160px' }} />
      </div>
    </section>
  );
};

export default BrandAffiliationDisclaimer; 