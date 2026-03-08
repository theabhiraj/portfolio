import { useState, useEffect } from "react";
import { ref, onValue } from "firebase/database";
import { database } from "../firebase";
import { Mail, Linkedin, Instagram } from "lucide-react";
import "./Projects.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showContactPopup, setShowContactPopup] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const projectsRef = ref(database, 'projects');
    
    const unsubscribe = onValue(
      projectsRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            // Convert object to array if needed, or use directly if it's already an array
            const projectsArray = Array.isArray(data) ? data : Object.values(data);
            
            // Sort projects by period (newest first)
            const sortedProjects = projectsArray.sort((a, b) => {
              const getEndDate = (period) => {
                if (!period) return new Date(0);
                // Extract end date from period string (e.g., "Apr 2024 - Apr 2024" or "Nov 2025 - Dec 2025")
                const parts = period.split(' - ');
                const endDateStr = parts[1] || parts[0];
                return new Date(endDateStr);
              };
              
              return getEndDate(b.period) - getEndDate(a.period);
            });
            
            setProjects(sortedProjects);
          } else {
            setProjects([]);
          }
          setLoading(false);
        } catch (err) {
          setError("Failed to load projects");
          setLoading(false);
        }
      },
      (err) => {
        setError("Failed to connect to database");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Lock body scroll when modal or popup is open
  useEffect(() => {
    if (selectedProject || showContactPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject, showContactPopup]);

  const handleGetCode = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Get Code clicked');
    setShowContactPopup(true);
  };

  const handleCardClick = (project) => {
    setSelectedProject(project);
  };

  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  const handleContactOption = (platform) => {
    const contactLinks = {
      linkedin: "https://www.linkedin.com/in/theabhiraj/",
      instagram: "https://instagram.com/itheabhiraj",
      gmail: "mailto:theabhiraj.in@gmail.com"
    };
    window.open(contactLinks[platform], "_blank");
    setShowContactPopup(false);
  };

  if (loading) {
    return (
      <section id="projects" className="projects">
        <h2>   </h2>
        <div className="projects-content">
          <p style={{ textAlign: 'center', padding: '2rem' }}>Loading projects...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="projects" className="projects">
        <h2>   </h2>
        <div className="projects-content">
          <p style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="projects">
      <h2>   </h2>
      <div className="projects-content">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            style={{
              "--animation-delay": `${index * 0.1}s`
            }}
          >
            <div className="project-info" onClick={() => handleCardClick(project)}>
              <h3>{project.title}</h3>
              
              <p className="project-description">
                {project.description && project.description.length > 50 
                  ? project.description.substring(0, 50) + '...' 
                  : project.description}
              </p>

              {project.period && (
                <div className="project-period">
                  <span className="period-label">Period:</span>
                  <span className="period-text">{project.period}</span>
                </div>
              )}

              <div className="technologies">
                <span className="tech-label">Tech:</span>
                <span className="tech-stack">
                  {(() => {
                    const techText = Array.isArray(project.skills) 
                      ? project.skills.slice(0, 2).join(", ")
                      : (project.technologies || "N/A");
                    return techText.length > 40 ? techText.substring(0, 40) + '...' : techText;
                  })()}
                </span>
              </div>
            </div>
            
            <button
              className="card-get-code-btn"
              onClick={handleGetCode}
            >
              Get Code
            </button>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="project-modal-overlay" onClick={closeProjectModal}>
          <div className="project-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={closeProjectModal}>×</button>
            <h2>{selectedProject.title}</h2>
            
            <div className="modal-content">
              <p className="modal-description">{selectedProject.description}</p>

              {selectedProject.period && (
                <div className="modal-section">
                  <h4>Period</h4>
                  <p>{selectedProject.period}</p>
                </div>
              )}

              <div className="modal-section">
                <h4>Technologies</h4>
                <div className="modal-tech-tags">
                  {(Array.isArray(selectedProject.skills) 
                    ? selectedProject.skills 
                    : (selectedProject.technologies || "").split(", ")
                  ).map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>


            </div>
          </div>
        </div>
      )}

      {showContactPopup && (
        <div className="contact-popup-overlay" onClick={() => setShowContactPopup(false)}>
          <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
            <button className="close-popup" onClick={() => setShowContactPopup(false)}>×</button>
            <h3>Connect With Me</h3>
            <div className="contact-options">
              <button 
                className="contact-option linkedin"
                onClick={() => handleContactOption('linkedin')}
              >
                <Linkedin className="contact-icon" />
                <span>LinkedIn</span>
              </button>
              <button 
                className="contact-option instagram"
                onClick={() => handleContactOption('instagram')}
              >
                <Instagram className="contact-icon" />
                <span>Instagram</span>
              </button>
              <button 
                className="contact-option gmail"
                onClick={() => handleContactOption('gmail')}
              >
                <Mail className="contact-icon" />
                <span>Gmail</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
