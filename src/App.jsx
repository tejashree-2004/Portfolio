import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

// ============================================================================
// NEURAL NETWORK BACKGROUND COMPONENT
// ============================================================================
const NeuralNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Neural nodes
    const nodes = [];
    const nodeCount = 80;
    
    class Node {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.pulsePhase = Math.random() * Math.PI * 2;
      }
      
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        this.pulsePhase += 0.02;
      }
      
      draw() {
        const pulse = Math.sin(this.pulsePhase) * 0.5 + 0.5;
        const alpha = 0.3 + pulse * 0.4;
        
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
        ctx.fill();
        
        // Glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = 'rgba(0, 255, 255, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }
    
    // Initialize nodes
    for (let i = 0; i < nodeCount; i++) {
      nodes.push(new Node());
    }
    
    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(5, 8, 20, 0.1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw nodes
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const alpha = (1 - distance / 150) * 0.2;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(0, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return <canvas ref={canvasRef} className="neural-canvas" />;
};

// ============================================================================
// TERMINAL BOOT SEQUENCE
// ============================================================================
const BootSequence = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  
  const bootLines = [
    "INITIALIZING BACKEND SYSTEMS...",
    "LOADING API MODULES... ✓",
    "CONNECTING TO DATABASE... ✓",
    "DEPLOYING SERVER INFRASTRUCTURE... ✓",
    "SYSTEM ONLINE",
  ];
  
  useEffect(() => {
    let currentLine = 0;
    const interval = setInterval(() => {
      if (currentLine < bootLines.length) {
        setLines(prev => [...prev, bootLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
        setTimeout(onComplete, 800);
      }
    }, 400);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <motion.div
      className="boot-sequence"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="btn red"></span>
            <span className="btn yellow"></span>
            <span className="btn green"></span>
          </div>
          <div className="terminal-title">system.boot</div>
        </div>
        <div className="terminal-body">
          {lines.map((line, i) => (
            <motion.div
              key={i}
              className="terminal-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <span className="prompt">{'>'}</span> {line}
            </motion.div>
          ))}
          <motion.div
            className="cursor-blink"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          >
            █
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// HERO SECTION - MISSION CONTROL HEADER
// ============================================================================
const HeroSection = () => {
  return (
    <section className="hero-section">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
        <motion.div
          className="status-indicator"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
        >
          <div className="pulse-ring"></div>
          <div className="pulse-ring delay-1"></div>
          <div className="status-dot"></div>
        </motion.div>
        
        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          TEJASHREE N
        </motion.h1>
        
        <motion.div
          className="hero-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="label">DESIGNATION:</span>
          <span className="value">SOFTWARE DEVELOPER and AI ENGINEER</span>
        </motion.div>
        
        <motion.p
          className="hero-description"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Backend development specialist building scalable server-side systems.
          Experienced in REST APIs, database design, and cloud deployments.
          From internships to production-grade backend infrastructure.
        </motion.p>
        
        <motion.div
          className="hero-metrics"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
        >
          <div className="metric">
            <div className="metric-value">9.02</div>
            <div className="metric-label">CGPA</div>
          </div>
          <div className="metric">
            <div className="metric-value">3+</div>
            <div className="metric-label">INTERNSHIPS</div>
          </div>
          <div className="metric">
            <div className="metric-value">REST</div>
            <div className="metric-label">API EXPERT</div>
          </div>
          <div className="metric">
            <div className="metric-value">AWS</div>
            <div className="metric-label">DEPLOYED</div>
          </div>
        </motion.div>
        
        <motion.div
          className="cta-buttons"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
        >
          <a href="mailto:tejvarshu04@gmail.com" className="btn-primary">
            <span>INITIALIZE CONTACT</span>
            <div className="btn-glow"></div>
          </a>
          <a href="https://github.com/tejashree-2004" target="_blank" rel="noopener noreferrer" className="btn-secondary">
            <span>VIEW GITHUB</span>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================================================
// AI/ML MODULES SECTION
// ============================================================================
const AIModules = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const modules = [
    {
      id: "REST_API",
      name: "REST API Development",
      status: "ACTIVE",
      tech: ["Django", "FastAPI", "REST APIs"],
      description: "Built scalable REST APIs with Django and FastAPI for healthcare and IoT platforms. Implemented secure authentication, data validation, and optimized database queries.",
      metrics: { endpoints: "25+", uptime: "99.9%" }
    },
    {
      id: "DATABASE",
      name: "Database Architecture",
      status: "ACTIVE",
      tech: ["MySQL", "NoSQL", "Query Optimization"],
      description: "Designed and optimized MySQL and NoSQL databases. Improved query performance by 40% through indexing and schema optimization for healthcare record systems.",
      metrics: { performance: "40% faster", reliability: "99.2%" }
    },
    {
      id: "CLOUD_OPS",
      name: "Cloud Deployment",
      status: "ACTIVE",
      tech: ["AWS EC2", "Docker", "CI/CD"],
      description: "Deployed and managed backend services on AWS EC2 with Docker containerization. Built CI/CD pipelines using GitHub Actions for automated testing and deployment.",
      metrics: { deployments: "50+", automation: "100%" }
    }
  ];
  
  return (
    <section className="ai-modules-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        <h2 className="section-title">
          <span className="section-icon">⚡</span>
          BACKEND SYSTEMS
        </h2>
        <div className="section-subtitle">Server-Side Development & Infrastructure</div>
      </motion.div>
      
      <div className="modules-grid">
        {modules.map((module, index) => (
          <motion.div
            key={module.id}
            className="module-card"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2, duration: 0.6 }}
          >
            <div className="module-header">
              <div className="module-id">{module.id}</div>
              <div className={`module-status ${module.status.toLowerCase()}`}>
                <div className="status-pulse"></div>
                {module.status}
              </div>
            </div>
            
            <h3 className="module-name">{module.name}</h3>
            <p className="module-description">{module.description}</p>
            
            <div className="module-tech">
              {module.tech.map(tech => (
                <span key={tech} className="tech-tag">{tech}</span>
              ))}
            </div>
            
            <div className="module-metrics">
              {Object.entries(module.metrics).map(([key, value]) => (
                <div key={key} className="metric-item">
                  <span className="metric-key">{key}:</span>
                  <span className="metric-val">{value}</span>
                </div>
              ))}
            </div>
            
            <div className="module-border"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// SOFTWARE ENGINEERING SECTION
// ============================================================================
const SoftwareEngineering = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const systems = [
    {
      name: "Real-Time Digital Twin System",
      company: "Praya Labs",
      type: "PRODUCTION SYSTEM",
      tech: ["Unity", "C#", "IoT Pipelines", "Real-time Sync"],
      achievement: "40% latency reduction in live data streaming",
      scope: "Built synchronized hardware-software pipeline for industrial monitoring"
    },
    {
      name: "Healthcare Platform Infrastructure",
      company: "Datayaan Pvt. Ltd.",
      type: "FULL-STACK",
      tech: ["Vue.js", "Django", "REST APIs", "CI/CD"],
      achievement: "Deployed scalable components with GitHub Actions automation",
      scope: "Secure data exchange architecture for healthcare data management"
    },
    {
      name: "Blockchain Healthcare System",
      company: "CareChain (Personal)",
      type: "DISTRIBUTED SYSTEM",
      tech: ["Solidity", "IPFS", "Vue.js", "Django", "MetaMask"],
      achievement: "40% performance improvement in data retrieval",
      scope: "IEEE-published secure healthcare record system with access control"
    }
  ];
  
  return (
    <section className="software-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
      >
        <h2 className="section-title">
          <span className="section-icon">🔧</span>
          ENGINEERING SYSTEMS
        </h2>
        <div className="section-subtitle">Production-Grade Software Architecture</div>
      </motion.div>
      
      <div className="systems-timeline">
        {systems.map((system, index) => (
          <motion.div
            key={index}
            className="system-card"
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: index * 0.15, duration: 0.6 }}
          >
            <div className="system-marker">
              <div className="marker-dot"></div>
              <div className="marker-line"></div>
            </div>
            
            <div className="system-content">
              <div className="system-meta">
                <span className="system-type">{system.type}</span>
                <span className="system-company">{system.company}</span>
              </div>
              
              <h3 className="system-name">{system.name}</h3>
              <p className="system-scope">{system.scope}</p>
              
              <div className="system-achievement">
                <span className="achievement-icon">⚡</span>
                {system.achievement}
              </div>
              
              <div className="system-tech">
                {system.tech.map(tech => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// SKILLS VISUALIZATION - SYSTEM ARCHITECTURE
// ============================================================================
const SkillsArchitecture = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const skillCategories = [
    {
      layer: "BACKEND LAYER",
      color: "#00ffff",
      skills: [
        { name: "Python/Django", level: 95 },
        { name: "FastAPI", level: 85 },
        { name: "REST APIs", level: 90 },
        { name: "Node.js", level: 80 }
      ]
    },
    {
      layer: "DATABASE LAYER",
      color: "#00ff88",
      skills: [
        { name: "MySQL", level: 90 },
        { name: "NoSQL", level: 80 },
        { name: "Query Optimization", level: 85 },
        { name: "Database Design", level: 90 }
      ]
    },
    {
      layer: "INFRASTRUCTURE LAYER",
      color: "#ff00ff",
      skills: [
        { name: "AWS (EC2, S3)", level: 80 },
        { name: "Docker & CI/CD", level: 85 },
        { name: "Git & GitHub Actions", level: 90 },
        { name: "Linux/Unix", level: 85 }
      ]
    }
  ];
  
  return (
    <section className="skills-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
      >
        <h2 className="section-title">
          <span className="section-icon">⚙️</span>
          SYSTEM ARCHITECTURE
        </h2>
        <div className="section-subtitle">Technical Stack & Proficiency</div>
      </motion.div>
      
      <div className="skills-layers">
        {skillCategories.map((category, catIndex) => (
          <motion.div
            key={category.layer}
            className="skill-layer"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: catIndex * 0.2 }}
          >
            <div className="layer-header" style={{ borderColor: category.color }}>
              <div className="layer-indicator" style={{ backgroundColor: category.color }}></div>
              <h3 className="layer-name">{category.layer}</h3>
            </div>
            
            <div className="layer-skills">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  className="skill-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: catIndex * 0.2 + skillIndex * 0.1 }}
                >
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-level">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-bg">
                    <motion.div
                      className="skill-bar-fill"
                      style={{ backgroundColor: category.color }}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ delay: catIndex * 0.2 + skillIndex * 0.1 + 0.3, duration: 1 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// PROJECTS - DEPLOYMENT LOGS
// ============================================================================
const DeploymentLogs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const projects = [
    {
      id: "PROJ_001",
      name: "CareChain Backend System",
      tagline: "Django REST API for Healthcare Platform",
      status: "DEPLOYED",
      impact: "40% Performance Improvement | Secure APIs",
      tech: ["Django", "REST API", "MySQL", "Authentication"],
      description: "Engineered secure Django REST API backend for blockchain healthcare platform. Implemented authentication, access control, and database optimization achieving 40% performance improvement in data retrieval.",
      links: {
        github: "https://github.com/tejashree-2004/CareChain",
        publication: "https://ieeexplore.ieee.org/document/11135177"
      }
    },
    {
      id: "PROJ_002",
      name: "Healthcare Platform API",
      tagline: "Scalable Backend Services",
      status: "DEPLOYED",
      impact: "CI/CD Automation | 99% Uptime",
      tech: ["Django", "REST APIs", "CI/CD", "GitHub Actions"],
      description: "Developed scalable backend services with Vue.js integration at Datayaan. Built secure REST endpoints, implemented CI/CD pipelines with GitHub Actions for consistent deployments.",
      links: {
        github: "https://github.com/tejashree-2004"
      }
    },
    {
      id: "PROJ_003",
      name: "AWS Deployment Pipeline",
      tagline: "Automated Cloud Infrastructure",
      status: "ACTIVE",
      impact: "Zero-Downtime Deployments | Dockerized",
      tech: ["Docker", "AWS EC2", "GitHub Actions", "Django"],
      description: "Architected automated build-test-deploy pipeline for Django applications. Dockerized services and deployed to AWS EC2 with automated testing and zero-downtime deployments.",
      links: {
        github: "https://github.com/tejashree-2004/"
      }
    }
  ];
  
  return (
    <section className="projects-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
      >
        <h2 className="section-title">
          <span className="section-icon">🚀</span>
          PROJECT PORTFOLIO
        </h2>
        <div className="section-subtitle">Backend Development & Deployment</div>
      </motion.div>
      
      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="project-card"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: index * 0.15, duration: 0.5 }}
          >
            <div className="project-header">
              <div className="project-id">{project.id}</div>
              <div className={`project-status ${project.status.toLowerCase()}`}>
                {project.status}
              </div>
            </div>
            
            <h3 className="project-name">{project.name}</h3>
            <p className="project-tagline">{project.tagline}</p>
            
            <div className="project-impact">
              <span className="impact-icon">⚡</span>
              {project.impact}
            </div>
            
            <p className="project-description">{project.description}</p>
            
            <div className="project-tech">
              {project.tech.map(tech => (
                <span key={tech} className="tech-chip">{tech}</span>
              ))}
            </div>
            
            <div className="project-links">
              {project.links.github && (
                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>GitHub</span>
                  <span className="link-arrow">→</span>
                </a>
              )}
              {project.links.demo && (
                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>Live Demo</span>
                  <span className="link-arrow">→</span>
                </a>
              )}
              {project.links.publication && (
                <a href={project.links.publication} target="_blank" rel="noopener noreferrer" className="project-link">
                  <span>Publication</span>
                  <span className="link-arrow">→</span>
                </a>
              )}
            </div>
            
            <div className="project-glow"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

// ============================================================================
// ENGINEERING PHILOSOPHY
// ============================================================================
const EngineeringPhilosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const principles = [
    {
      icon: "🔧",
      title: "API-First Design",
      description: "Design robust, scalable REST APIs that serve as the backbone of applications. Focus on clear contracts, versioning, and documentation."
    },
    {
      icon: "⚡",
      title: "Performance-Driven",
      description: "Optimize database queries, cache strategically, and profile ruthlessly. Every millisecond counts in user experience."
    },
    {
      icon: "🔄",
      title: "DevOps Mindset",
      description: "Own the full deployment lifecycle. From Docker containers to CI/CD pipelines, automate everything that can be automated."
    },
    {
      icon: "📊",
      title: "Data-First Thinking",
      description: "Backend systems are about data flow. Design schemas carefully, maintain data integrity, and optimize for access patterns."
    }
  ];
  
  return (
    <section className="philosophy-section" ref={ref}>
      <motion.div
        className="section-header"
        initial={{ opacity: 0, x: -30 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
      >
        <h2 className="section-title">
          <span className="section-icon">💡</span>
          ENGINEERING PRINCIPLES
        </h2>
        <div className="section-subtitle">How I Build Intelligent Systems</div>
      </motion.div>
      
      <div className="principles-grid">
        {principles.map((principle, index) => (
          <motion.div
            key={index}
            className="principle-card"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="principle-icon">{principle.icon}</div>
            <h3 className="principle-title">{principle.title}</h3>
            <p className="principle-description">{principle.description}</p>
          </motion.div>
        ))}
      </div>
      
      <motion.div
        className="philosophy-quote"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.6 }}
      >
        <div className="quote-mark">"</div>
        <p className="quote-text">
          I build backend systems with a focus on scale, reliability, and developer experience. I care about clean APIs, stable infrastructure, and architectures that handle growth without drama. From data modeling to deployment automation, I work to keep the server side fast, consistent, and dependable.
        </p>
        <div className="quote-author">— Engineering Philosophy</div>
      </motion.div>
    </section>
  );
};

// ============================================================================
// CONTACT SECTION - MISSION CONTROL FOOTER
// ============================================================================
const ContactSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <section className="contact-section" ref={ref}>
      <motion.div
        className="contact-container"
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
      >
        <div className="contact-header">
          <motion.div
            className="contact-status"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : {}}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <div className="status-pulse-large"></div>
            <div className="status-dot-large"></div>
          </motion.div>
          
          <h2 className="contact-title">GET IN TOUCH</h2>
          <p className="contact-subtitle">
            Open to Backend Developer Intern roles and software engineering opportunities
          </p>
        </div>
        
        <div className="contact-grid">
          <motion.a
            href="mailto:tejvarshu04@gmail.com"
            className="contact-card email"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
          >
            <div className="contact-icon">📧</div>
            <div className="contact-label">EMAIL</div>
            <div className="contact-value">tejvarshu04@gmail.com</div>
          </motion.a>
          
          <motion.a
            href="https://www.linkedin.com/in/tejashree-neelakantan/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card linkedin"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5 }}
          >
            <div className="contact-icon">💼</div>
            <div className="contact-label">LINKEDIN</div>
            <div className="contact-value">Connect</div>
          </motion.a>
          
          <motion.a
            href="https://github.com/tejashree-2004"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card github"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6 }}
          >
            <div className="contact-icon">💻</div>
            <div className="contact-label">GITHUB</div>
            <div className="contact-value">View Projects</div>
          </motion.a>
          
          <motion.div
            className="contact-card location"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.7 }}
          >
            <div className="contact-icon">📍</div>
            <div className="contact-label">LOCATION</div>
            <div className="contact-value">Chennai, Tamil Nadu, IN</div>
          </motion.div>
        </div>
        
        <motion.div
          className="contact-cta"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
        >
          <a href="mailto:tejvarshu04@gmail.com" className="btn-contact-primary">
            <span>SEND MESSAGE</span>
            <div className="btn-glow"></div>
          </a>
        </motion.div>
        
        <motion.div
          className="contact-footer"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1 }}
        >
          <p className="footer-text">
            Built with React + Framer Motion | Neural Network Graphics | 2026
          </p>
          <p className="footer-signature">
            TEJASHREE N © NEURAL COMMAND CENTER
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================
const AIPortfolio = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="app-container">
      {/* Neural Network Background */}
      <NeuralNetwork />
      
      {/* Scroll Progress Indicator */}
      <motion.div
        className="scroll-progress"
        style={{ scaleX: scrollYProgress }}
      />
      
      {/* Boot Sequence */}
      {!bootComplete && <BootSequence onComplete={() => setBootComplete(true)} />}
      
      {/* Main Content */}
      {bootComplete && (
        <motion.main
          className="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <HeroSection />
          <AIModules />
          <SoftwareEngineering />
          <SkillsArchitecture />
          <DeploymentLogs />
          <EngineeringPhilosophy />
          <ContactSection />
        </motion.main>
      )}
      
      {/* Embedded Styles - Production Ready */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap');
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        .app-container {
          min-height: 100vh;
          background: #050814;
          color: #e0e6ed;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          overflow-x: hidden;
        }
        
        /* ============ NEURAL NETWORK BACKGROUND ============ */
        .neural-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          background: radial-gradient(ellipse at center, #0a0f1e 0%, #050814 100%);
        }
        
        /* ============ SCROLL PROGRESS ============ */
        .scroll-progress {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #00ffff, #ff00ff);
          transform-origin: 0%;
          z-index: 1000;
          box-shadow: 0 0 10px rgba(0, 255, 255, 0.8);
        }
        
        /* ============ BOOT SEQUENCE ============ */
        .boot-sequence {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: #050814;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 999;
        }
        
        .terminal-window {
          width: 90%;
          max-width: 600px;
          background: rgba(10, 15, 30, 0.95);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 8px;
          box-shadow: 0 20px 60px rgba(0, 255, 255, 0.2);
        }
        
        .terminal-header {
          background: rgba(0, 255, 255, 0.1);
          padding: 12px 15px;
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 1px solid rgba(0, 255, 255, 0.2);
        }
        
        .terminal-buttons {
          display: flex;
          gap: 6px;
        }
        
        .terminal-buttons .btn {
          width: 12px;
          height: 12px;
          border-radius: 50%;
        }
        
        .btn.red { background: #ff5f57; }
        .btn.yellow { background: #ffbd2e; }
        .btn.green { background: #28ca42; }
        
        .terminal-title {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 1px;
        }
        
        .terminal-body {
          padding: 20px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 14px;
        }
        
        .terminal-line {
          margin: 8px 0;
          color: #00ffff;
          display: flex;
          gap: 10px;
        }
        
        .prompt {
          color: #00ff88;
          font-weight: bold;
        }
        
        .cursor-blink {
          color: #00ffff;
          margin-left: 10px;
        }
        
        /* ============ MAIN CONTENT ============ */
        .main-content {
          position: relative;
          z-index: 1;
        }
        
        section {
          padding: 100px 20px;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        /* ============ HERO SECTION ============ */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          position: relative;
        }
        
        .hero-content {
          max-width: 900px;
        }
        
        .status-indicator {
          position: relative;
          width: 60px;
          height: 60px;
          margin: 0 auto 30px;
        }
        
        .pulse-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border: 2px solid #00ffff;
          border-radius: 50%;
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        .pulse-ring.delay-1 {
          animation-delay: 1s;
        }
        
        @keyframes pulse-ring {
          0% {
            transform: translate(-50%, -50%) scale(0.8);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 0;
          }
        }
        
        .status-dot {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 20px;
          height: 20px;
          background: #00ffff;
          border-radius: 50%;
          box-shadow: 0 0 20px rgba(0, 255, 255, 0.8);
        }
        
        .hero-title {
          font-size: clamp(2rem, 5vw, 4rem);
          font-weight: 700;
          background: linear-gradient(135deg, #00ffff, #ff00ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: 2px;
          margin-bottom: 20px;
        }
        
        .hero-subtitle {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-bottom: 30px;
          font-size: 16px;
          flex-wrap: wrap;
        }
        
        .hero-subtitle .label {
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 2px;
          text-transform: uppercase;
          font-size: 12px;
        }
        
        .hero-subtitle .value {
          color: #00ffff;
          font-weight: 600;
          letter-spacing: 1px;
        }
        
        .hero-description {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 50px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        
        .hero-metrics {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
          gap: 30px;
          margin-bottom: 50px;
          padding: 30px;
          background: rgba(0, 255, 255, 0.05);
          border: 1px solid rgba(0, 255, 255, 0.2);
          border-radius: 12px;
        }
        
        .metric {
          text-align: center;
        }
        
        .metric-value {
          font-size: 32px;
          font-weight: 700;
          color: #00ffff;
          margin-bottom: 8px;
        }
        
        .metric-label {
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
        }
        
        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn-primary, .btn-secondary {
          position: relative;
          padding: 18px 40px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1px;
          text-decoration: none;
          border-radius: 8px;
          transition: all 0.3s ease;
          overflow: hidden;
          text-transform: uppercase;
          display: inline-block;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #00ffff, #00aaff);
          color: #000;
          border: none;
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 255, 255, 0.4);
        }
        
        .btn-secondary {
          background: transparent;
          color: #00ffff;
          border: 2px solid #00ffff;
        }
        
        .btn-secondary:hover {
          background: rgba(0, 255, 255, 0.1);
          transform: translateY(-2px);
        }
        
        .btn-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .btn-primary:hover .btn-glow {
          opacity: 1;
        }
        
        /* ============ SECTION HEADERS ============ */
        .section-header {
          margin-bottom: 60px;
        }
        
        .section-title {
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          color: #00ffff;
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 10px;
          flex-wrap: wrap;
        }
        
        .section-icon {
          font-size: 1.2em;
        }
        
        .section-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 1px;
          margin-left: 50px;
        }
        
        /* ============ AI MODULES ============ */
        .modules-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        
        .module-card {
          position: relative;
          background: rgba(10, 15, 30, 0.8);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 12px;
          padding: 30px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .module-card:hover {
          border-color: #00ffff;
          box-shadow: 0 10px 40px rgba(0, 255, 255, 0.2);
          transform: translateY(-5px);
        }
        
        .module-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .module-id {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
          font-family: monospace;
        }
        
        .module-status {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 1px;
          padding: 6px 12px;
          border-radius: 20px;
          background: rgba(0, 255, 0, 0.1);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 0, 0.3);
        }
        
        .status-pulse {
          width: 8px;
          height: 8px;
          background: #00ff88;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        
        .module-name {
          font-size: 24px;
          color: #fff;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .module-description {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }
        
        .module-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .tech-tag {
          font-size: 11px;
          padding: 6px 12px;
          background: rgba(0, 255, 255, 0.1);
          color: #00ffff;
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 255, 0.3);
        }
        
        .module-metrics {
          display: flex;
          gap: 20px;
          flex-wrap: wrap;
        }
        
        .metric-item {
          font-size: 13px;
        }
        
        .metric-key {
          color: rgba(255, 255, 255, 0.5);
          margin-right: 5px;
        }
        
        .metric-val {
          color: #00ff88;
          font-weight: 600;
        }
        
        .module-border {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, transparent, #00ffff, transparent);
        }
        
        /* ============ SOFTWARE ENGINEERING ============ */
        .systems-timeline {
          position: relative;
        }
        
        .system-card {
          display: flex;
          gap: 30px;
          margin-bottom: 50px;
          position: relative;
        }
        
        .system-marker {
          position: relative;
          flex-shrink: 0;
        }
        
        .marker-dot {
          width: 20px;
          height: 20px;
          background: #00ffff;
          border-radius: 50%;
          box-shadow: 0 0 15px rgba(0, 255, 255, 0.6);
          position: relative;
          z-index: 2;
        }
        
        .marker-line {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 100px;
          background: linear-gradient(to bottom, #00ffff, transparent);
        }
        
        .system-card:last-child .marker-line {
          display: none;
        }
        
        .system-content {
          flex: 1;
          background: rgba(10, 15, 30, 0.6);
          border: 1px solid rgba(0, 255, 255, 0.2);
          border-radius: 12px;
          padding: 25px;
          transition: all 0.3s ease;
        }
        
        .system-content:hover {
          border-color: #00ffff;
          box-shadow: 0 5px 20px rgba(0, 255, 255, 0.15);
        }
        
        .system-meta {
          display: flex;
          gap: 15px;
          margin-bottom: 15px;
          flex-wrap: wrap;
        }
        
        .system-type {
          font-size: 11px;
          padding: 4px 10px;
          background: rgba(255, 0, 255, 0.2);
          color: #ff00ff;
          border-radius: 4px;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .system-company {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.6);
          letter-spacing: 1px;
        }
        
        .system-name {
          font-size: 22px;
          color: #fff;
          margin-bottom: 12px;
          font-weight: 600;
        }
        
        .system-scope {
          font-size: 14px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 15px;
        }
        
        .system-achievement {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px;
          background: rgba(0, 255, 136, 0.1);
          border-left: 3px solid #00ff88;
          border-radius: 4px;
          margin-bottom: 15px;
          font-size: 13px;
          color: #00ff88;
        }
        
        .achievement-icon {
          font-size: 16px;
        }
        
        .system-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .tech-badge {
          font-size: 11px;
          padding: 5px 10px;
          background: rgba(0, 255, 255, 0.1);
          color: #00ffff;
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 255, 0.2);
        }
        
        /* ============ SKILLS ARCHITECTURE ============ */
        .skills-layers {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        
        .skill-layer {
          background: rgba(10, 15, 30, 0.6);
          border-radius: 12px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .layer-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 25px;
          padding-bottom: 15px;
          border-bottom: 2px solid;
        }
        
        .layer-indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          box-shadow: 0 0 10px currentColor;
        }
        
        .layer-name {
          font-size: 18px;
          font-weight: 600;
          letter-spacing: 2px;
          color: #fff;
        }
        
        .layer-skills {
          display: grid;
          gap: 20px;
        }
        
        .skill-item {
          background: rgba(0, 0, 0, 0.3);
          padding: 15px;
          border-radius: 8px;
        }
        
        .skill-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
        
        .skill-name {
          font-size: 14px;
          color: #fff;
          font-weight: 500;
        }
        
        .skill-level {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }
        
        .skill-bar-bg {
          height: 6px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
          overflow: hidden;
        }
        
        .skill-bar-fill {
          height: 100%;
          border-radius: 3px;
          box-shadow: 0 0 10px currentColor;
        }
        
        /* ============ PROJECTS ============ */
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 30px;
        }
        
        .project-card {
          position: relative;
          background: rgba(10, 15, 30, 0.8);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 12px;
          padding: 30px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .project-card:hover {
          border-color: #00ffff;
          box-shadow: 0 15px 50px rgba(0, 255, 255, 0.2);
          transform: translateY(-8px);
        }
        
        .project-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }
        
        .project-id {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          letter-spacing: 1px;
          font-family: monospace;
        }
        
        .project-status {
          font-size: 10px;
          padding: 5px 10px;
          border-radius: 20px;
          font-weight: 600;
          letter-spacing: 1px;
        }
        
        .project-status.deployed {
          background: rgba(0, 255, 0, 0.2);
          color: #00ff88;
          border: 1px solid rgba(0, 255, 0, 0.3);
        }
        
        .project-status.active {
          background: rgba(0, 255, 255, 0.2);
          color: #00ffff;
          border: 1px solid rgba(0, 255, 255, 0.3);
        }
        
        .project-name {
          font-size: 26px;
          color: #fff;
          margin-bottom: 8px;
          font-weight: 700;
        }
        
        .project-tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 15px;
        }
        
        .project-impact {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px;
          background: rgba(255, 0, 255, 0.1);
          border-left: 3px solid #ff00ff;
          border-radius: 4px;
          margin-bottom: 15px;
          font-size: 12px;
          color: #ff00ff;
          font-weight: 600;
        }
        
        .impact-icon {
          font-size: 14px;
        }
        
        .project-description {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }
        
        .project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .tech-chip {
          font-size: 11px;
          padding: 5px 10px;
          background: rgba(0, 255, 255, 0.1);
          color: #00ffff;
          border-radius: 4px;
          border: 1px solid rgba(0, 255, 255, 0.2);
        }
        
        .project-links {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }
        
        .project-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: #00ffff;
          text-decoration: none;
          padding: 8px 0;
          transition: all 0.2s;
        }
        
        .project-link:hover {
          color: #fff;
        }
        
        .link-arrow {
          transition: transform 0.2s;
        }
        
        .project-link:hover .link-arrow {
          transform: translateX(3px);
        }
        
        .project-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(0, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s;
          pointer-events: none;
        }
        
        .project-card:hover .project-glow {
          opacity: 1;
        }
        
        /* ============ ENGINEERING PHILOSOPHY ============ */
        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
          margin-bottom: 60px;
        }
        
        .principle-card {
          background: rgba(10, 15, 30, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 30px;
          text-align: center;
          transition: all 0.3s ease;
        }
        
        .principle-card:hover {
          border-color: #00ffff;
          box-shadow: 0 5px 20px rgba(0, 255, 255, 0.15);
          transform: translateY(-5px);
        }
        
        .principle-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }
        
        .principle-title {
          font-size: 18px;
          color: #00ffff;
          margin-bottom: 15px;
          font-weight: 600;
        }
        
        .principle-description {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }
        
        .philosophy-quote {
          background: rgba(0, 255, 255, 0.05);
          border-left: 4px solid #00ffff;
          border-radius: 8px;
          padding: 40px;
          position: relative;
        }
        
        .quote-mark {
          position: absolute;
          top: 20px;
          left: 30px;
          font-size: 60px;
          color: rgba(0, 255, 255, 0.2);
          line-height: 0;
        }
        
        .quote-text {
          font-size: 18px;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          font-style: italic;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }
        
        .quote-author {
          font-size: 14px;
          color: #00ffff;
          letter-spacing: 1px;
          text-align: right;
        }
        
        /* ============ CONTACT SECTION ============ */
        .contact-section {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .contact-container {
          width: 100%;
          max-width: 900px;
          text-align: center;
        }
        
        .contact-header {
          margin-bottom: 50px;
        }
        
        .contact-status {
          position: relative;
          width: 80px;
          height: 80px;
          margin: 0 auto 30px;
        }
        
        .status-pulse-large {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border: 2px solid #00ffff;
          border-radius: 50%;
          animation: pulse-ring 2s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite;
        }
        
        .status-dot-large {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: #00ffff;
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(0, 255, 255, 0.8);
        }
        
        .contact-title {
          font-size: clamp(2rem, 4vw, 3rem);
          color: #00ffff;
          margin-bottom: 15px;
          letter-spacing: 2px;
          font-weight: 700;
        }
        
        .contact-subtitle {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
          max-width: 600px;
          margin: 0 auto;
        }
        
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
          margin-bottom: 40px;
        }
        
        .contact-card {
          background: rgba(10, 15, 30, 0.8);
          border: 1px solid rgba(0, 255, 255, 0.3);
          border-radius: 12px;
          padding: 25px;
          text-decoration: none;
          transition: all 0.3s ease;
          display: block;
        }
        
        .contact-card:hover {
          border-color: #00ffff;
          box-shadow: 0 10px 30px rgba(0, 255, 255, 0.2);
          transform: translateY(-5px);
        }
        
        .contact-icon {
          font-size: 32px;
          margin-bottom: 15px;
        }
        
        .contact-label {
          font-size: 11px;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 8px;
        }
        
        .contact-value {
          font-size: 14px;
          color: #00ffff;
          font-weight: 500;
        }
        
        .contact-cta {
          margin-bottom: 60px;
        }
        
        .btn-contact-primary {
          position: relative;
          display: inline-block;
          padding: 20px 50px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: 2px;
          text-decoration: none;
          background: linear-gradient(135deg, #00ffff, #00aaff);
          color: #000;
          border-radius: 8px;
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .btn-contact-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 255, 255, 0.4);
        }
        
        .contact-footer {
          padding-top: 40px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .footer-text {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 10px;
        }
        
        .footer-signature {
          font-size: 14px;
          color: #00ffff;
          letter-spacing: 2px;
          font-weight: 600;
        }
        
        /* ============ RESPONSIVE ============ */
        @media (max-width: 768px) {
          section {
            padding: 60px 15px;
          }
          
          .hero-section {
            min-height: 90vh;
          }
          
          .modules-grid,
          .projects-grid {
            grid-template-columns: 1fr;
          }
          
          .system-card {
            flex-direction: column;
            gap: 15px;
          }
          
          .marker-line {
            display: none;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
          }
          
          .section-subtitle {
            margin-left: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default AIPortfolio;

