import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import DarkVeil from './components/DarkVeil';
import FisheyeName from './components/FisheyeName';
import Dock from './components/Dock';
import LogoLoop from './components/LogoLoop';
import About from './components/About';
import Experience from './components/Experience';
import ExperienceMenu from './components/ExperienceMenu';
import ExperienceCard from './components/ExperienceCard';
import ProjectCard from './components/ProjectCard';
import ProjectMenu from './components/ProjectMenu';
import { projectDetails } from './components/ProjectsData';
import { experienceData } from './components/ExperienceData';
import './components/NewComponents.css';

// Navigation items for the dock
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
];

// Home/Landing component - now includes the dock
const LandingPage = ({ navItems, currentPath, onNavigate }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 10,
    }}>
      <FisheyeName name="Phoebe  Royer  " />
      
      <p style={{
        fontSize: '0.9rem',
        color: 'rgba(0, 255, 255, 0.9)',
        marginTop: '-30px',
        letterSpacing: '0.4em',
        textTransform: 'uppercase',
        fontFamily: 'monospace',
        textShadow: '0 0 10px rgba(0, 255, 255, 0.8), 0 0 20px rgba(0, 255, 255, 0.4)',
      }}>Developer & Game Designer</p>
      
      {/* Social links with LogoLoop */}
      <div style={{ marginTop: '160px', width: '280px' }}>
        <LogoLoop
          logos={[
            {
              node: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              ),
              href: 'https://github.com/phoebila',
              title: 'GitHub',
            },
            {
              node: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              ),
              href: 'https://instagram.com/phoeberoyerr',
              title: 'Instagram',
            },
            {
              node: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              ),
              href: 'https://www.linkedin.com/in/phoebe-royer/',
              title: 'LinkedIn',
            },
            {
              node: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M0 3v18h24v-18h-24zm21.518 2l-9.518 7.713-9.518-7.713h19.036zm-19.518 14v-11.817l10 8.104 10-8.104v11.817h-20z"/>
                </svg>
              ),
              href: 'mailto:proyer@ucsc.edu',
              title: 'Email',
            },
          ]}
          speed={40}
          logoHeight={20}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
        />
      </div>
    </div>
  );
};

// Wrapper component to handle navigation logic
const AppContent = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (isMobile && !newIsMobile && location.pathname === '/project-detail') {
        navigate('/projects');
      }
      setIsMobile(newIsMobile);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile, location.pathname, navigate]);

  const handleNavigation = (path) => {
    const navigatePath = path === 'home' ? '' : path;
    
    if ((navigatePath !== location.pathname.slice(1)) && !isAnimating) {
      setIsAnimating(true);
      setSelectedProject(null);
      setSelectedExperience(null);
      setTimeout(() => {
        navigate(`/${navigatePath}`);
        setTimeout(() => {
          setIsAnimating(false);
        }, 500);
      }, 300);
    }
  };

  const handleProjectClick = (projectId) => {
    setIsAnimating(true);
    setTimeout(() => {
      const project = projectDetails[projectId];
      setSelectedProject(project);
      navigate('/project-detail');
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);
  };

  const handleBackToProjects = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedProject(null);
      navigate('/projects');
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);
  };

  const handleExperienceClick = (experienceId) => {
    setIsAnimating(true);
    setTimeout(() => {
      const experience = experienceData[experienceId];
      setSelectedExperience(experience);
      navigate('/experience-detail');
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);
  };

  const handleBackToExperiences = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setSelectedExperience(null);
      navigate('/experience');
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 300);
  };

  const currentPath = location.pathname.slice(1) || 'home';

  return (
    <div className="app-container">
      {/* Dark Veil Background */}
      <div className="background-container">
        <DarkVeil
          hueShift={180}
          noiseIntensity={0.02}
          scanlineIntensity={0.06}
          speed={0.3}
          scanlineFrequency={600}
          warpAmount={3.5}
        />
      </div>
      
      {/* Main content area */}
      <div className={`content-wrapper ${isAnimating ? 'fade-out' : 'fade-in'}`}>
        <Routes>
          <Route path="/" element={
            <LandingPage 
              navItems={navItems}
              currentPath={currentPath}
              onNavigate={handleNavigation}
            />
          } />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={
            <div className="page-content">
              <About />
            </div>
          } />
          <Route path="/projects" element={
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              paddingLeft: '100px',
            }}>
              <div style={{
                width: '100%',
                maxWidth: '550px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <h1 style={{ 
                  color: '#00ffff', 
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  fontFamily: 'inherit',
                  letterSpacing: '0.15em',
                  marginBottom: '1rem',
                }}>Projects</h1>
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                }}>
                  <ProjectMenu onProjectClick={handleProjectClick} />
                </div>
              </div>
            </div>
          } />
          <Route path="/project-detail" element={
            selectedProject && (
              <div className="page-content" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto',
                paddingTop: '20px',
                paddingBottom: '60px',
              }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
                  <button 
                    onClick={handleBackToProjects}
                    className="back-button"
                    style={{ marginBottom: '1rem' }}
                  >
                    ← BACK TO PROJECTS  
                  </button>
                  <ProjectCard {...selectedProject} />
                </div>
              </div>
            )
          } />
          <Route path="/experience" element={
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              paddingLeft: '100px',
            }}>
              <div style={{
                width: '100%',
                maxWidth: '550px',
                maxHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <h1 style={{ 
                  color: '#00ffff', 
                  textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
                  fontFamily: 'inherit',
                  letterSpacing: '0.15em',
                  marginBottom: '1rem',
                }}>Experience</h1>
                <div style={{
                  flex: 1,
                  overflowY: 'auto',
                }}>
                  <ExperienceMenu onExperienceClick={handleExperienceClick} />
                </div>
              </div>
            </div>
          } />
          <Route path="/experience-detail" element={
            selectedExperience && (
              <div className="page-content" style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflowY: 'auto',
                paddingTop: '20px',
                paddingBottom: '60px',
              }}>
                <div style={{ width: '100%', maxWidth: '450px' }}>
                  <button 
                    onClick={handleBackToExperiences}
                    className="back-button"
                    style={{ marginBottom: '1rem' }}
                  >
                    ← BACK TO EXPERIENCES  
                  </button>
                  <ExperienceCard {...selectedExperience} />
                </div>
              </div>
            )
          } />
        </Routes>
      </div>

      {/* Single Dock that transitions between horizontal (landing) and vertical (other pages) */}
      <Dock 
        items={navItems}
        activeItem={currentPath}
        onNavigate={handleNavigation}
        isLanding={currentPath === 'home'}
      />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter basename="/software-portfolio">
      <AppContent />
    </BrowserRouter>
  );
};

export default App;
