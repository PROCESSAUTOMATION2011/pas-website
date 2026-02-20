import React from 'react';
import { FaIndustry, FaRobot, FaCogs, FaChartLine, FaCloud, FaShieldAlt } from 'react-icons/fa';
import MotionWrapper from '../components/MotionWrapper';
import BrandAffiliationDisclaimer from '../components/BrandAffiliationDisclaimer';
import controlPanelImg from '../assets/control-panel.png';
import fixturesImg from '../assets/fixtures.png';
import pneumaticPressImg from '../assets/pneumatic-press.png';
import waveSolderingControlPanelImg from '../assets/wave-soldering-control-panel.png';
import ovenControlPanelImg from '../assets/oven-control-panel.png';
import motorPerformanceTestingMachineImg from '../assets/motor-performance-testing-machine.png';
import fhsTesterImg from '../assets/fhs-tester.png';
import VerticalHeader from '../components/VerticalHeader';

const industries = [
  { icon: <FaIndustry />, name: 'Manufacturing' },
  { icon: <FaChartLine />, name: 'Finance' },
  { icon: <FaCloud />, name: 'Healthcare' },
  { icon: <FaShieldAlt />, name: 'Logistics' },
];

const technologies = [
  'AI & Machine Learning',
  'Robotic Process Automation',
  'Cloud Integration',
  'IoT & Edge Devices',
  'API Orchestration',
  'Data Analytics',
];

