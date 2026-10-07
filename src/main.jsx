import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowUpRight, Github, Linkedin, Mail, Download, Code2, Server,
  Sparkles, ExternalLink, MapPin, X, CheckCircle2, BrainCircuit,
  Database, Award, Send, Menu, ChevronDown, ShieldCheck, Layers3,
  Radio, Cpu, Braces, Search
} from "lucide-react";
import "./styles.css";

const profile = {
  name: "Sidharth Gupta",
  role: "Full Stack Developer | MERN",
  email: "siddharthgupta4807n@gmail.com",
  github: "https://github.com/Sidharth4807/",
  linkedin: "https://www.linkedin.com/in/sidharthgupta4807/",
  resume: "/Sidharth_Gupta_Resume_Updated.pdf",
  location: "Kanpur, Uttar Pradesh, India"
};

const skills = {
  Frontend: ["React.js", "JavaScript", "HTML", "CSS", "TailwindCSS", "Angular.js"],
  Backend: ["Node.js", "Express.js", "REST APIs", "JWT Authentication", "Socket.io"],
  Database: ["MongoDB", "MySQL", "SQL"],
  "AI / Machine Learning": ["Python", "Pandas", "NumPy", "Scikit-learn", "TensorFlow/Keras", "Prophet", "LSTM"]
};

const engineeringFocus = [
  [Layers3, "Responsive UI", "Reusable React components and responsive interfaces built for real users and real screens."],
  [Braces, "RESTful APIs", "Structured backend services with Express.js, clean routes and frontend API integration."],
  [ShieldCheck, "Authentication", "JWT-based authentication, protected routes and role-aware application workflows."],
  [Database, "Database Design", "MongoDB and SQL experience across CRUD workflows, relationships and application data."],
  [Radio, "Real-Time Apps", "Socket.io-based real-time communication and event-driven application features."],
  [Cpu, "ML Integration", "Python workflows for forecasting, predictive analytics, experimentation and visualization."]
];

const projects = [
  {
    number: "01",
    title: "AI Recruitment System",
    category: "FULL STACK · AI",
    description:
      "An AI-powered full-stack recruitment platform covering job posting, resume uploads, candidate applications, recruiter workflows and AI-assisted resume evaluation.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Cloudinary", "Gemini AI", "REST API"],
    live: "https://ai-recruitment-system-1-u29e.onrender.com",
    github: "https://github.com/Sidharth4807/AI-Recruitment-System.git",
    type: "recruitment",
    featured: true,
    gallery: ["/projects/recruitment.png"],
    architecture: "React → Axios/REST API → Node.js + Express → MongoDB | Cloudinary | Gemini AI",
    features: [
      "Separate recruiter and candidate workflows",
      "JWT-based authentication and authorization",
      "Job posting, applications and application tracking",
      "Resume upload with pdf-parse and Cloudinary storage",
      "AI-assisted resume screening and interview-question workflows",
      "Recruiter-side candidate ranking and recruitment management"
    ]
  },
  {
    number: "02",
    title: "Wanderlust",
    category: "FULL STACK · MERN",
    description:
      "An Airbnb-style property listing platform with JWT authentication, listing CRUD, Cloudinary uploads, advanced search and filtering, reviews and ratings, and REST APIs.",
    stack: ["MongoDB", "Express.js", "React.js", "Node.js", "JWT", "Cloudinary", "Socket.io", "TailwindCSS"],
    live: "https://wanderlust-using-mern.onrender.com",
    github: "https://github.com/Sidharth4807/Wanderlust-USING-MERN",
    type: "wanderlust",
    gallery: ["/projects/wanderlust.png"],
    architecture: "React → REST API → Express/Node → MongoDB | Cloudinary | Socket.io",
    features: [
      "JWT authentication and protected routes",
      "Property listing CRUD workflows",
      "Cloudinary image upload pipeline",
      "Advanced search and filtering",
      "Reviews and ratings",
      "REST APIs and real-time Socket.io functionality"
    ]
  },
  {
    number: "03",
    title: "Real-Time IPL Match Outcome Predictor",
    category: "MACHINE LEARNING",
    description:
      "A machine-learning pipeline for IPL outcome and win-probability prediction using historical performance, dynamic match situations, head-to-head records and venue/scoring trends.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "ANN", "LSTM"],
    live: "#",
    github: "https://github.com/Sidharth4807/Real-Time-Prediction-on-IPL-Using-ML-",
    type: "ipl",
    gallery: ["/projects/ipl.png"],
    architecture: "Historical IPL data → EDA + feature engineering → ML models → outcome / win-probability analysis",
    features: [
      "Dynamic factors such as current run rate, required run rate, wickets and balls remaining",
      "Historical head-to-head and venue/scoring trends",
      "EDA and feature engineering on IPL data",
      "Logistic Regression, Random Forest and XGBoost experimentation",
      "ANN and LSTM experimentation for prediction"
    ]
  },
  {
    number: "04",
    title: "Air Quality Forecasting",
    category: "MACHINE LEARNING · INTERNSHIP",
    description:
      "An ML forecasting project using Python, Pandas, NumPy, Scikit-learn and Prophet for time-series preprocessing, forecasting, visualization and model evaluation.",
    stack: ["Python", "Pandas", "NumPy", "Scikit-learn", "Prophet", "Random Forest", "LSTM"],
    live: "#",
    github: "https://github.com/Sidharth4807/Air-Quality-Forecasting",
    type: "aqi",
    gallery: ["/projects/aqi.png"],
    architecture: "AQI data → preprocessing + feature engineering → forecasting / ML models → evaluation + visualization",
    features: [
      "AQI time-series preprocessing and feature engineering",
      "Prophet-based time-series forecasting",
      "Regression, Random Forest and LSTM model comparison",
      "Visualization of AQI and pollutant trends",
      "Model evaluation and forecasting analysis"
    ]
  }
];

