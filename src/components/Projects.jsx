import React from "react";
import "./Projects.css";

const Projects = () => {
  const projects = [
    {
      title: "Number Quest: Puzzle Game",
      technologies: "Flutter, Dart, Firebase",
      description:
        "A sliding puzzle game with multiple grid sizes and unique two-empty-space mechanics. Features include real-time database integration, timer, and hint system.",
      repoUrl: "https://github.com/theabhiraj/number_quest"
    },
    {
      title: "Shop Management System",
      technologies: "Flutter, Dart, Firebase",
      description:
        "Developed a comprehensive app for shop management including inventory tracking, sales analytics, employee scheduling, expense tracking , and payment processing.",
      repoUrl: "https://github.com/theabhiraj/shoflutter"
    },
    {
      title: "Lottery Management System",
      technologies: "PHP, SQL, Python, HTML, CSS, JavaScript, Bootstrap",
      description:
        "Designed a secure platform to automate ticket sales, results, and payment processing for local lottery systems. Features include user authentication, ticket generation, and automated winner selection.",
      repoUrl: "https://github.com/theabhiraj?tab=repositories"
    },
    {
      title: "Smartphone Buy & Sell WebApp",
      technologies: "PHP, SQL, Python, HTML, CSS, JavaScript, Bootstrap",
      description:
        "Built an intuitive platform for smartphone transactions with price comparison tools, automated market value estimation, and secure payment integration.",
      repoUrl: "https://github.com/theabhiraj?tab=repositories"
    },
    {
      title: "Shop Management WebApp",
      technologies: "HTML, CSS, JavaScript, PHP, MySQL, Python",
      description:
        "Developed a comprehensive tool for retail management including inventory tracking, sales analytics, employee scheduling, and payment processing.",
      repoUrl: "https://github.com/theabhiraj?tab=repositories"
    },
    {
      title: "Tournament Website",
      technologies: "HTML, CSS, JavaScript, PHP, MySQL, Python",
      description:
        "Created a tournament management platform with features for player registration, bracket generation, real-time score updates, and scheduling.",
      repoUrl: "https://github.com/theabhiraj?tab=repositories"
    },
    {
      title: "Jewellery Website",
      technologies: "PHP, SQL, Python, HTML, CSS, JavaScript, Bootstrap",
      description:
        "Designed an elegant e-commerce platform for jewellery retail featuring product categorization, dynamic pricing, and high-resolution image galleries.",
      repoUrl: "https://github.com/theabhiraj?tab=repositories"
    },
    {
      title: "E-Learning Website",
      technologies: "PHP, SQL, Python, HTML, CSS, JavaScript, APIs",
      description:
        "Built an educational platform with features for course management, progress tracking, assignment submission, and interactive learning materials.",
      repoUrl: "https://github.com/theabhiraj?tab=repositories"
    },
    {
      title: "Portfolio Projects",
      technologies: "HTML, CSS, JavaScript, Bootstrap, PHP, SQL, Python",
      description:
        "Collection of personal and academic projects showcasing web development skills and creative problem-solving abilities.",
      repoUrl: "https://github.com/theabhiraj?tab=repositories"
    }
  ];

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="projects-content">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card"
            style={{
              "--animation-delay": `${index * 0.1}s`
            }}
          >
            <div className="project-info">
              <h3>{project.title}</h3>
              
              <p className="project-description">{project.description}</p>

              <div className="technologies">
                <span className="tech-label">Technologies:</span>
                <span className="tech-stack">{project.technologies}</span>
              </div>
              <div className="project-links">
                {/* <button className="view-demo">View Demo</button> */}
                {/* <button className="view-code">View Code</button> */}
                <button
                  className="view-code"
                  onClick={() => window.open(project.repoUrl, "_blank")}>
                  View Code
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
