import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const SECTION_ORDER = [
  "Career Management",
  "Recruiting",
  "Recurring Meetings",
  "Team Tools",
  "Technical Leadership",
]

const PlaybookPage = ({ data, location }) => {
  const pages = data.allMarkdownRemark.nodes

  const sections = SECTION_ORDER.reduce((acc, section) => {
    const sectionPages = pages
      .filter(p => p.frontmatter.section === section)
      .sort((a, b) => (a.frontmatter.order || 0) - (b.frontmatter.order || 0))
    if (sectionPages.length > 0) acc[section] = sectionPages
    return acc
  }, {})

  return (
    <Layout location={location}>
      <div className="page-header">
        <h1 className="page-title">Engineering Playbook</h1>
        <p className="page-subtitle">
          Patterns and practices for building software teams that work.
        </p>
      </div>

      <p style={{ color: "var(--color-text-muted)", marginTop: 0, marginBottom: "2.5rem", fontSize: "0.95rem" }}>
        This playbook reflects how I think about engineering leadership — career
        development, team operations, technical practices, and recruiting. It's
        a living document, drawn from real experience and the work of people I
        respect.
      </p>

      {Object.entries(sections).map(([section, sectionPages]) => (
        <section key={section} className="playbook-section">
          <h2 className="playbook-section-title">{section}</h2>
          <ul className="playbook-list">
            {sectionPages.map(page => (
              <li key={page.fields.slug} className="playbook-list-item">
                <Link to={`/playbook${page.fields.slug}`} className="playbook-link">
                  <span className="playbook-link-title">{page.frontmatter.title}</span>
                  {page.frontmatter.description && (
                    <span className="playbook-link-desc">{page.frontmatter.description}</span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <div className="playbook-source">
        <a
          href="https://github.com/danlafeir/engineering_leadership_playbook"
          target="_blank"
          rel="noopener noreferrer"
        >
          View source on GitHub →
        </a>
      </div>
    </Layout>
  )
}

export const Head = () => (
  <Seo
    title="Engineering Playbook"
    description="Patterns and practices for building software teams that work."
  />
)

export default PlaybookPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { collection: { eq: "playbook" } } }
      sort: { frontmatter: { order: ASC } }
    ) {
      nodes {
        fields {
          slug
          collection
        }
        frontmatter {
          title
          description
          section
          order
        }
      }
    }
  }
`
