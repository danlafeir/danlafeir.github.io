import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const PlaybookPageTemplate = ({
  data: { previous, next, markdownRemark: page },
  location,
}) => {
  return (
    <Layout location={location}>
      <div className="playbook-breadcrumb">
        <Link to="/playbook">Playbook</Link>
        <span> / </span>
        <span>{page.frontmatter.section}</span>
      </div>

      <article>
        <header className="blog-post-header">
          <h1 itemProp="headline">{page.frontmatter.title}</h1>
          {page.frontmatter.description && (
            <p style={{ color: "var(--color-text-muted)", marginTop: "0.5rem", fontSize: "1rem" }}>
              {page.frontmatter.description}
            </p>
          )}
        </header>
        <hr />
        <section
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: page.html }}
          itemProp="articleBody"
        />
      </article>

      <nav className="blog-post-nav">
        <ul>
          <li>
            {previous && (
              <Link to={`/playbook${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/playbook${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: "2rem" }}>
        <Link
          to="/playbook"
          style={{ fontFamily: "var(--font-sans)", fontSize: "0.875rem", fontWeight: 600 }}
        >
          ← Playbook
        </Link>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: page } }) => (
  <Seo
    title={page.frontmatter.title}
    description={page.frontmatter.description || page.excerpt}
  />
)

export default PlaybookPageTemplate

export const pageQuery = graphql`
  query PlaybookPageBySlug(
    $id: String!
    $previousPageId: String
    $nextPageId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        description
        section
      }
    }
    previous: markdownRemark(id: { eq: $previousPageId }) {
      fields { slug }
      frontmatter { title }
    }
    next: markdownRemark(id: { eq: $nextPageId }) {
      fields { slug }
      frontmatter { title }
    }
  }
`
