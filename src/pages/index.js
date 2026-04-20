import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = ({ data, location }) => {
  const { aboutPage, allMarkdownRemark } = data
  const recentPosts = allMarkdownRemark.nodes
  const { title, subtitle } = aboutPage.frontmatter

  return (
    <Layout location={location}>
      <div className="page-header">
        <h1 className="page-title">{title}</h1>
        <p className="page-subtitle">{subtitle}</p>
      </div>

      <div
        className="about-intro"
        dangerouslySetInnerHTML={{ __html: aboutPage.html }}
      />

      {recentPosts.length > 0 && (
        <section style={{ marginTop: "2.5rem" }}>
          <h2
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.75rem",
              fontWeight: 700,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--color-text-muted)",
              borderBottom: "1px solid var(--color-border)",
              paddingBottom: "0.5rem",
              marginBottom: "1.25rem",
            }}
          >
            Recently Updated
          </h2>
          <ol className="post-list">
            {recentPosts.map(post => (
              <li key={post.fields.slug} className="post-list-item">
                <h3 style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: "1.1rem", margin: "0 0 0.3rem", lineHeight: 1.3 }}>
                  <Link to={`/${post.fields.collection}${post.fields.slug}`}>
                    {post.frontmatter.title}
                  </Link>
                </h3>
                <p className="post-meta">{post.frontmatter.date}</p>
                <p className="post-excerpt">
                  {post.frontmatter.description || post.excerpt}
                </p>
              </li>
            ))}
          </ol>
          <Link
            to="/blog"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "0.875rem",
              fontWeight: 600,
            }}
          >
            All posts →
          </Link>
        </section>
      )}
    </Layout>
  )
}

export const Head = () => <Seo title="About" />

export default AboutPage

export const pageQuery = graphql`
  {
    aboutPage: markdownRemark(
      fields: { collection: { eq: "pages" }, slug: { eq: "/about/" } }
    ) {
      html
      frontmatter {
        title
        subtitle
      }
    }
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
      filter: { fields: { collection: { ne: "pages" } } }
      limit: 3
    ) {
      nodes {
        excerpt
        fields {
          slug
          collection
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          description
        }
      }
    }
  }
`
