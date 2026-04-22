import * as React from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"

// The hash fragment is never sent to the server — all decoding happens client-side.

const CopyButton = ({ text, label = "Copy" }) => {
  const [copied, setCopied] = React.useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button onClick={handleCopy} style={styles.copyBtn}>
      {copied ? "Copied!" : label}
    </button>
  )
}

const CodeBlock = ({ children }) => (
  <div style={styles.codeWrap}>
    <code style={styles.code}>{children}</code>
    <CopyButton text={children} />
  </div>
)

// ── States ────────────────────────────────────────────────────────────────────

const Landing = () => (
  <div>
    <p style={styles.lead}>
      <strong>tin-can</strong> is a peer-to-peer CLI tool for encrypted text
      chat and voice calls. No accounts, no servers — just two peers.
    </p>
    <p>
      The easiest way to connect is with a shared secret:
    </p>
    <CodeBlock>{`# Peer A
tin-can attach-string "your shared secret"

# Peer B
tin-can tap "your shared secret"`}</CodeBlock>
    <p style={styles.muted}>
      Or use <code style={styles.inlineCode}>--static-link</code> to exchange
      URLs instead of a shared secret.
    </p>
    <p>
      <a href="https://github.com/danlafeir/tin-can" style={styles.link}>
        View on GitHub →
      </a>
    </p>
  </div>
)

const OfferPage = ({ offerUrl }) => {
  const joinCmd = `tin-can tap --static-link "${offerUrl}"`

  return (
    <div>
      <h2 style={styles.subhead}>Your peer wants to connect</h2>
      <p>Run this command to join them:</p>
      <CodeBlock>{joinCmd}</CodeBlock>
      <p style={styles.muted}>
        That command will print an answer URL — send it back to your peer
        and you&apos;ll be connected.
      </p>
      <hr style={styles.hr} />
      <p style={styles.muted}>
        Don&apos;t have tin-can yet?{" "}
        <a href="https://github.com/danlafeir/tin-can" style={styles.link}>
          Get it on GitHub
        </a>
      </p>
    </div>
  )
}

const AnswerPage = ({ answerUrl, answerB64 }) => (
  <div>
    <h2 style={styles.subhead}>Send this back to your peer</h2>
    <p>Give your peer this URL:</p>
    <CodeBlock>{answerUrl}</CodeBlock>
    <details style={styles.details}>
      <summary style={styles.summary}>Raw base64 (paste directly into the prompt)</summary>
      <div style={styles.codeWrap}>
        <code style={{ ...styles.code, wordBreak: "break-all" }}>{answerB64}</code>
        <CopyButton text={answerB64} />
      </div>
    </details>
    <p style={styles.muted}>
      Once your peer pastes this, you&apos;re connected.
    </p>
  </div>
)

// ── Page ──────────────────────────────────────────────────────────────────────

const CanPage = ({ location }) => {
  const [state, setState] = React.useState("loading")
  const [payload, setPayload] = React.useState(null)

  React.useEffect(() => {
    if (typeof window === "undefined") return

    const hash = window.location.hash.slice(1)

    if (hash.startsWith("o=")) {
      setState("offer")
      setPayload({ offerUrl: window.location.href, b64: hash.slice(2) })
    } else if (hash.startsWith("a=")) {
      setState("answer")
      setPayload({ answerUrl: window.location.href, b64: hash.slice(2) })
    } else {
      setState("landing")
    }
  }, [])

  const renderContent = () => {
    if (state === "loading") return null
    if (state === "offer") return <OfferPage offerUrl={payload.offerUrl} />
    if (state === "answer") return <AnswerPage answerUrl={payload.answerUrl} answerB64={payload.b64} />
    return <Landing />
  }

  return (
    <Layout location={location}>
      <div className="page-header">
        <h1 className="page-title">tin-can</h1>
        <p className="page-subtitle">P2P terminal communication</p>
      </div>
      {renderContent()}
    </Layout>
  )
}

export const Head = () => <Seo title="tin-can" />

export default CanPage

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = {
  lead: {
    fontSize: "1.1rem",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },
  subhead: {
    marginTop: 0,
    marginBottom: "0.75rem",
  },
  codeWrap: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.5rem",
    background: "var(--color-code-bg, #f4f4f4)",
    borderRadius: "4px",
    padding: "0.75rem 1rem",
    marginBottom: "1rem",
    flexWrap: "wrap",
  },
  code: {
    fontFamily: "monospace",
    fontSize: "0.9rem",
    flex: 1,
    whiteSpace: "pre-wrap",
    wordBreak: "break-word",
  },
  inlineCode: {
    fontFamily: "monospace",
    background: "var(--color-code-bg, #f4f4f4)",
    padding: "0.1em 0.3em",
    borderRadius: "3px",
    fontSize: "0.9em",
  },
  copyBtn: {
    padding: "0.3rem 0.75rem",
    fontSize: "0.8rem",
    cursor: "pointer",
    border: "1px solid currentColor",
    borderRadius: "4px",
    background: "transparent",
    flexShrink: 0,
    fontFamily: "inherit",
  },
  muted: {
    opacity: 0.7,
    fontSize: "0.9rem",
  },
  hr: {
    margin: "1.5rem 0",
    border: "none",
    borderTop: "1px solid var(--color-border, #e0e0e0)",
  },
  link: {
    color: "inherit",
  },
  details: {
    marginBottom: "1rem",
  },
  summary: {
    cursor: "pointer",
    opacity: 0.7,
    fontSize: "0.9rem",
    marginBottom: "0.5rem",
  },
}
