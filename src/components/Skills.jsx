import React, { useState } from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const Skills = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  // Updated category mapping for progress bars
  const getProgressBarClass = (category) => {
    const categoryMap = {
      "Programming & Scripting Languages": "languages",
      "Data Science & AI": "data-science",
      "Tools & Frameworks": "frameworks",
      "UI/UX Design": "design",
      Cybersecurity: "security",
      "Software Development": "development"
    };
    return categoryMap[category] || "languages";
  };

  const initialSkillsCount = window.innerWidth <= 768 ? 3 : 5;

  const skills = {
    "Programming & Scripting Languages": [
      { name: "Python", proficiency: 90 },
      { name: "JavaScript", proficiency: 85 },
      { name: "Java", proficiency: 85 },
      { name: "C", proficiency: 80 },
      { name: "C++", proficiency: 75 },
      { name: "PHP", proficiency: 70 },
      { name: "Swift", proficiency: 60 },
      { name: "C#", proficiency: 70 },
      { name: "SQL", proficiency: 80 },
      { name: "HTML", proficiency: 95 },
      { name: "CSS", proficiency: 90 }
    ],
    "Data Science & AI": [
      { name: "Machine Learning", proficiency: 50 },
      { name: "Deep Learning", proficiency: 30 },
      { name: "NLP", proficiency: 30 },
      { name: "Computer Vision", proficiency: 30 },
      { name: "Data Analytics", proficiency: 85 },
      { name: "Data Visualization", proficiency: 85 },
      { name: "Statistical Analysis", proficiency: 85 }
    ],
    "Tools & Frameworks": [
      { name: "Git", proficiency: 80 },
      { name: "React", proficiency: 75 },
      { name: "Node.js", proficiency: 70 },
      { name: "Bootstrap", proficiency: 85 },
      { name: "Scrum", proficiency: 30 }
    ],
    "UI/UX Design": [
      { name: "User Research", proficiency: 70 },
      { name: "Wireframing", proficiency: 75 },
      { name: "Prototyping", proficiency: 70 },
      { name: "Design Thinking", proficiency: 80 },
      { name: "Figma", proficiency: 85 },
      { name: "Adobe XD", proficiency: 75 }
    ],
    Cybersecurity: [
      { name: "Awareness", proficiency: 90 },
      { name: "Other", proficiency: 50 }
    ],
    "Software Development": [
      { name: "Full-stack Development", proficiency: 85 },
      { name: "Mobile Development", proficiency: 75 },
    ]
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <section id="skills" className="skills">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Skills
      </motion.h2>
      <motion.div
        className="skills-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {Object.entries(skills).map(([category, items]) => (
          <motion.div
            key={category}
            className="skill-category"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3>{category}</h3>
            <div
              className={`skill-list ${
                expandedCategories[category] ? "expanded" : ""
              }`}
            >
              <ul>
                {items.map((item, index) => (
                  <motion.li
                    key={index}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.1
                    }}
                    style={{
                      display:
                        !expandedCategories[category] &&
                        index >= initialSkillsCount
                          ? "none"
                          : "block"
                    }}
                  >
                    <div className="skill-name">
                      {item.name}
                      <span className="proficiency">{item.proficiency}%</span>
                    </div>
                    <div className="progress-bar-container">
                      <motion.div
                        className={`progress-bar ${getProgressBarClass(
                          category
                        )}`}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + index * 0.1
                        }}
                        style={{ width: `${item.proficiency}%` }}
                      />
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
            {items.length > initialSkillsCount && (
              <motion.button
                className="view-more-btn"
                onClick={() => toggleCategory(category)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {expandedCategories[category] ? "View Less" : "View More"}
              </motion.button>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Skills;
