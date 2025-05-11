import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';
import SearchDonor from './SearchDonor';
import Register from './Registration';
import Login from './Login';
import Dashboard from './Dashboard';
import ResetPassword from './ResetPassword';

const data = [
  { image: 'img1.jpg' },
  { image: 'img3.png' },
  { image: 'img4.webp' },
];

function Layout({ children, isLoggedIn, onLogout }) {
  return (
    <>
      <nav id="navbar">
        <div id="nav-container">
          <div id="logo-title">
            <img src="logo.jpg" alt="Logo" id="logo" />
            <span id="title">
              <span>BLOOD</span>
              <span>BANK</span>
            </span>
          </div>
          <div id="header">
            <Link to="/" className="nav-link">Home</Link>
            {!isLoggedIn && (
              <>
                <Link to="/register" className="nav-link">Donor Signup</Link>
                <Link to="/login" className="nav-link">Login</Link>
              </>
            )}
            {isLoggedIn && (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/search-donor" className="nav-link">Search Donor</Link>
                <button className="nav-link logout-btn" onClick={onLogout}>Logout</button>
              </>
            )}
          </div>
        </div>
      </nav>

      <main>{children}</main>

      <footer id="footer">
        <div className="about-us">
          <h2 className="footer-heading">About Us</h2>
          <p>Phone: +91 6302167466</p>
          <p>Email: contact@yourwebsite.com</p>
          <p>Address: 567, Main Street, Vijayawada, India</p>
        </div>
        <div className="social-media">
          <label className="copyrighttext">© 2025 All rights reserved.</label>
          {['s1.png', 's2.png', 's3.png', 's4.webp'].map((src, i) => (
            <img key={i} className="socialmediaicon" src={src} alt={`Social ${i + 1}`} />
          ))}
        </div>
      </footer>
    </>
  );
}

function Home({ isLoggedIn }) {
  const settings = {
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <Layout isLoggedIn={isLoggedIn}>
      <div id="Slide">
        <Slider {...settings}>
          {data.map((item, index) => (
            <div key={index}>
              <img src={item.image} alt={`Slide ${index + 1}`} style={{ width: '100%', height: 'auto' }} />
            </div>
          ))}
        </Slider>
      </div>
      <div id="container">
        <div id="box">
          <div id="eligibilty"><h4>HOSPITAL MANAGEMENT</h4></div>
          <div id="compatibilty"><h4>DONOR MANAGEMENT</h4></div>
          <div id="bloodfacts"><h4>REQUEST HANDLING</h4></div>
        </div>
        
      </div>
    </Layout>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
    alert('Logged out successfully');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
        <Route path="/register" element={<Layout isLoggedIn={isLoggedIn}><Register /></Layout>} />
        <Route path="/login" element={<Layout isLoggedIn={isLoggedIn}><Login setIsLoggedIn={setIsLoggedIn} /></Layout>} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Layout isLoggedIn={isLoggedIn}><Dashboard /></Layout>} />
        <Route path="/search-donor" element={<Layout isLoggedIn={isLoggedIn}><SearchDonor /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
