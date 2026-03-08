import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import "./Header.css";
import "../styles/theme.css";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const isProjectsPage = location.pathname === '/projects';

  useEffect(() => {
    document.documentElement.classList.add("dark-mode");
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    const handleColorSchemeChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addListener(handleColorSchemeChange);

    return () => {
      darkModeMediaQuery.removeListener(handleColorSchemeChange);
    };
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark-mode");
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = !isMobileMenuOpen ? "hidden" : "";
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = "";
  };

  const handleNavClick = (sectionId) => {
    closeMobileMenu();
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      window.location.href = `/#${sectionId}`;
    } else {
      // If on home page, scroll to section
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleBackClick = () => {
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span className="logo-text">Abhiraj R.</span>
        </Link>

        <div className="header-right">
          {!isProjectsPage && (
            <>
              <nav className={`nav-menu ${isMobileMenuOpen ? "active" : ""}`}>
                <div className="nav-links">
                  <a href="#about" onClick={() => handleNavClick('about')}>
                    About
                  </a>
                  <a href="#skills" onClick={() => handleNavClick('skills')}>
                    Skills
                  </a>
                  <Link to="/projects" onClick={closeMobileMenu}>
                    Projects
                  </Link>
                  <a href="#contact" onClick={() => handleNavClick('contact')}>
                    Contact
                  </a>
                </div>
              </nav>

              <button
                className={`mobile-menu-btn ${isMobileMenuOpen ? "active" : ""}`}
                onClick={toggleMobileMenu}
                aria-label="Toggle menu"
              >
                <span className="menu-icon"></span>
              </button>
            </>
          )}

          {isProjectsPage && (
            <button
              className="back-btn"
              onClick={handleBackClick}
              aria-label="Go back to home"
            >
              <ArrowLeft className="back-icon" />
              <span>Back</span>
            </button>
          )}

          <button
            className={`theme-toggle ${isDarkMode ? "dark" : "light"}`}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            <span className="theme-toggle-icon">
              {isDarkMode ? "☀️" : "🌙"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
