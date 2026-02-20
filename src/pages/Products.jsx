import React from 'react';
import Card from '../components/Card';
import MotionWrapper from '../components/MotionWrapper';
import BrandAffiliationDisclaimer from '../components/BrandAffiliationDisclaimer';
import impactToolsImg from '../assets/impact-tools.png';
import motorsImg from '../assets/motors.png';
import temperatureTransmitterImg from '../assets/temperature-transmitter.png';
import pressureTransmitterImg from '../assets/pressure-transmitter.png';
import automationProductsImg from '../assets/automation-products.png';
import temperatureControllerImg from '../assets/temperature-controller.png';
import servoMotorDriveImg from '../assets/servo-motor-drive.png';
import communicationInterfaceImg from '../assets/communication-interface-product.png';
import temperatureScannerRecorderImg from '../assets/temperature-scanner-recorder.png';
import thyristorImg from '../assets/thyristor.png';
import sensorsImg from '../assets/sensors.png';
import temperatureSensorImg from '../assets/temperature-sensor.png';
import Header from '../components/Header';
import VerticalHeader from '../components/VerticalHeader';

const products = [
  {
    image: impactToolsImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          Pneumatic Tools
        </span>
        <br />
        Impact Wrench, Nut Runner, Die Grinder
      </>
    ),
    description: 'High-torque, precision tools for industrial fastening and grinding applications. Engineered for durability, efficiency, and ergonomic comfort.',
    features: [
      'Robust impact mechanism',
      'Variable speed control',
      'Ergonomic grip',
      'Suitable for heavy-duty tasks',
      'Low vibration and noise',
    ],
    cta: 'Learn More',
  },
  {
    image: motorsImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          MOTORS
        </span>
        <br />
        BLDC, Servo, and Industrial Motors
      </>
    ),
    description:
      'Premium BLDC, servo, and industrial motors engineered for automation, robotics, and manufacturing. These motors deliver high efficiency, precise speed and position control, and exceptional reliability for demanding industrial environments.',
    features: [
      'Brushless DC (BLDC) and servo options',
      'High torque and energy efficiency',
      'Accurate speed and position control',
      'Low maintenance, long service life',
      'Compact, robust construction',
      'Integrated feedback and protection systems',
    ],
    cta: 'Learn More',
  },
  {
    image: temperatureTransmitterImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          TEMPERATURE TRANSMITTER
        </span>
        <br />
        Industrial Temperature Transmitters
      </>
    ),
    description:
      'Advanced temperature transmitters for accurate and reliable temperature measurement in industrial processes. Designed for harsh environments, these transmitters offer high precision, stability, and easy integration with automation systems.',
    features: [
      'High-accuracy temperature sensing',
      'Supports multiple sensor types (RTD, thermocouple)',
      'Robust, weatherproof construction',
      'Digital and analog output options',
      'Easy configuration and diagnostics',
      'Long-term stability and reliability',
    ],
    cta: 'Learn More',
  },
  {
    image: pressureTransmitterImg,
    imageFit: 'contain',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          PRESSURE TRANSMITTER
        </span>
        <br />
        Industrial Pressure Transmitters
      </>
    ),
    description:
      'High-performance pressure transmitters for precise and reliable pressure measurement in industrial processes. Engineered for harsh environments, these transmitters offer excellent accuracy, stability, and seamless integration with control systems.',
    features: [
      'Accurate pressure measurement (gauge, absolute, differential)',
      'Rugged, corrosion-resistant construction',
      'Wide pressure range options',
      'Digital and analog output signals',
      'Easy installation and configuration',
      'Long-term stability and low maintenance',
    ],
    cta: 'Learn More',
  },
  {
    image: automationProductsImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          AUTOMATION PRODUCTS
        </span>
        <br />
        PLC, VFD, HMI Controllers & Interfaces
      </>
    ),
    description:
      'Comprehensive automation solutions including PLCs (Programmable Logic Controllers), VFDs (Variable Frequency Drives), and HMIs (Human Machine Interfaces) for advanced process control, monitoring, and industrial automation.',
    features: [
      'Flexible PLC programming and logic control',
      'Energy-efficient VFDs for motor speed control',
      'Intuitive HMI touch interfaces',
      'Seamless integration with industrial networks',
      'Robust, industrial-grade reliability',
      'Remote monitoring and diagnostics',
    ],
    cta: 'Learn More',
  },
  {
    image: temperatureControllerImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          TEMPERATURE CONTROLLER
        </span>
        <br />
        Digital Temperature Controllers
      </>
    ),
    description:
      'Precision digital temperature controllers for industrial and process automation. Ensure optimal process stability, energy efficiency, and safety with advanced control algorithms, user-friendly interfaces, and robust construction.',
    features: [
      'Accurate PID temperature control',
      'Bright, easy-to-read digital display',
      'Multiple input/output options',
      'Programmable setpoints and alarms',
      'Compact, panel-mount design',
      'Reliable performance in harsh environments',
    ],
    cta: 'Learn More',
  },
  {
    image: servoMotorDriveImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          SERVO MOTOR & DRIVE
        </span>
        <br />
        Servo Motors & Servo Drives
      </>
    ),
    description:
      'High-performance servo motors and drives for precise motion control in automation, robotics, and CNC machinery. Delivering exceptional speed, torque, and accuracy for demanding industrial applications.',
    features: [
      'High-torque, high-efficiency servo motors',
      'Advanced digital servo drives',
      'Precise position, speed, and torque control',
      'Seamless integration with automation systems',
      'Compact, robust, and reliable design',
      'Easy setup and tuning',
    ],
    cta: 'Learn More',
  },
  {
    image: communicationInterfaceImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          COMMUNICATION INTERFACE
        </span>
        <br />
        RS485-USB & USB-Ethernet Converters
      </>
    ),
    description:
      'Industrial-grade communication interface solutions for seamless integration of legacy and modern automation systems. The RS485 to USB converter enables reliable serial communication with PLCs, sensors, and controllers, while the USB to Ethernet converter provides high-speed network connectivity for industrial devices and remote management.',
    features: [
      'Plug-and-play USB connectivity',
      'Robust RS485/RS422 serial interface',
      'High-speed USB 2.0/3.0 and Gigabit Ethernet support',
      'Galvanic isolation for signal integrity and device protection',
      'Wide operating temperature range',
      'Industrial-grade enclosure and connectors',
      'Compatible with major operating systems and automation software',
      'LED status indicators for diagnostics',
    ],
    cta: 'Learn More',
  },
  {
    image: temperatureScannerRecorderImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          TEMPERATURE SCANNER & RECORDER
        </span>
        <br />
        Multi-Channel Data Logging & Process Monitoring
      </>
    ),
    description:
      'Advanced temperature scanner and recorder for multi-point process monitoring, data logging, and alarm management. Ideal for industrial automation, this device offers high-accuracy measurement, real-time display, and secure data storage for critical process parameters.',
    features: [
      'Supports multiple thermocouple/RTD input channels',
      'High-resolution digital display and graphical trend recording',
      'User-configurable alarm setpoints and relay outputs',
      'Internal memory and USB/SD card data export',
      'Ethernet/RS485 communication for SCADA integration',
      'Password-protected configuration and audit trail',
      'Panel or wall-mount industrial enclosure',
      'Comprehensive software for data analysis and reporting',
    ],
    cta: 'Learn More',
  },
  {
    image: thyristorImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          THYRISTOR POWER CONTROLLER
        </span>
        <br />
        Precision Power Control for Industrial Heating
      </>
    ),
    description:
      'High-performance thyristor power controllers for precise and efficient control of electric heating elements in industrial processes. Designed for demanding automation environments, these controllers offer advanced firing modes, robust protection, and seamless integration with process control systems.',
    features: [
      'Phase angle and zero-cross firing modes',
      'Supports single-phase and three-phase loads',
      'Digital display and intuitive parameter setting',
      'Current, voltage, and power feedback control',
      'Built-in protection: overcurrent, overtemperature, short circuit',
      'Fieldbus/analog communication options (Modbus, Profibus, etc.)',
      'Compact, modular DIN-rail or panel mounting',
      'High reliability for continuous industrial operation',
    ],
    cta: 'Learn More',
  },
  {
    image: sensorsImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          SENSORS
        </span>
        <br />
        Industrial Sensors & Switches
      </>
    ),
    description:
      'Comprehensive range of industrial sensors and switches for automation, safety, and process control. Designed for high reliability and precision, these devices enable accurate detection, measurement, and feedback in demanding industrial environments.',
    features: [
      'Proximity, photoelectric, and inductive sensors',
      'Temperature, pressure, and level sensors',
      'Rotary encoders and limit switches',
      'Emergency stop and safety switches',
      'High immunity to electrical noise and harsh conditions',
      'Fast response and long operational life',
      'Easy installation and integration with PLCs/automation systems',
      'Wide range of form factors and sensing technologies',
    ],
    cta: 'Learn More',
  },
  {
    image: temperatureSensorImg,
    imageFit: 'cover',
    title: (
      <>
        <span
          className="inline-block mb-2 px-4 py-1 rounded-full bg-gradient-to-r from-primary to-accent text-white text-sm font-bold tracking-widest shadow-md"
          style={{ letterSpacing: '0.12em', lineHeight: 1.1 }}
        >
          TEMPERATURE SENSORS
        </span>
        <br />
        Industrial Temperature Sensors (RTD & Thermocouple)
      </>
    ),
    description:
      'High-precision temperature sensors for industrial process monitoring and control. Available in RTD (Pt100, Pt1000) and thermocouple (J, K, T, etc.) types, these sensors deliver reliable, accurate, and fast temperature measurement in harsh environments.',
    features: [
      'RTD (Pt100, Pt1000) and thermocouple (J, K, T, etc.) options',
      'Wide temperature measurement range',
      'Stainless steel sheath and armored cable for durability',
      'High accuracy and fast response time',
      'Customizable probe lengths and process connections',
      'Suitable for liquids, gases, and solids',
      'Compatible with transmitters, controllers, and PLCs',
      'Resistant to vibration, moisture, and corrosion',
    ],
    cta: 'Learn More',
  },
];

const Products = () => (
  <div className="flex min-h-screen min-h-[100dvh] bg-gray-50 w-full max-w-[100vw] overflow-x-hidden">
    <VerticalHeader />
    <section className="py-6 sm:py-8 md:py-16 md:pt-14 pl-0 w-full ml-0 md:ml-56 lg:ml-64 min-w-0 content-below-mobile-header">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 min-w-0">
        <h2 className="text-xl xs:text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-4 sm:mb-6 md:mb-8 text-primary break-words w-full max-w-full">Our Products</h2>
        <div className="grid gap-4 sm:gap-6 md:gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <MotionWrapper key={typeof product.title === 'string' ? product.title : i} delay={i * 0.1}>
              <Card {...product} imageFit={product.imageFit} onCtaClick={() => window.alert('Contact us for more info!')} />
            </MotionWrapper>
          ))}
        </div>
      </div>
      <BrandAffiliationDisclaimer additionalMargin={true} />
    </section>
  </div>
);

export default Products; 