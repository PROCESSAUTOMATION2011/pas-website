import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import Automations from './pages/Automations';
import About from './pages/About';
import Enquiry from './pages/Enquiry';
import Header from './components/Header';
import Careers from './pages/Careers';
import EmployeeLogin from './pages/auth/login';
import { useAuth } from './components/AuthContext';
import img1 from './assets/automation-products.png'; // Use your preferred background image
import Contact from './pages/Contact';
import Modscan from './pages/Modscan';
import AnniversaryPopup from './components/AnniversaryPopup';

// AppLayout handles Navbar/Header, Footer, and main content
const AppLayout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="relative flex flex-col min-h-screen min-h-[100dvh] w-full max-w-[100vw] overflow-x-hidden">
      {/* Background image behind everything */}
      <div className="absolute inset-0 z-0 min-h-full">
        <img
          src={img1}
          alt="Background"
          className="w-full h-full min-h-full object-cover"
          draggable={false}
        />
      </div>
      {/* Overlay content: header, main, footer */}
      <div className="relative z-10 flex flex-col flex-1 min-h-0 w-full max-w-[100vw]">
        {location.pathname === '/' ? <Header /> : (location.pathname !== '/contact' ? <Navbar /> : null)}
        <main className="flex-1 min-h-0 flex flex-col min-w-0">{children}</main>
        <Footer />
      </div>
    </div>
  );
};

function ProtectedRoute({ children, role }) {
  const { token, role: userRole } = useAuth();
  if (!token) return <Navigate to={role === 'Admin' ? '/admin-login' : '/employee-login'} />;
  if (role && userRole !== role) return <Navigate to="/" />;
  return children;
}

function OverflowManager({ children }) {
  const location = useLocation();
  React.useEffect(() => {
    if (location.pathname === '/') {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [location.pathname]);
  return children;
}

const App = () => {
  return (
    <Router>
      <OverflowManager>
        {/* 15 Years Anniversary Popup - Shows globally */}
        <AnniversaryPopup />
        
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <Home />
              </AppLayout>
            }
          />
          <Route path="/products" element={<Products />} />
          <Route path="/automations" element={<Automations />} />
          <Route path="/modscan" element={<Modscan />} />
          <Route path="/about" element={<About />} />
          <Route path="/enquiry" element={<Enquiry />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/employee-login" element={<EmployeeLogin />} />
          <Route path="/contact" element={<AppLayout><Contact /></AppLayout>} />
        </Routes>
      </OverflowManager>
    </Router>
  );
};

export default App;