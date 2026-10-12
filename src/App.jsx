
import './App.css'

const skills = [
  'C++',
  'Data Structures & Algorithms',
  'JavaScript',
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Express.js',
  'MySQL',
  'Docker',
  'Git & GitHub',
]

const projects = [
  {
    number: '01',
    name: 'ReachInbox Email Scheduler',
    description:
      'A full-stack email scheduling platform with queued jobs, persistent scheduling, and a dashboard for managing emails.',
    stack: ['Next.js', 'TypeScript', 'Express', 'Redis', 'BullMQ'],
    type: 'Full-stack development',
  },
  {
    number: '02',
    name: 'Traffic Flow Predictor',
    description:
      'A machine learning project focused on predicting traffic flow and helping identify potential road congestion.',
    stack: ['Python', 'Machine Learning', 'Data Analysis'],
    type: 'Machine learning',
  },
  {
    number: '03',
    name: 'Lawyer Booking System',
    description:
      'A web application concept for booking lawyers, managing user accounts, and organizing appointment information.',
    stack: ['HTML', 'CSS', 'JavaScript', 'Java', 'MySQL'],
    type: 'Web development',
  },
]

function App() {
  return (
    <>
      <header className="navbar">
        <a className="logo" href="#home">
          NB<span>.</span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact" className="nav-contact">
            Contact ↗
          </a>
        </nav>
      </header>

      <main>
        <section className="hero section" id="home">
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot"></span>
              COMPUTER SCIENCE STUDENT
            </div>

            <p className="eyebrow">HELLO, I'M</p>

            <h1>
              Nikhil Babu
              <br />
              <span className="gradient-text">Y.</span>
            </h1>

            <p className="hero-description">
              I build things for the web, solve problems with code,
              and enjoy exploring new technologies.
            </p>

            <div className="hero-actions">
              <a className="button button-primary" href="#projects">
                Explore my work <span>↗</span>
              </a>
              <a className="button button-secondary" href="#contact">
                Get in touch
              </a>
            </div>

            <div className="hero-meta">
              <span>WEB DEVELOPMENT</span>
              <span className="meta-divider">/</span>
              <span>PROBLEM SOLVING</span>
              <span className="meta-divider">/</span>
              <span>CONTINUOUS LEARNING</span>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="orbit orbit-one"></div>
            <div className="orbit orbit-two"></div>
            <div className="hero-monogram">N<span>.</span></div>
            <div className="floating-card">
              <span className="floating-card-label">CURRENT FOCUS</span>
              <strong>Building & learning</strong>
              <span className="floating-card-bottom">
                <span className="status-dot"></span>
                Always exploring
              </span>
            </div>
            <div className="decor decor-one">{"{ }"}</div>
            <div className="decor decor-two">&lt;/&gt;</div>
          </div>

          <a href="#about" className="scroll-cue">
            <span className="scroll-line"></span>
            SCROLL TO EXPLORE
          </a>
        </section>

        <section className="section about-section" id="about">
          <div className="section-heading">
            <p className="eyebrow">A LITTLE ABOUT ME</p>
            <h2>
              Curious by nature.
              <br />
              <span className="muted-heading">Driven by code.</span>
            </h2>
          </div>

          <div className="about-content">
            <p>
              I'm a Computer Science student who enjoys turning ideas
              into working projects. I like understanding how things
              work, from writing algorithms to building full-stack
              applications.
            </p>
            <p>
              When I'm not coding, you'll probably find me exploring
              new technologies, reading, or enjoying a good movie or
              anime. I'm always looking for something new to learn
              and build.
            </p>

            <div className="about-facts">
              <div>
                <strong>01</strong>
                <span>Learn by building</span>
              </div>
              <div>
                <strong>02</strong>
                <span>Think through problems</span>
              </div>
              <div>
                <strong>03</strong>
                <span>Keep improving</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section skills-section" id="skills">
          <div className="section-heading">
            <p className="eyebrow">MY TOOLKIT</p>
            <h2>
              Technologies I <span className="gradient-text">use.</span>
            </h2>
            <p className="section-description">
              Tools and technologies I've worked with while learning
              and building projects.
            </p>
          </div>

          <div className="skills-grid">
            {skills.map((skill, index) => (
              <div
                className="skill-card"
                key={skill}
                style={{ '--i': index }}
              >
                <span className="skill-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span>{skill}</span>
                <span className="skill-arrow">↗</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section projects-section" id="projects">
          <div className="section-heading projects-heading">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>
                Things I've <span className="gradient-text">built.</span>
              </h2>
            </div>
            <span className="project-count">03 PROJECTS</span>
          </div>

          <div className="projects-list">
            {projects.map((project) => (
              <article className="project-card" key={project.number}>
                <div className="project-topline">
                  <span className="project-number">{project.number}</span>
                  <span className="project-type">{project.type}</span>
                </div>

                <div className="project-main">
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>

                  <div className="project-stack">
                    {project.stack.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                </div>

                <span className="project-arrow" aria-hidden="true">
                  ↗
                </span>
              </article>
            ))}
          </div>

          <p className="projects-note">
            More projects and experiments coming soon.
          </p>
        </section>

                <section className="section contact-section" id="contact">
          <p className="eyebrow">HAVE A PROJECT IN MIND?</p>

          <h2>
            Let's make something
            <br />
            <span className="gradient-text">meaningful.</span>
          </h2>

          <p className="contact-description">
            Interested in collaborating, discussing ideas, or just
            talking tech? Feel free to reach out.
          </p>

          <p className="contact-email">
            nikhilbabu200523@gmail.com
          </p>

          <a
            className="button button-primary contact-button"
            href="mailto:nikhilbabu200523@gmail.com"
          >
            Say hello <span>↗</span>
          </a>
        </section>
        
      </main>

      <footer className="footer">
        <a className="logo" href="#home">
          NB<span>.</span>
        </a>
        <p>Designed & built with React.</p>
        <a href="#home" className="back-to-top">
          BACK TO TOP ↑
        </a>
        <span className="copyright">© {new Date().getFullYear()} Nikhil Babu Y.</span>
      </footer>
    </>
  )
}

export default App
