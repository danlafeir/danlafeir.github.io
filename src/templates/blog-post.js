import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({
  data: { previous, next, markdownRemark: post },
  location,
}) => {
  return (
    <Layout location={location}>
      <article itemScope itemType="http://schema.org/Article">
        <header className="blog-post-header">
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p className="blog-post-date">{post.frontmatter.date}</p>
        </header>
        <hr />
        <section
          className="blog-post-body"
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
      </article>

      <nav className="blog-post-nav">
        <ul>
          <li>
            {previous && (
              <Link to={`/blog${previous.fields.slug}`} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={`/blog${next.fields.slug}`} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>

      <div style={{ marginTop: "2rem" }}>
        <Link
          to="/blog"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "0.875rem",
            fontWeight: 600,
          }}
        >
          ← All posts
        </Link>
      </div>
    </Layout>
  )
}

export const Head = ({ data: { markdownRemark: post } }) => (
  <Seo
    title={post.frontmatter.title}
    description={post.frontmatter.description || post.excerpt}
  />
)

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
