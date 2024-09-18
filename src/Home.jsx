import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import './Styles/main.css';
import bgVideo from './content/bg.mp4';
import ThreeScene from './Scene.jsx';

function Navigation() {
  // Get the current location
  const location = useLocation();
  
  // Check if we are on the home page
  const isHomePage = location.pathname === '/';

  return isHomePage ? (
    <div className="navigation">
      <ul className="nav-links">
        <li className="linksLi">
          <div className="linkContainer"><Link to="/">HOME</Link></div>
        </li>
        <li className="linksLi">
          <div className="linkContainer"><Link to="/about">ABOUT US</Link></div>
        </li>
        <li className="linksLi">
          <div className="linkContainer"><a href="#">SHOP</a></div>
        </li>
        <li className="linksLi">
          <div className="linkContainer"><a href="#">CONTACTS</a></div>
        </li>
        <li className="linksLi">
          <div className="linkContainer"><a href="#">MORE INFORMATION</a></div>
        </li>
        <li className="linksLi">
          <div className="linkContainer"><a href="#">PRICING</a></div>
        </li>
        <li className="linksLi">
          <div className="linkContainer"><a href="#">SPONSORS</a></div>
        </li>
        <li className="linksLi">
          <div className="linkContainer"><a href="#">EDITOR</a></div>
        </li>
      </ul>
    </div>
  ) : null;
}

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={    
          <>
            <div className="video-background">
              <video muted loop autoPlay id="background-video">
                <source src={bgVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
            <div className="logoContainer">
              <h1>THE<br />BASE.</h1>
              <p>Resale Shop.</p>
              <p>Best Quality For Minimal Price.</p>
            </div>
            <div id="3dModel" className="Model"><ThreeScene /></div>
          </>
        } />
      </Routes>
    </Router>
  );
}

export default App;
