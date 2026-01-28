import React from 'react';

const ProjectCard = ({ 
  title, 
  description, 
  skills = [], 
  imageUrl,
  embedUrl,
  projectUrl,
  githubUrl 
}) => {
  return (
    <div className="project-card">
      {embedUrl ? (
        <div className="project-embed">
          <iframe
            src={embedUrl}
            title={title}
            style={{
              width: '100%',
              height: '300px',
              border: 'none',
              borderRadius: '4px 4px 0 0',
            }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : imageUrl && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="project-image"
        />
      )}
      
      <div className="project-content">
        <h3 className="project-title">{title}</h3>
        <p className="project-description">{description}</p>
        
        <div className="skills-container">
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <span key={index} className="skill-tag">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="project-links">
          {embedUrl && (
            <a 
              href={embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              Open Full Screen
            </a>
          )}
          {projectUrl && (
            <a 
              href={projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              View Project
            </a>
          )}
          {githubUrl && (
            <a 
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer" 
              className="project-link"
            >
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
