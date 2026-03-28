import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ResumeSection = ({ title, children }) => (
  <section className="resume-section">
    <h2 className="resume-section-title">{title}</h2>
    {children}
  </section>
)

const Entry = ({ title, subtitle, date, children }) => (
  <div className="resume-entry">
    <div className="resume-entry-header">
      <h3 className="resume-entry-title">{title}</h3>
      {date && <span className="resume-entry-date">{date}</span>}
    </div>
    {subtitle && <p className="resume-entry-subtitle">{subtitle}</p>}
    {children && <div className="resume-entry-body">{children}</div>}
  </div>
)

const ResumePage = ({ location }) => {
  return (
    <Layout location={location}>
      <div className="page-header">
        <h1 className="page-title">Resume</h1>
        <p className="page-subtitle">
          <a href="mailto:dan@lafeir.com">dan@lafeir.com</a>
          {" · "}
          <a
            href="https://linkedin.com/in/danlafeir"
            target="_blank"
            rel="noopener noreferrer"
          >
            linkedin.com/in/danlafeir
          </a>
          {" · "}
          <a
            href="https://github.com/danlafeir"
            target="_blank"
            rel="noopener noreferrer"
          >
            github.com/danlafeir
          </a>
        </p>
      </div>

      {/* Uncomment and link to your PDF resume when available */}
      {/* <a href="/resume.pdf" className="resume-download-link" target="_blank" rel="noopener noreferrer">
        Download PDF ↓
      </a> */}

      <ResumeSection title="Experience">
        <Entry
          title="Software Engineer"
          subtitle="Your Company · Location"
          date="Year – Present"
        >
          <ul>
            <li>Add your experience here.</li>
          </ul>
        </Entry>
      </ResumeSection>

      <ResumeSection title="Education">
        <Entry
          title="Your Degree"
          subtitle="Your University"
          date="Year"
        />
      </ResumeSection>

      <ResumeSection title="Skills">
        <ul className="skills-list">
          {[
            "Kubernetes",
            "AWS",
            "Go",
            "Java",
            "Python",
            "React",
            "Gatsby",
            "Terraform",
            "Docker",
            "CI/CD",
          ].map(skill => (
            <li key={skill} className="skill-tag">
              {skill}
            </li>
          ))}
        </ul>
      </ResumeSection>
    </Layout>
  )
}

export const Head = () => <Seo title="Resume" />

export default ResumePage
