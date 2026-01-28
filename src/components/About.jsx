import React from "react";
import ProfileCard from "./ProfileCard";

const About = () => {
  const handleContact = () => {
    window.location.href = 'mailto:proyer@ucsc.edu';
  };

  return (
    <div className="about-section">
      <div className="about-heading" style={{ marginLeft: '120px', paddingLeft: '2rem' }}>
        <h1 style={{ 
          color: '#00ffff', 
          textShadow: '0 0 20px rgba(0, 255, 255, 0.5)',
          fontFamily: 'inherit',
          letterSpacing: '0.15em'
        }}>About</h1>
      </div>

      <div className="about-container" style={{
        display: 'flex',
        gap: '3rem',
        alignItems: 'flex-start',
        padding: '2rem',
        marginLeft: '120px',
      }}>
        <div className="about-card-container" style={{ 
          flexShrink: 0,
          position: 'sticky',
          top: '0',
          alignSelf: 'flex-start',
        }}>
          <ProfileCard
            avatarUrl={`${process.env.PUBLIC_URL}/about_pfp.jpg`}
            miniAvatarUrl={`${process.env.PUBLIC_URL}/about_pfp.jpg`}
            name="Phoebe Royer"
            title="Developer & Designer"
            handle="phoeberoyerr"
            status="Available for work"
            contactText="Email"
            onContactClick={handleContact}
            behindGlowColor="rgba(0, 255, 255, 0.4)"
            innerGradient="linear-gradient(145deg, #0a1a1a 0%, #002020 100%)"
          />
        </div>

        <div className="about-content" style={{
          flex: 1,
          color: 'rgba(255, 255, 255, 0.85)',
          fontSize: '1rem',
          lineHeight: '1.9',
          maxHeight: '60vh',
          overflowY: 'auto',
          paddingRight: '1rem',
        }}>
          <p style={{ marginBottom: '1.5rem' }}>
            I'm a developer and designer blending technology with creative problem-solving. 
            My journey began with a fascination for interactive systems and games, which led 
            me to the University of California, Santa Cruz, where I pursued a B.S. in Computer 
            Science: Game Design.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            There, I combined hardware, software, and creative coding to develop projects 
            ranging from real-time OpenGL graphics to full-stack applications like my SpaceX 
            Flight Tracker.
          </p>

          <p style={{ marginBottom: '1.5rem' }}>
            Along the way, I've gained hands-on experience managing AWS S3 servers, building 
            responsive React frontends, and developing Node.js backends, while also mentoring 
            students in Python programming through the Academic Excellence Program.
          </p>

          <p>
            I'm passionate about creating intuitive, engaging experiences at the intersection 
            of design and technology and am seeking opportunities in Frontend, Full Stack, or 
            Software Engineering roles.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