// Refactor Automations to use sidebar layout
const Automations = () => (
  <div className="flex min-h-screen min-h-[100dvh] bg-gray-50 w-full max-w-[100vw] overflow-x-hidden">
    <VerticalHeader />
    <section className="flex-1 flex flex-col items-center justify-start min-h-screen px-3 xs:px-4 sm:px-6 md:px-8 py-6 sm:py-8 md:py-16 md:pt-16 overflow-auto ml-0 md:ml-56 lg:ml-64 min-w-0 content-below-mobile-header">
      <div className="w-full flex flex-col items-center justify-center max-w-5xl mx-auto min-w-0 px-1">
        <h1 className="text-xl xs:text-2xl sm:text-4xl md:text-5xl text-center mb-6 sm:mb-8 md:mb-12 text-primary break-words w-full max-w-full" style={{ fontFamily: 'Calibri, cursive' }}>Special Purpose Machines</h1>
        <MotionWrapper y={20}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white dark:bg-gray-800 p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex-1 flex items-center justify-center">
              <img src={controlPanelImg} alt="Control Panel" className="rounded-xl shadow-xl object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-none" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h2
                className="inline-block mb-3 md:mb-4 text-sm sm:text-base"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                Custom Control Panels
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
                Our expertly engineered control panels are designed for custom automation solutions. Each panel is tailored to your process, ensuring seamless integration, robust safety, and optimal performance.
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                <li>Custom wiring, PLC, and HMI integration for unique machine requirements</li>
                <li>Advanced safety interlocks and diagnostics for operator protection</li>
                <li>Modular design for easy maintenance and future upgrades</li>
                <li>High-quality components for industrial reliability and longevity</li>
                <li>Comprehensive documentation and support for commissioning</li>
                <li>Remote monitoring and data logging options for Industry 4.0</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        {/* Fixtures SPM Section */}
        <MotionWrapper y={20}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white dark:bg-gray-800 p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex-1 flex items-center justify-center">
              <img src={fixturesImg} alt="SPM Fixture" className="rounded-xl shadow-xl object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-none" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className="inline-block mb-3 md:mb-4 text-sm sm:text-base"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                Fixtures
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
                Our advanced fixtures are purpose-built for rotor continuity testing, milli-ohm (winding resistance) measurement, and DC motor checking. These fixtures ensure precise, repeatable, and safe testing of rotors, stators, and DC motors in industrial and laboratory environments. Designed for high accuracy and operator convenience, they streamline quality control and diagnostics for electric machines.
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                <li>Rotor continuity testing for reliable electrical contact verification</li>
                <li>Milli-ohm (winding resistance) testing for precise measurement of coil integrity</li>
                <li>DC motor checking for functional validation and troubleshooting</li>
                <li>Robust, insulated construction for operator safety</li>
                <li>Quick and secure clamping for various rotor and stator sizes</li>
                <li>Compatible with automated and manual test setups</li>
                <li>Clear indication and fail-safe operation for quality assurance</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        {/* Pneumatic Press Section */}
        <MotionWrapper y={20}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white dark:bg-gray-800 p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex-1 flex items-center justify-center">
              <img src={pneumaticPressImg} alt="Pneumatic Press" className="rounded-xl shadow-xl object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-none" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className="inline-block mb-3 md:mb-4 text-sm sm:text-base"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                Pneumatic Press
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
                A pneumatic press is a machine that uses compressed air to generate force for pressing, forming, or assembling operations. It is widely used in industrial automation for tasks such as punching, riveting, bending, and assembling components. Pneumatic presses are valued for their speed, reliability, and safety, making them ideal for repetitive manufacturing processes.
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                <li>Fast and efficient operation for high-volume production</li>
                <li>Consistent force application for precise results</li>
                <li>Safe and easy to operate with minimal maintenance</li>
                <li>Ideal for punching, riveting, bending, and assembly tasks</li>
                <li>Customizable for various industrial applications</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        {/* Wave Soldering Control Panel Section */}
        <MotionWrapper y={20}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white dark:bg-gray-800 p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex-1 flex items-center justify-center">
              <img src={waveSolderingControlPanelImg} alt="Wave Soldering Control Panel" className="rounded-xl shadow-xl object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-none" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className="inline-block mb-3 md:mb-4 text-xs sm:text-sm md:text-base"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 0.8rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  display: 'inline-block',
                }}
              >
                Wave Soldering Control Panel
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
                The wave soldering control panel is a sophisticated interface designed to manage and automate the wave soldering process in electronics manufacturing. It integrates advanced control systems for precise regulation of conveyor speed, solder wave height, preheating zones, and flux application. The panel ensures optimal process stability, safety, and repeatability, supporting high-throughput production lines and stringent quality requirements.
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                <li>Integrated control of conveyor, preheater, and solder wave parameters</li>
                <li>Advanced safety interlocks and emergency stop functionality</li>
                <li>Real-time process monitoring and fault diagnostics</li>
                <li>Modular design for easy maintenance and system upgrades</li>
                <li>Supports Industry 4.0 connectivity and data logging</li>
                <li>Ensures high reliability and process repeatability for mass production</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        {/* Oven Control Panel Section */}
        <MotionWrapper y={20}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white dark:bg-gray-800 p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex-1 flex items-center justify-center">
              <img src={ovenControlPanelImg} alt="Oven Control Panel" className="rounded-xl shadow-xl object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-none" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className="inline-block mb-3 md:mb-4 text-sm sm:text-base"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                Oven Control Panel
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
                The oven control panel is engineered for precise temperature regulation and process control in industrial ovens. It features multiple digital controllers, safety interlocks, and status indicators to ensure uniform heating, energy efficiency, and operational safety. This panel enables real-time monitoring and adjustment of temperature zones.
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                <li>Multi-zone temperature control for uniform heating</li>
                <li>Digital displays for real-time process monitoring</li>
                <li>Integrated safety interlocks and alarms</li>
                <li>Energy-efficient operation and robust circuit protection</li>
                <li>Easy-to-use interface for quick setup and adjustments</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        {/* Motor Performance Testing Machine Section */}
        <MotionWrapper y={20}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white dark:bg-gray-800 p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex-1 flex items-center justify-center">
              <img src={motorPerformanceTestingMachineImg} alt="Motor Performance Testing Machine" className="rounded-xl shadow-xl object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-none" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className="inline-block mb-3 md:mb-4 text-xs sm:text-sm md:text-base"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 0.8rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  display: 'inline-block',
                }}
              >
                Motor Performance Testing Machine
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
                The motor performance testing machine is a comprehensive system designed to evaluate and analyze the operational characteristics of electric motors. It enables precise measurement of parameters such as torque, speed, efficiency, and power consumption under various load conditions.
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                <li>Accurate measurement of torque, speed, and efficiency</li>
                <li>PC-based data acquisition and real-time analysis</li>
                <li>Supports a wide range of motor types and sizes</li>
                <li>Essential for quality control and R&D applications</li>
                <li>User-friendly interface with automated test sequences</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        {/* FHS Tester Section */}
        <MotionWrapper y={20}>
          <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-center mb-8 md:mb-16 bg-white dark:bg-gray-800 p-5 sm:p-8 md:p-12 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 w-full">
            <div className="flex-1 flex items-center justify-center">
              <img src={fhsTesterImg} alt="FHS Tester" className="rounded-xl shadow-xl object-contain w-full max-h-[250px] sm:max-h-[300px] md:max-h-none" />
            </div>
            <div className="flex-1 flex flex-col justify-center">
              <h3
                className="inline-block mb-3 md:mb-4 text-sm sm:text-base"
                style={{
                  borderRadius: '9999px',
                  padding: '0.4rem 1rem',
                  fontWeight: 700,
                  color: '#fff',
                  background: 'linear-gradient(90deg, #3b82f6 0%, #ec4899 100%)',
                  boxShadow: '0 2px 8px 0 rgba(0,0,0,0.10)',
                  textAlign: 'center',
                  backgroundClip: 'padding-box',
                  WebkitBackgroundClip: 'padding-box',
                  display: 'inline-block',
                  whiteSpace: 'nowrap',
                }}
              >
                FHS TESTER
              </h3>
              <p className="text-gray-700 dark:text-gray-200 mb-3 md:mb-4 text-base sm:text-lg md:text-xl">
                The FHS (Frictional Heat Shrinkage) Tester is a precision yarn shrinkage testing system designed for accurate measurement and quality control in textile laboratories. This specialized equipment ensures reliable shrinkage analysis and compliance with industry quality standards for yarn and fabric testing.
              </p>
              <ul className="list-disc pl-5 md:pl-6 space-y-1 sm:space-y-2 text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
                <li>Advanced yarn shrinkage tester for accurate textile analysis</li>
                <li>Automated test sequences with comprehensive pass/fail reporting</li>
                <li>Multi-channel measurement for parallel testing efficiency</li>
                <li>Precision readings provide accurate shrinkage percentage values</li>
                <li>Customizable test parameters for diverse product requirements</li>
                <li>Data logging and traceability for quality documentation</li>
                <li>User-friendly interface with intuitive test configuration</li>
                <li>Ideal for quality testing in textile and fabric laboratories</li>
              </ul>
            </div>
          </div>
        </MotionWrapper>
        <BrandAffiliationDisclaimer additionalMargin={true} />
      </div>
    </section>
  </div>
);

export default Automations; 