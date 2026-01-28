import React from 'react';

const ExperienceCard = ({ 
  title, 
  company, 
  description, 
  skills = [], 
  achievements = [],
  location,
  date
}) => {
  return (
    <div className="experience-card">
      <div className="experience-content">
        <h3 className="experience-title">{title}</h3>
        <div className="experience-company-location">{company} • {location}</div>
        <div className="experience-date">{date}</div>
        
        <p className="experience-description">{description}</p>
        
        {achievements && achievements.length > 0 && (
          <div>
            <h4 className="experience-section-title">Key Achievements</h4>
            <ul className="experience-list">
              {achievements.map((achievement, index) => (
                <li key={index} className="experience-list-item">
                  {achievement}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {skills && skills.length > 0 && (
          <div className="experience-skills-container">
            <div className="experience-skills-grid">
              {skills.map((skill, index) => (
                <span key={index} className="experience-skill-tag">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
