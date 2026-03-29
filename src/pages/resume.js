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
        <h1 className="page-title">Daniel Lafeir <span style={{ fontWeight: 400, fontSize: "1.1rem", color: "var(--color-text-muted)" }}>(he/him)</span></h1>
        <p className="page-subtitle">
          Chicago, IL · <a href="mailto:danlafeir@gmail.com">danlafeir@gmail.com</a>
          {" · "}
          <a href="https://linkedin.com/in/danlafeir" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          {" · "}
          <a href="https://github.com/danlafeir" target="_blank" rel="noopener noreferrer">GitHub</a>
        </p>
      </div>

      <div className="about-intro" style={{ marginBottom: "2.5rem" }}>
        <p>
          I am an engineering leader who lives in the{" "}
          <a href="https://charity.wtf/2017/05/11/the-engineer-manager-pendulum/" target="_blank" rel="noopener noreferrer">
            Engineer/Manager Pendulum
          </a>
          . I bring a range of experience from hands-on development and team management roles across diverse technical domains and organizational structures. My technical leadership style is centered around systems thinking, lean value-aligned software delivery, and partnership with business stakeholders. I have led through organizational change, harvested my learning over the years into reusable tools, and prioritize working software over "working" slideware.
        </p>
        <p style={{ color: "var(--color-text-muted)", fontSize: "0.9rem", margin: 0 }}>
          Currently looking to swing back into an IC role, ideally in a more complicated, technical domain.
        </p>
      </div>

      <ResumeSection title="Summary">
        <ul className="resume-entry-body" style={{ paddingLeft: "1.25rem", margin: 0 }}>
          <li>12 years building software professionally</li>
          <li>8 years leading teams — currently managing 22 people, 2 years managing managers</li>
          <li>
            Technical domains: ReactNative (1.5 yrs), Search (2 yrs), Web GUIs (5 yrs),
            Infrastructure Platforms (5 yrs), SpringBoot Microservices (6 yrs), Data Engineering (3 yrs)
          </li>
        </ul>
      </ResumeSection>

      <ResumeSection title="Experience">
        <Entry
          title="Senior Engineering Manager"
          subtitle="Grainger · Chicago, IL"
          date="Sept 2024 – Present"
        >
          <p>Leading three teams and one manager building systems in the Order domain — search of order data, asynchronous order workflows, payment capabilities, and analytical data products.</p>
          <ul>
            <li>Hired 2 people, worked on 2 promotions, and managed 1 person out as part of continuous improvement toward a leaner, higher-functioning team.</li>
            <li>Built and executed a release strategy with Product to deliver net-new Order software starting with ~6 orders/day for select customers to create a faster feedback loop and surface unknown unknowns.</li>
            <li>Facilitated bi-weekly prioritization meetings with partner SAP teams to balance modernized Order software delivery against a multi-year, massive SAP upgrade.</li>
            <li>Delivered 4 Order Data Products for multiple analytical use cases, including research on frequency of orders with damaged products and inconsistent application of customer order settings across systems.</li>
            <li>Drove cross-team kickoffs and working sessions with EMs and Product managers to break down work using domain-driven design and minimize friction in the team topology.</li>
          </ul>
        </Entry>

        <Entry
          title="Senior Staff Engineer"
          subtitle="Grainger · Chicago, IL"
          date="Aug 2023 – Sept 2024"
        >
          <p>Senior IC role rotating across teams to solve specific, time-bound problems identified with the senior director of engineering.</p>
          <ul>
            <li>Led strategic initiative to resolve critical legacy database performance issues by implementing a data retention policy that removed 500M+ records and stopped weekly production incidents.</li>
            <li>Mentored and coached a senior iOS engineer into a technical lead role on a mobile team.</li>
            <li>Reduced product delivery timeline for an inventory allocation HTTP API from 4 months to 1 month by partnering with Product and EM to apply lean engineering principles.</li>
            <li>Developed a CLI tool for capturing capitalizable engineering time, improving financial reporting accuracy and reducing weekly timecard effort for ~50 engineers.</li>
            <li>Evaluated on-call tooling and partnered with Datadog Product Management to support a director of engineering in purchasing Datadog On-Call and building a framework to scale incident management.</li>
          </ul>
        </Entry>

        <Entry
          title="Lead Consultant · Technical Account Principal"
          subtitle="Thoughtworks"
          date="May 2019 – Aug 2023"
        >
          <p>Rotated between technical lead, technical account manager, director of engineering, and senior IC roles depending on client and project need.</p>
          <ul>
            <li>Built a Solr-based search platform enabling multiple legal domains to make their content searchable; used DCG with a curated corpus to assert non-negative performance impact per commit.</li>
            <li>Partnered with VP of Engineering and Directors to scale <a href="/playbook/technical-leadership/sensible-defaults">engineering sensible defaults</a> and deliver 2 board-visible projects to make customer data more usable for sellers.</li>
            <li>Standardized the performance review process for ~55 engineers to solve feedback loop problems for consultants distributed across a large client on many different teams.</li>
            <li>Implemented a platform engineering strategy — CLI tool, API-first tooling, Kubernetes, and starter-kits — that reduced a greenfield project's time-to-production from ~4 weeks to ~2–3 days.</li>
          </ul>
        </Entry>

        <Entry
          title="Senior Consultant · Technical Lead"
          subtitle="Thoughtworks"
          date="June 2017 – May 2019"
        >
          <p>Rotated between technical lead, engineering manager, and senior IC roles.</p>
          <ul>
            <li>Led a development team of 7 engineers to deliver Manheim Express in 6 months, generating ~$500,000 in revenue and unlocking a new channel for the client's customers.</li>
            <li>Presented architectural recommendations to C-level banking executives to decompose a legacy monolithic deployment tool and remove a major source of delivery friction.</li>
            <li>Built a library enabling feature toggling in the browser via HttpOnly cookies to support delivery of a modernized React e-commerce experience.</li>
          </ul>
        </Entry>

        <Entry
          title="Consultant"
          subtitle="Thoughtworks"
          date="June 2015 – June 2017"
        >
          <p>IC across multiple projects, primarily GUI applications.</p>
          <ul>
            <li>Contributed to an open source library for rendering images in React Native.</li>
            <li>Led a JavaScript Frontend forum that evolved into an organization-wide technical community.</li>
            <li>Presented an innovative ReactJS testing strategy centered on testing components as the unit under test.</li>
          </ul>
        </Entry>

        <Entry
          title="Developer Consultant"
          subtitle="Technology Services Group"
          date="Sept 2014 – June 2015"
        >
          <p>IC across 2 client engagements, primarily GUI applications. Built a Vanilla JS interactive experience for the New York Philharmonic's Lincoln Portrait archive.</p>
        </Entry>
      </ResumeSection>

      <ResumeSection title="Technical Proficiency">
        <p className="resume-entry-body">
          Confident writing JavaScript (TypeScript preferred), Go, Python, and Kotlin/Java with popular associated frameworks. Proficient with AI tools and prompt engineering. Experienced standing up Kubernetes clusters, CI/CD pipelines, and AWS infrastructure using Terraform and other IaC tools.
        </p>
        <ul className="skills-list" style={{ marginTop: "1rem" }}>
          {[
            "TypeScript / JavaScript",
            "Go",
            "Python",
            "Kotlin / Java",
            "React",
            "Kubernetes",
            "AWS",
            "Terraform",
            "CI/CD",
            "Solr / Search",
            "Spring Boot",
            "React Native",
          ].map(skill => (
            <li key={skill} className="skill-tag">{skill}</li>
          ))}
        </ul>
      </ResumeSection>

      <ResumeSection title="Education">
        <Entry
          title="University of California, Los Angeles — School of Law"
          subtitle="Masters of Legal Studies · Focus in Law and Technology"
          date="Sept 2021 – May 2023"
        />
        <Entry
          title="University of Michigan — College of Literature, Science, and the Arts"
          subtitle="Bachelor of Science in Computer Science, Financial Mathematics, and Economics"
          date="Sept 2009 – May 2014"
        />
      </ResumeSection>
    </Layout>
  )
}

export const Head = () => <Seo title="Resume" />

export default ResumePage
