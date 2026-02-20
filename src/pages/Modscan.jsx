import React, { useState } from 'react';
import MotionWrapper from '../components/MotionWrapper';
import VerticalHeader from '../components/VerticalHeader';

const Modscan = () => {
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async (platform, filename) => {
    setDownloading(platform);
    try {
      const downloadUrl = `/downloads/${filename}`;
      
      // Fetch the file as blob for reliable download
      const response = await fetch(downloadUrl);
      if (!response.ok) {
        throw new Error('Download failed');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
      
      setTimeout(() => setDownloading(null), 2000);
    } catch (error) {
      console.error('Download error:', error);
      // Fallback: direct navigation
      window.location.href = `/downloads/${filename}`;
      setTimeout(() => setDownloading(null), 2000);
    }
  };

  return (
    <div className="flex min-h-screen min-h-[100dvh] bg-gray-50 w-full max-w-[100vw] overflow-x-hidden">
      <VerticalHeader />
      <section className="flex-1 flex flex-col items-center justify-start min-h-screen px-3 xs:px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-16 md:pt-16 ml-0 md:ml-56 lg:ml-64 min-w-0 content-below-mobile-header">
        <div className="w-full max-w-5xl mx-auto min-w-0 px-1">
          <MotionWrapper y={30}>
            <div className="text-center mb-6 sm:mb-8 md:mb-12">
              <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-bold text-primary mb-3 sm:mb-4 md:mb-6 break-words w-full max-w-full">
                PAS Modscan
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                Professional Modbus Explorer Desktop Application
              </p>
              <p className="text-base sm:text-lg text-gray-500 dark:text-gray-500 mt-3 max-w-2xl mx-auto">
                A powerful desktop tool for exploring, testing, and monitoring Modbus RTU/TCP and RS485 devices with an intuitive interface.
              </p>
            </div>
          </MotionWrapper>

          {/* Download Section */}
          <MotionWrapper delay={0.1}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 md:mb-10">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary mb-6 md:mb-8 text-center break-words w-full max-w-full">
                Download PAS Modscan
              </h2>
              
              <div className="flex justify-center mb-8">
                {/* Windows Download */}
                <div className="border-2 border-blue-200 rounded-xl p-8 bg-gradient-to-br from-blue-50 to-white hover:shadow-lg transition-all duration-300 max-w-md w-full">
                  <div className="flex items-center justify-center mb-6">
                    <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M3 12v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M3 12l9 9m0-9l9-9M12 3v18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2 text-center">Windows</h3>
                  <p className="text-base text-gray-600 mb-6 text-center">Windows 7/8/10/11</p>
                  <button
                    onClick={() => handleDownload('windows', 'ModbusRTUExplorer_v1.0.0.zip')}
                    disabled={downloading === 'windows'}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shadow-md text-lg"
                  >
                    {downloading === 'windows' ? 'Downloading...' : 'Download PAS Modscan'}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Latest Version: v1.0.0</p>
                <p className="text-xs text-gray-400 mb-2">
                  File Size: 44 MB (Compressed ZIP)
                </p>
                <p className="text-xs text-gray-400">
                  System Requirements: Windows 7/8/10/11 (x64), 2GB RAM, 100MB disk space
                </p>
              </div>
            </div>
          </MotionWrapper>

          {/* Features Section */}
          <MotionWrapper delay={0.2}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 md:mb-10">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary mb-6 md:mb-8 text-center break-words w-full max-w-full">
                Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Modbus RTU/TCP Support</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Full support for both Modbus RTU (Serial) and Modbus TCP/IP protocols</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Device Explorer</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Browse and explore Modbus device registers with ease</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Real-time Monitoring</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Monitor register values in real-time with customizable refresh rates</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Read/Write Operations</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Read from and write to Modbus registers with validation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">Data Logging</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Export data to CSV or Excel for analysis and reporting</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">User-Friendly Interface</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Intuitive GUI designed for both beginners and experts</p>
                  </div>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Installation Instructions */}
          <MotionWrapper delay={0.3}>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 mb-8 md:mb-10">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary mb-6 md:mb-8 text-center break-words w-full max-w-full">
                Installation Instructions
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 flex items-center">
                    <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">1</span>
                    Installation Instructions
                  </h3>
                  <ol className="list-decimal list-inside space-y-2 text-gray-600 dark:text-gray-400 ml-11">
                    <li>Download the ZIP file (ModbusRTUExplorer_v1.0.0.zip)</li>
                    <li>Extract the ZIP file to your desired location</li>
                    <li>Navigate to the extracted folder</li>
                    <li>Double-click the .exe file to launch the application</li>
                    <li>Alternatively, you can run it from the command line if needed</li>
                  </ol>
                </div>
              </div>
            </div>
          </MotionWrapper>

          {/* Support Section */}
          <MotionWrapper delay={0.4}>
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-xl shadow-lg p-6 sm:p-8 md:p-10 text-center">
              <h2 className="text-xl xs:text-2xl sm:text-3xl font-bold text-primary mb-4 md:mb-6 text-center break-words w-full max-w-full">
                Need Help?
              </h2>
              <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 mb-6">
                For technical support, feature requests, or bug reports, please contact us through our{' '}
                <a href="/contact" className="text-blue-600 hover:text-blue-800 font-semibold underline">
                  Contact Us
                </a>{' '}
                page.
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                © 2025 Process Automation Solutions. All rights reserved.
              </p>
            </div>
          </MotionWrapper>
        </div>
      </section>
    </div>
  );
};

export default Modscan;