const certifications = [
  ["Deloitte Australia — Technology Job Simulation", "Forage · September 2026"],
  ["IEEE Training Participant", "EBSCO Information Services · Remote"],
  ["Coordinator — Amichroma", "Amity University Gwalior"]
];

function SectionLabel({ eyebrow, title, subtitle }) {
  return (
    <div className="section-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
    </div>
  );
}

function ProjectPreview({ project }) {
  return (
    <div className="preview-ui real-project-preview">
      <img src={project.gallery[0]} alt={`${project.title} project screenshot`} loading="lazy" />
      <div className="preview-overlay"><span>PROJECT PREVIEW</span><ArrowUpRight size={16}/></div>
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    const move = (e) => {
      document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
      document.documentElement.style.setProperty("--my", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  const submitContact = (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = encodeURIComponent(`Portfolio enquiry from ${fd.get("name")}`);
    const body = encodeURIComponent(`Name: ${fd.get("name")}\nEmail: ${fd.get("email")}\n\n${fd.get("message")}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className="site">
      <div className="cursor-glow" />
      <div className="noise" />

      <nav className="nav">
        <a className="brand" href="#home">SG<span>.</span></a>
        <button className="mobile-menu" onClick={() => setMenuOpen(v => !v)} aria-label="Menu"><Menu size={20}/></button>
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#skills" onClick={() => setMenuOpen(false)}>Skills</a>
          <a href="#projects" onClick={() => setMenuOpen(false)}>Projects</a>
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a className="nav-cta" href="#contact">Let's talk <ArrowUpRight size={16}/></a>
      </nav>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid" />
          <motion.div className="hero-copy" initial="hidden" animate="show" variants={{show:{transition:{staggerChildren:.1}}}}>
            <motion.div variants={{hidden:{opacity:0,y:15},show:{opacity:1,y:0}}} className="status">
              <span className="status-dot"/> Open to Full Stack / MERN / Software Developer opportunities
            </motion.div>
            <motion.p variants={{hidden:{opacity:0,y:15},show:{opacity:1,y:0}}} className="hero-kicker">COMPUTER SCIENCE · AI & ML</motion.p>
            <motion.h1 variants={{hidden:{opacity:0,y:25},show:{opacity:1,y:0}}}>Sidharth<br/><span>Gupta.</span></motion.h1>
            <motion.p variants={{hidden:{opacity:0,y:15},show:{opacity:1,y:0}}} className="hero-role">{profile.role}</motion.p>
            <motion.p variants={{hidden:{opacity:0,y:15},show:{opacity:1,y:0}}} className="hero-description">
              Computer Science graduate specializing in Artificial Intelligence & Machine Learning,
              with hands-on experience building full-stack applications using the MERN stack and REST APIs.
            </motion.p>
            <motion.div variants={{hidden:{opacity:0,y:15},show:{opacity:1,y:0}}} className="hero-actions">
              <a className="button primary" href="#projects">Explore My Work <ArrowUpRight size={18}/></a>
              <a className="button secondary" href={profile.resume} target="_blank" rel="noreferrer">View Resume <Download size={17}/></a>
            </motion.div>
            <motion.div variants={{hidden:{opacity:0,y:15},show:{opacity:1,y:0}}} className="social-row">
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19}/></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19}/></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19}/></a>
            </motion.div>
          </motion.div>

          <motion.div className="hero-visual" initial={{opacity:0,scale:.92}} animate={{opacity:1,scale:1}} transition={{duration:.8}}>
            <div className="orb orb-one"/><div className="orb orb-two"/>
            <div className="code-card">
              <div className="code-top"><span/><span/><span/><small>developer.js</small></div>
              <pre><code><span className="purple">const</span> developer = {'{'}{"\n"}
  role: <span className="green">"Full Stack"</span>,{"\n"}
  stack: [<span className="green">"React"</span>, <span className="green">"Node"</span>,{"\n"}
          <span className="green">"MongoDB"</span>],{"\n"}
  ai_ml: <span className="orange">true</span>,{"\n"}
  available: <span className="orange">true</span>{"\n"}
{'}'};</code></pre>
              <div className="code-line"/><span className="terminal-cursor">_</span>
            </div>
          </motion.div>
          <a className="scroll-cue" href="#about"><span>SCROLL</span><ChevronDown size={16}/></a>
        </section>

        <section id="about" className="section content-section">
          <SectionLabel eyebrow="01 / ABOUT" title="Building with purpose."/>
          <div className="about-grid">
            <motion.div className="about-lead" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <p className="big-copy">I build <strong>full-stack web applications</strong> that combine clean interfaces, practical backend architecture and data-driven features.</p>
            </motion.div>
            <motion.div className="about-detail" initial={{opacity:0,y:25}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
              <p>My work spans MERN applications, real-time systems and machine-learning projects. I enjoy turning an idea into a complete product — from responsive frontend components and REST APIs to authentication, databases and predictive models.</p>
              <div className="mini-stats">
                <div><strong>2022–26</strong><span>B.Tech CSE</span></div>
                <div><strong>7.2</strong><span>CGPA</span></div>
                <div><strong>7</strong><span>Public GitHub Repos</span></div>
              </div>
              <a className="inline-link" href={profile.github} target="_blank" rel="noreferrer">Explore my GitHub <ArrowUpRight size={14}/></a>
            </motion.div>
          </div>
        </section>

        <section id="skills" className="section content-section">
          <SectionLabel eyebrow="02 / EXPERTISE" title="My toolkit."/>
          <div className="skill-layout">
            <div className="skill-intro"><div className="skill-icon"><Code2 size={26}/></div><h3>Frontend</h3><p>Responsive interfaces with React.js, JavaScript and TailwindCSS.</p></div>
            <div className="skill-intro"><div className="skill-icon"><Server size={26}/></div><h3>Full Stack</h3><p>Node.js, Express.js, REST APIs, JWT authentication and real-time Socket.io applications.</p></div>
            <div className="skill-intro"><div className="skill-icon"><BrainCircuit size={26}/></div><h3>AI & ML</h3><p>Python-based predictive analytics, time-series forecasting and machine-learning experimentation.</p></div>
          </div>
          <div className="skill-groups">
            {Object.entries(skills).map(([group, items]) => (
              <div className="skill-group" key={group}><span className="eyebrow">{group}</span><div className="skill-cloud">{items.map(x => <span key={x}>{x}</span>)}</div></div>
            ))}
          </div>
        </section>

        <section className="section content-section engineering-section">
          <SectionLabel eyebrow="03 / ENGINEERING FOCUS" title="How I build." subtitle="The engineering practices I bring into full-stack and ML projects."/>
          <div className="engineering-grid">
            {engineeringFocus.map(([Icon, title, text], i) => (
              <motion.div className="engineering-card" key={title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}}>
                <div className="engineering-icon"><Icon size={20}/></div><h3>{title}</h3><p>{text}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section id="projects" className="section content-section">
          <SectionLabel eyebrow="04 / FEATURED PROJECTS" title="Things I've built." subtitle="A focused selection of MERN, AI and machine-learning work."/>
          <div className="projects">
            {projects.map((project, index) => (
              <motion.article className={`project-card ${project.featured ? "featured" : ""}`} key={project.title}
                initial={{opacity:0,y:28}} whileInView={{opacity:1,y:0}} viewport={{once:true,margin:"-80px"}} transition={{duration:.55,delay:index*.04}}>
                <div className="project-meta"><span>{project.number}</span><span>{project.category}</span></div>
                <div className="project-preview"><ProjectPreview project={project}/></div>
                <div className="project-body">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="tags">{project.stack.map(s => <span key={s}>{s}</span>)}</div>
                  <div className="project-links">
                    {project.live !== "#" && <a href={project.live} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={14}/></a>}
                    <a href={project.github} target="_blank" rel="noreferrer">GitHub <Github size={14}/></a>
                    <button onClick={() => setSelected(project)}>Case Study <ArrowUpRight size={14}/></button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        <section id="experience" className="section content-section">
          <SectionLabel eyebrow="05 / EXPERIENCE" title="Where I've learned."/>
          <motion.div className="timeline-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <div className="timeline-date">MAY — JUL 2024<br/>JUL — AUG 2025</div>
            <div className="timeline-main">
              <span className="eyebrow">DATA SCIENCE INTERN · REMOTE</span><h3>Edorer</h3>
              <div className="experience-project"><b>Air Quality Forecasting</b><p>Built an AQI forecasting system using Prophet with preprocessing and feature engineering; compared Regression, Random Forest and LSTM models and created visualizations for AQI and pollutant trends.</p></div>
              <div className="experience-project"><b>IPL Match Prediction</b><p>Developed a match outcome and win-probability prediction system using Logistic Regression, Random Forest, XGBoost, ANN and LSTM models, with performance visualizations.</p></div>
              <div className="tags"><span>Python</span><span>Prophet</span><span>Scikit-learn</span><span>LSTM</span><span>Forecasting</span></div>
            </div>
          </motion.div>

          <motion.div className="education-card" initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}}>
            <div><span className="eyebrow">EDUCATION</span><h3>B.Tech — Computer Science & Engineering</h3><p>Amity University, Gwalior · Aug 2022 — Jun 2026 · AI & Machine Learning Specialization</p></div>
            <strong>7.2 <small>CGPA</small></strong>
          </motion.div>
        </section>

        <section className="section content-section certifications">
          <SectionLabel eyebrow="06 / CREDENTIALS" title="Beyond the code."/>
          <div className="credential-grid">
            {certifications.map(([title,sub], i) => <motion.div className="credential-card" key={title} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.08}}><Award size={20}/><div><b>{title}</b><span>{sub}</span></div><CheckCircle2 size={17}/></motion.div>)}
          </div>
          <div className="learning-strip"><Sparkles size={18}/><div><b>Currently exploring</b><span>Advanced React architecture · Backend development · AI-powered applications · System design</span></div></div>
        </section>

        <section className="section github-section">
          <div className="github-card">
            <div><span className="eyebrow">GITHUB / OPEN SOURCE</span><h3>Code is where the ideas become real.</h3><p>Explore my repositories, experiments and full-stack projects.</p></div>
            <div className="github-stats">
              <div><strong>7</strong><span>Public repos</span></div>
              <div><strong>4</strong><span>Featured projects</span></div>
              <div><strong>2</strong><span>Live MERN apps</span></div>
            </div>
            <a className="button primary" href={profile.github} target="_blank" rel="noreferrer">Open GitHub <Github size={17}/></a>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="contact-glow"/>
          <span className="eyebrow">07 / CONTACT</span>
          <h2>Let's build something<br/><em>worth shipping.</em></h2>
          <p>I'm open to frontend, MERN stack and software development opportunities.</p>
          <div className="contact-layout">
            <div className="contact-info">
              <a href={`mailto:${profile.email}`}><Mail size={17}/><span><small>Email</small>{profile.email}</span></a>
              <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17}/><span><small>GitHub</small>Sidharth4807</span></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17}/><span><small>LinkedIn</small>Connect with me</span></a>
              <div className="contact-location"><MapPin size={17}/><span><small>Location</small>{profile.location}</span></div>
            </div>
            <form className="contact-form" onSubmit={submitContact}>
              <div className="form-row"><input name="name" required placeholder="Your name"/><input name="email" type="email" required placeholder="Your email"/></div>
              <textarea name="message" required rows="5" placeholder="Tell me about the opportunity or project..."/>
              <button className="button primary" type="submit">Send Message <Send size={16}/></button>
            </form>
          </div>
        </section>
      </main>

      <footer><span>© 2026 Sidharth Gupta</span><span>Designed & built with React.</span><a href={profile.resume} target="_blank" rel="noreferrer">Resume ↗</a></footer>

      <AnimatePresence>
        {selected && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}>
          <motion.div className="modal" initial={{opacity:0,y:30,scale:.97}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20}} onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)} aria-label="Close case study"><X size={20}/></button>
            <span className="eyebrow">{selected.category}</span>
            <h3>{selected.title}</h3>
            <p>{selected.description}</p>
            <div className="modal-gallery">
              {selected.gallery.map((image, i) => <img key={image} src={image} alt={`${selected.title} screenshot ${i + 1}`} />)}
            </div>
            <div className="architecture"><span className="eyebrow">TECH / FLOW</span><p>{selected.architecture}</p></div>
            <h4>Key features</h4>
            <ul>{selected.features.map(f => <li key={f}><CheckCircle2 size={15}/>{f}</li>)}</ul>
            <div className="tags">{selected.stack.map(s => <span key={s}>{s}</span>)}</div>
            <div className="modal-actions">
              {selected.live !== "#" && <a className="button primary" href={selected.live} target="_blank" rel="noreferrer">Live Demo <ExternalLink size={15}/></a>}
              <a className="button secondary" href={selected.github} target="_blank" rel="noreferrer">GitHub <Github size={15}/></a>
            </div>
          </motion.div>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
