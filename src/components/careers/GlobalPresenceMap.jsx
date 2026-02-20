import React from 'react';
const GlobalPresenceMap = () => (
  <section className="bg-white py-16 px-6 text-center">
    <h2 className="text-2xl font-bold mb-6">Our Presence</h2>
    <div className="w-full h-64 bg-blue-100 rounded-lg flex items-center justify-center text-blue-700 font-bold mb-6" style={{ minHeight: '260px' }}>
      <iframe
        title="PAS Location"
        src="https://www.google.com/maps?q=No.14+%26+15,+Haji+Nagar,+1st+St,+Kallikuppam,+Chennai,+Tamil+Nadu+600053&output=embed"
        width="100%"
        height="100%"
        style={{ border: 0, borderRadius: '0.5rem', minHeight: '240px' }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
    <div className="text-lg text-gray-700 font-medium">
      <div className="font-bold text-xl mb-1 text-blue-700">Process Automation Solutions</div>
      <span>No.14 & 15, Haji Nagar, 1st St, Kallikuppam, Chennai, Tamil Nadu 600053</span><br />
      <a href="https://maps.app.goo.gl/h6AkJymL15C9eYQD7" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View on Google Maps</a>
    </div>
  </section>
);
export default GlobalPresenceMap; 