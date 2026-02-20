import React from 'react';
import Footer from '../components/Footer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import pasLogo from '../assets/pas-logo.png';
import img1 from '../assets/control-panel.png';
import img2 from '../assets/automation-products.png';
import img3 from '../assets/motors.png'; // Motor image
import img4 from '../assets/oven-control-panel.png';
import img5 from '../assets/servo-motor-drive.png';

// Make the motor image the first slide
const heroImages = [img3, img1, img2, img4, img5];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden">
      {/* Hero/Transition Region */}
      <div className="relative w-full flex-1 flex flex-col justify-center items-center overflow-hidden min-h-0">
        {/* Swiper Slider as Background */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 3500, disableOnInteraction: false }}
          loop
          className="absolute inset-0 w-full h-full z-0 hero-swiper min-h-[100dvh]"
        >
          {heroImages.map((img, idx) => (
            <SwiperSlide key={idx}>
              <div 
                className="hero-slide-bg w-full h-full min-h-[100dvh]"
                style={{ 
                  backgroundImage: `url(${img})`,
                  width: '100%',
                  height: '100%',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center center',
                  backgroundRepeat: 'no-repeat',
                  filter: 'brightness(0.7)',
                  position: 'absolute',
                  inset: 0,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
        {/* Overlay Content (empty) */}
        <div className="absolute inset-0 z-10 flex justify-center items-center text-center w-full h-full min-h-[100dvh] px-3 xs:px-4 safe-area-inset-top safe-area-inset-bottom" style={{ background: 'none' }}>
          {/* No overlay text */}
        </div>
      </div>
      {/* Sticky Footer always at the bottom */}
      <div className="fixed bottom-0 left-0 w-full z-20 max-w-[100vw]">
        <Footer />
      </div>
      
      <style>{`
        .hero-swiper,
        .hero-swiper .swiper-wrapper,
        .hero-swiper .swiper-slide {
          height: 100% !important;
          min-height: 100vh !important;
          min-height: 100dvh !important;
        }
        .hero-slide-bg {
          min-height: 100vh !important;
          min-height: 100dvh !important;
        }
        @media (max-width: 768px) {
          .hero-swiper { touch-action: pan-y; }
          .hero-slide-bg { background-position: center center !important; }
        }
        @media (max-width: 896px) and (orientation: landscape) {
          .hero-slide-bg { background-position: center center !important; }
        }
      `}</style>
    </div>
  );
}
