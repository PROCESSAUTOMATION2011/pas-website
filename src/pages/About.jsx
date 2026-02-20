import React from 'react';
import MotionWrapper from '../components/MotionWrapper';
import BrandAffiliationDisclaimer from '../components/BrandAffiliationDisclaimer';
import VerticalHeader from '../components/VerticalHeader';

const About = () => (
  <div className="flex min-h-screen min-h-[100dvh] bg-gray-50 w-full max-w-[100vw] overflow-x-hidden">
    <VerticalHeader />
    <section className="flex-1 flex flex-col items-center justify-start min-h-screen px-3 xs:px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-16 md:pt-16 ml-0 md:ml-56 lg:ml-64 min-w-0 content-below-mobile-header">
      <div className="w-full max-w-4xl mx-auto min-w-0 px-1">
        <MotionWrapper y={30}>
          <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8 text-primary dark:text-primary-light break-words w-full max-w-full">About Us</h2>
        </MotionWrapper>
        {/* Company Overview */}
        <MotionWrapper delay={0.1}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sm:p-6 md:p-8 mb-6 md:mb-8">
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center break-words w-full max-w-full">Company Overview – Process Automation Solutions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">Established Year</h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">Founded in 2011, with over a decade of experience in the industrial automation sector.</p>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">Business Type</h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">Operates as a sole proprietorship firm.</p>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">Head Office Location</h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">Based in Chennai, Tamil Nadu, serving clients across India.</p>
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">Core Strengths</h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">Known for reliability, quality service, and technical excellence in automation solutions.</p>
                <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">Industry Role</h4>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 md:mb-4">A prominent manufacturer and distributor in the field of industrial automation.</p>
              </div>
            </div>
          </div>
        </MotionWrapper>
        {/* Product and Brand Portfolio */}
        <MotionWrapper delay={0.2}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sm:p-6 md:p-8 mb-6 md:mb-8">
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center break-words w-full max-w-full">Product and Brand Portfolio</h3>
            <div className="mb-4 md:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">Primary Product Segments</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Machine Safety Solutions</li>
                <li>Industrial Motors</li>
                <li>Automation Systems and Components</li>
              </ul>
            </div>
            <div className="mb-4 md:mb-6">
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">Brand Affiliations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">1. Crouzet</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Compact, precision DC and stepper motors, PLCs, timers, counters, and HMIs for industrial automation.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">2. Honeywell</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Advanced automation and control solutions for industrial processes and safety systems.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">3. KUKEN</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">High-quality industrial automation components and control systems.</p>
                  </div>
                </div>
                <div className="space-y-2 sm:space-y-3">
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">4. Delta</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Energy-efficient drives, automation products, and industrial control solutions.</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-sm sm:text-base text-gray-800 dark:text-gray-200">5. Mitsubishi</h5>
                    <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm">Comprehensive automation solutions including PLCs, HMIs, and industrial control systems.</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-1 sm:mb-2">Manufacturing Excellence</h4>
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">All offered products are manufactured and assembled under the guidance of experienced professionals, ensuring high performance and reliability.</p>
            </div>
          </div>
        </MotionWrapper>
        {/* Specialized Solutions */}
        <MotionWrapper delay={0.3}>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-5 sm:p-6 md:p-8 mb-6 md:mb-8">
            <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-primary mb-4 md:mb-6 text-center break-words w-full max-w-full px-1">Specialized Solutions – Special Purpose Machines (SPMs)</h3>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4 md:mb-6">
              We design and build custom Special Purpose Machines (SPMs) tailored to client-specific needs in:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6">
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Assembly Automation</li>
                <li>Inspection and Testing Systems</li>
                <li>Packaging and Labelling Machines</li>
                <li>Pick and Place Systems</li>
              </ul>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Poka-Yoke (Error Proofing) Systems</li>
                <li>Conveyor and Handling Automation</li>
                <li>Pneumatic and Electro-Mechanical Fixtures</li>
              </ul>
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2 sm:mb-3">Our SPMs are built to:</h4>
              <ul className="list-disc list-inside space-y-1 sm:space-y-2 text-sm sm:text-base text-gray-600 dark:text-gray-400">
                <li>Enhance productivity</li>
                <li>Reduce manual intervention</li>
                <li>Improve operational safety and precision</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        <BrandAffiliationDisclaimer additionalMargin={true} />
      </div>
    </section>
  </div>
);

export default About; 