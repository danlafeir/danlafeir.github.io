import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

const ExternalLinkIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="currentColor"
    style={{ flexShrink: 0, opacity: 0.6 }}
  >
    <path d="M3.75 2h3.5a.75.75 0 0 1 0 1.5h-3.5a.25.25 0 0 0-.25.25v8.5c0 .138.112.25.25.25h8.5a.25.25 0 0 0 .25-.25v-3.5a.75.75 0 0 1 1.5 0v3.5A1.75 1.75 0 0 1 12.25 14h-8.5A1.75 1.75 0 0 1 2 12.25v-8.5C2 2.784 2.784 2 3.75 2Zm6.854-1h4.146a.25.25 0 0 1 .25.25v4.146a.25.25 0 0 1-.427.177L13.03 4.03 9.28 7.78a.751.751 0 0 1-1.042-.018.751.751 0 0 1-.018-1.042l3.75-3.75-1.543-1.543A.25.25 0 0 1 10.604 1Z" />
  </svg>
)

const projects = [
  {
    name: "em",
    description:
      "CLI tool for engineering managers to generate JIRA agile metrics reports — cycle time analysis, throughput tracking, and Monte Carlo forecasting.",
    url: "https://github.com/danlafeir/em",
    topics: ["go", "cli", "jira", "agile-metrics"],
  },
  {
    name: "timecard",
    description:
      "CLI tool that automates weekly timecard submission via the Tempo API, with macOS keychain integration for secure credential storage.",
    url: "https://github.com/danlafeir/timecard",
    topics: ["go", "cli", "tempo-api", "jira"],
  },
  {
    name: "dev",
    description:
      "Pluggable local development toolkit that codifies routine logic execution while experimenting with AI agentic code capabilities.",
    url: "https://github.com/danlafeir/dev",
    topics: ["go", "cli", "developer-tools"],
  },
  {
    name: "cli-go",
    description:
      "Shared Go library for building CLI tools — plugin discovery, YAML config, OS-native secrets (macOS Keychain / Linux Secret Service), and GitHub release self-updating.",
    url: "https://github.com/danlafeir/cli-go",
    topics: ["go", "library", "cli", "plugin-architecture"],
  },
  {
    name: "danlafeir.github.io",
    description:
      "This site — a personal website built with Gatsby and deployed to GitHub Pages.",
    url: "https://github.com/danlafeir/danlafeir.github.io",
    topics: ["gatsby", "react", "github-pages"],
  },
]

const ProjectsPage = ({ location }) => {
  return (
    <Layout location={location}>
      <div className="page-header">
        <h1 className="page-title">Projects</h1>
        <p className="page-subtitle">Things I've built or contributed to.</p>
      </div>

      <div className="projects-grid">
        {projects.map(project => (
          <a
            key={project.name}
            href={project.url}
            className="project-card"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="project-card-header">
              <p className="project-name">{project.name}</p>
              <ExternalLinkIcon />
            </div>
            <p className="project-desc">{project.description}</p>
            {project.topics?.length > 0 && (
              <div className="project-topics">
                {project.topics.map(t => (
                  <span key={t} className="project-topic">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </a>
        ))}
      </div>

      <a
        href="https://github.com/danlafeir"
        className="github-profile-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        View all repositories on GitHub →
      </a>
    </Layout>
  )
}

export const Head = () => <Seo title="Projects" />

export default ProjectsPage
