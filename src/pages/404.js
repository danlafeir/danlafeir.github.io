import * as React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import Seo from "../components/seo"

const NotFoundPage = ({ location }) => {
  return (
    <Layout location={location}>
      <div className="not-found">
        <h1>404</h1>
        <p>Page not found.</p>
        <Link to="/">Go home →</Link>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
