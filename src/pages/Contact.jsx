import React from 'react';
import VerticalHeader from '../components/VerticalHeader';

export default function Contact() {
  return (
    <div className="flex min-h-screen min-h-[100dvh] bg-gradient-to-br from-blue-50 to-white w-full max-w-[100vw] overflow-x-hidden">
      <VerticalHeader />
      <section className="flex-1 flex flex-col items-center justify-start md:justify-center py-6 sm:py-8 md:py-12 md:pt-12 px-3 xs:px-4 sm:px-6 ml-0 md:ml-56 lg:ml-64 min-w-0 content-below-mobile-header">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-10 text-blue-700 tracking-tight transition-all duration-700 ease-in-out break-words w-full max-w-full px-1">Get in Touch with Us</h2>
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-4 sm:gap-6 md:gap-12 items-stretch animate-fade-in px-0">
          {/* Contact Info Card */}
          <div className="flex-1 bg-white rounded-xl sm:rounded-2xl shadow-lg p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col justify-center mb-2 md:mb-0 transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-1 min-w-0">
            <div className="flex items-center mb-3 sm:mb-6 gap-2">
              <span className="text-xl xs:text-2xl sm:text-3xl flex-shrink-0" aria-label="Company" role="img">🏢</span>
              <span className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold text-blue-800 break-words">Process Automation Solutions</span>
            </div>
            <div className="flex items-start mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl mr-2 sm:mr-3 mt-0.5" aria-label="Address" role="img">📍</span>
              <span className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
                No.14 & 15, Haji Nagar, 1st Street,<br />
                Kallikuppam, Chennai, Tamil Nadu 600053
              </span>
            </div>
            <div className="flex items-center mb-3 sm:mb-4">
              <span className="text-xl sm:text-2xl mr-2 sm:mr-3" aria-label="Phone" role="img">📞</span>
              <div className="flex flex-col">
                <a href="tel:9962825684" className="text-sm sm:text-base text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">9962825684</a>
                <a href="tel:8939825684" className="text-sm sm:text-base text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400">8939825684</a>
              </div>
            </div>
            <div className="flex items-center mb-2">
              <span className="text-xl sm:text-2xl mr-2 sm:mr-3" aria-label="Email" role="img">✉️</span>
              <a href="mailto:processautomation.enquiry@gmail.com" className="text-xs sm:text-sm md:text-base text-blue-700 font-semibold hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 break-all sm:break-normal">processautomation.enquiry@gmail.com</a>
            </div>
          </div>
          {/* Google Map */}
          <div className="flex-1 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg bg-white transition-all duration-500 hover:shadow-2xl md:hover:-translate-y-1 flex items-center min-h-[220px] xs:min-h-[250px] sm:min-h-[280px] md:min-h-[300px] w-full min-w-0">
            <iframe
              title="PAS Location Map"
              src="https://www.google.com/maps?q=Process+Automation+Solutions,+No.14+%26+15,+Haji+Nagar,+1st+St,+Kallikuppam,+Chennai,+Tamil+Nadu+600053&z=19&output=embed"
              width="100%"
              height="380"
              className="w-full h-[220px] xs:h-[250px] sm:h-[280px] md:h-[380px] border-0 rounded-xl sm:rounded-2xl min-h-[220px]"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              aria-label="Google Map showing Process Automation Solutions location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
} 