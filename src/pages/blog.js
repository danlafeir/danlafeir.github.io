import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPage = ({ data, location }) => {
  const posts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <div className="page-header">
        <h1 className="page-title">Writing</h1>
        <p className="page-subtitle">Observations on software, teams, and craft.</p>
      </div>

      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ol className="post-list">
          {posts.map(post => {
            const title = post.frontmatter.title || post.fields.slug
            return (
              <li key={post.fields.slug} className="post-list-item">
                <h2>
                  <Link to={`/blog${post.fields.slug}`}>{title}</Link>
                </h2>
                <p className="post-meta">{post.frontmatter.date}</p>
                <p className="post-excerpt">
                  {post.frontmatter.description || post.excerpt}
                </p>
              </li>
            )
          })}
        </ol>
      )}
    </Layout>
  )
}

export const Head = () => <Seo title="Blog" />

export default BlogPage

export const pageQuery = graphql`
  {
    allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
      nodes {
        excerpt
        fields {
          slug
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
