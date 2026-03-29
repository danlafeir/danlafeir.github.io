import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const AboutPage = ({ data, location }) => {
  const recentPosts = data.allMarkdownRemark.nodes

  return (
    <Layout location={location}>
      <div className="page-header">
        <h1 className="page-title">Hi, I'm Dan Lafeir</h1>
        <p className="page-subtitle">Software builder</p>
      </div>

      <div className="about-intro">
        <p>
          I'm a{" "}
          <a href="https://tidyfirst.substack.com/p/paint-drip-people" target="_blank" rel="noopener noreferrer">paint drip engineer</a>
          {" "}who swings on the{" "}
          <a href="https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/" target="_blank" rel="noopener noreferrer">engineer/manager pendulum</a>
          {" "}— building deep expertise across multiple domains rather than settling into a single lane.
        </p>
        <p>
          I approach problems through a systems thinking lens: understanding how the parts interact before prescribing solutions, and architecting for scale by addressing root causes rather than symptoms. The goal is software that teams can actually reason about and evolve — not just software that ships.
        </p>
        <p>
          When I'm not writing code, I write about the things I observe in software
          teams — the habits, patterns, and tradeoffs that quietly shape how people
          work.
        </p>
        <p>
          Feel free to explore my{" "}
          <Link to="/blog">writing</Link>,{" "}
          <Link to="/playbook">engineering playbook</Link>,{" "}
          <Link to="/projects">projects</Link>, or{" "}
          <Link to="/resume">resume</Link>. You can also find me on{" "}
          <a
            href="https://github.com/danlafeir"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>{" "}
          and{" "}
          <a
            href="https://linkedin.com/in/danlafeir"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          .
        </p>
      </div>

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
    allMarkdownRemark(
      sort: { frontmatter: { date: DESC } }
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
