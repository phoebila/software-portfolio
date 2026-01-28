import React from 'react';
import { projectDetails } from './ProjectsData';
import AnimatedList from './AnimatedList';

const ProjectMenu = ({ onProjectClick }) => {
  // Convert the project details object into an array
  const projects = Object.values(projectDetails);

  const renderProjectItem = (project, index) => (
    <div style={{ width: '100%' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '0.5rem',
      }}>
        <span style={{
          fontSize: '0.75rem',
          color: 'rgba(0, 255, 255, 0.7)',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          {project.date}
        </span>
        <span style={{
          fontSize: '0.7rem',
          color: 'rgba(255, 255, 255, 0.5)',
          letterSpacing: '0.05em',
        }}>
          {project.category} / {project.type}
        </span>
      </div>
      <h3 style={{
        fontSize: '1.1rem',
        fontWeight: 600,
        color: '#fff',
        margin: 0,
        lineHeight: 1.3,
      }}>
        {project.title}
      </h3>
      <p style={{
        fontSize: '0.85rem',
        color: 'rgba(255, 255, 255, 0.6)',
        margin: '0.5rem 0 0',
        lineHeight: 1.5,
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
      }}>
        {project.description}
      </p>
      <div style={{
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap',
        marginTop: '0.75rem',
      }}>
        {project.skills.slice(0, 4).map((skill, i) => (
          <span key={i} style={{
            fontSize: '0.65rem',
            padding: '0.25rem 0.5rem',
            background: 'rgba(0, 255, 255, 0.1)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            borderRadius: '2px',
            color: 'rgba(0, 255, 255, 0.8)',
            letterSpacing: '0.05em',
          }}>
            {skill}
          </span>
        ))}
        {project.skills.length > 4 && (
          <span style={{
            fontSize: '0.65rem',
            padding: '0.25rem 0.5rem',
            color: 'rgba(255, 255, 255, 0.4)',
          }}>
            +{project.skills.length - 4} more
          </span>
        )}
      </div>
    </div>
  );

  const handleItemSelect = (item, index) => {
    onProjectClick(item.id);
  };

  return (
    <div className="projects-menu" style={{ width: '100%', maxWidth: '600px' }}>
      <AnimatedList
        items={projects}
        onItemSelect={handleItemSelect}
        showGradients={true}
        enableArrowNavigation={true}
        displayScrollbar={true}
        renderItem={renderProjectItem}
      />
    </div>
  );
};

export default ProjectMenu;
