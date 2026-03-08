import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './ViewAllProjects.css';

const ViewAllProjects = () => {
  const navigate = useNavigate();

  const handleViewProjects = () => {
    navigate('/projects');
  };

  return (
    <section className="view-all-projects-section">
      <div className="view-all-projects-container">
        <div className="view-all-projects-content">
          <h2 className="view-all-projects-title">Explore My Work</h2>
          <p className="view-all-projects-description">
            Check out my portfolio of projects showcasing web development, design, and innovative solutions.
          </p>
          <button className="view-all-projects-btn" onClick={handleViewProjects}>
            <span>View All Projects</span>
            <ArrowRight className="arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ViewAllProjects;
