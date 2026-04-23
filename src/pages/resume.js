import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const DownloadIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
)

const ResumeSection = ({ title, children, id }) => (
  <section className="resume-section" id={id}>
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

const ResumePage = ({ data, location }) => {
  const {
    title,
    pronouns,
    location: city,
    intro,
    currentStatus,
    summary,
    experience,
    technicalProficiencyText,
    skills,
    education,
  } = data.markdownRemark.frontmatter

  return (
    <Layout location={location}>
      <div className="page-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "0.75rem" }}>
          <h1 className="page-title">
            {title}{" "}
            <span style={{ fontWeight: 400, fontSize: "1.1rem", color: "var(--color-text-muted)" }}>
              ({pronouns})
            </span>
          </h1>
          <button
            className="resume-download-link no-print"
            onClick={() => window.print()}
          >
            <DownloadIcon />
            Download PDF
          </button>
        </div>
        <p className="page-subtitle">
          {city}
          {" · "}
          <a href="https://linkedin.com/in/danlafeir" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {" · "}
          <a href="https://github.com/danlafeir" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>

      <div className="about-intro" style={{ marginBottom: "2.5rem" }}>
        <p>{intro}</p>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: 0 }}>
          {currentStatus}
        </p>
      </div>

      <ResumeSection title="Summary">
        <ul className="resume-entry-body" style={{ paddingLeft: "1.25rem", margin: 0 }}>
          {summary.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </ResumeSection>

      <ResumeSection title="Experience" id="experience">
        {experience.map((entry, i) => (
          <Entry key={i} title={entry.title} subtitle={entry.company} date={entry.date}>
            {entry.intro && <p>{entry.intro}</p>}
            {entry.bullets?.length > 0 && (
              <ul>
                {entry.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
            )}
          </Entry>
        ))}
      </ResumeSection>

      <ResumeSection title="Technical Proficiency">
        <p className="resume-entry-body">{technicalProficiencyText}</p>
        <ul className="skills-list" style={{ marginTop: "1rem" }}>
          {skills.map(skill => (
            <li key={skill} className="skill-tag">{skill}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Education">
        {education.map((entry, i) => (
          <Entry key={i} title={entry.title} subtitle={entry.subtitle} date={entry.date} />
        ))}
      </ResumeSection>
    </Layout>
  )
}

export const Head = () => <Seo title="Resume" />

export default ResumePage

export const pageQuery = graphql`
  {
    markdownRemark(
      fields: { collection: { eq: "pages" }, slug: { eq: "/resume/" } }
    ) {
      frontmatter {
        title
        pronouns
        location
        intro
        currentStatus
        summary
        experience {
          title
          company
          date
          intro
          bullets
        }
        technicalProficiencyText
        skills
        education {
          title
          subtitle
          date
        }
      }
    }
  }
`
