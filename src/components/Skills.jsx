import { useState } from "react";
import { motion } from "framer-motion";
import "./Skills.css";

const Skills = () => {
  const [expandedCategories, setExpandedCategories] = useState({});

  // Updated category mapping for progress bars
  const getProgressBarClass = (category) => {
    const categoryMap = {
      "Software Development": "development",
      "Languages & Frameworks": "languages",
      "UI/UX Design": "design"
    };
    return categoryMap[category] || "languages";
  };

  // Get background color for inline style fallback
  const getProgressBarColor = (category) => {
    const colorMap = {
      "Software Development": "linear-gradient(90deg, #0072ff, #00c6ff)",
      "Languages & Frameworks": "linear-gradient(90deg, #FF6B6B, #FF8E53)",
      "UI/UX Design": "linear-gradient(90deg, #FC466B, #3F5EFB)"
    };
    return colorMap[category] || "linear-gradient(90deg, #FF6B6B, #FF8E53)";
  };

  const initialSkillsCount = window.innerWidth <= 768 ? 3 : 5;

  const skills = {
    "Software Development": [
      { name: "Full-stack Development", proficiency: 85 },
      { name: "Mobile Development", proficiency: 90 },
      { name: "Web Development", proficiency: 90 },
    ],
    "Languages & Frameworks": [
      { name: "Flutter & Dart", proficiency: 85 },
      { name: "React & Next.js", proficiency: 75 },
      { name: "Python", proficiency: 70 },
      { name: "PHP", proficiency: 70 }
    ],
    "UI/UX Design": [
      { name: "User Research", proficiency: 70 },
      { name: "Wireframing", proficiency: 75 },
      { name: "Prototyping", proficiency: 70 },
      { name: "Design Thinking", proficiency: 80 }
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
                        // style={{ 
                        //   width: `${item.proficiency}%`
                        // }}
                        style={{ 
                          width: `${item.proficiency}%`,
                          background: getProgressBarColor(category)
                        }}
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
