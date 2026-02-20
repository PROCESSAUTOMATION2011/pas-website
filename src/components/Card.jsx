import React from 'react';

const Card = ({ image, title, description, features = [], cta, onCtaClick, imageFit = 'contain' }) => (
  <div
    className="bg-surface-light dark:bg-surface-dark rounded-lg sm:rounded-xl shadow border border-gray-100 dark:border-gray-800 flex flex-col h-full max-w-full min-w-0 min-h-[320px] xs:min-h-[360px] sm:min-h-[420px] md:min-h-[480px] lg:min-h-[560px] transition-all duration-300 hover:scale-[1.01] sm:hover:scale-[1.02] md:hover:scale-[1.02] hover:border-primary hover:border-2"
  >
    {image && (
      <div className="flex justify-center items-center rounded-t-lg sm:rounded-t-xl overflow-hidden bg-white min-h-[100px] xs:min-h-[120px] sm:min-h-[140px] py-2 xs:py-3 sm:py-3">
        <img
          src={image}
          alt={typeof title === 'string' ? title : ''}
          className="mx-auto max-h-[90px] xs:max-h-[110px] sm:max-h-[130px] md:max-h-[160px] lg:max-h-[180px] w-auto max-w-full object-contain"
          style={{
            background: 'white',
            height: 'auto',
            imageRendering: 'auto',
            display: 'block',
          }}
          draggable={false}
        />
      </div>
    )}
    <div className="p-3 xs:p-4 sm:p-5 flex-1 flex flex-col min-w-0">
      <h3 className="font-semibold text-sm xs:text-base sm:text-lg mb-1.5 sm:mb-2 text-primary dark:text-primary-light break-words">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 mb-2 sm:mb-3 flex-1 text-xs xs:text-sm sm:text-base line-clamp-4 sm:line-clamp-none">{description}</p>
      {features.length > 0 && (
        <ul className="mb-2 sm:mb-3 space-y-0.5 sm:space-y-1 text-[11px] xs:text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-1.5 sm:gap-2">
              <span className="inline-block w-1 h-1 xs:w-1.5 xs:h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
              <span className="break-words">{f}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);

export default Card; 