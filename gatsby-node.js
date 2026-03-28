const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

const blogPost = path.resolve(`./src/templates/blog-post.js`)
const playbookPage = path.resolve(`./src/templates/playbook-page.js`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: ASC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
            collection
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild(`Error loading markdown pages`, result.errors)
    return
  }

  const allNodes = result.data.allMarkdownRemark.nodes
  const blogPosts = allNodes.filter(n => n.fields.collection === `blog`)
  const playbookPages = allNodes.filter(n => n.fields.collection === `playbook`)

  blogPosts.forEach((post, index) => {
    const previousPostId = index === 0 ? null : blogPosts[index - 1].id
    const nextPostId = index === blogPosts.length - 1 ? null : blogPosts[index + 1].id

    createPage({
      path: `/blog${post.fields.slug}`,
      component: blogPost,
      context: { id: post.id, previousPostId, nextPostId },
    })
  })

  playbookPages.forEach((page, index) => {
    const previousPageId = index === 0 ? null : playbookPages[index - 1].id
    const nextPageId = index === playbookPages.length - 1 ? null : playbookPages[index + 1].id

    createPage({
      path: `/playbook${page.fields.slug}`,
      component: playbookPage,
      context: { id: page.id, previousPageId, nextPageId },
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({ name: `slug`, node, value })

    const fileNode = getNode(node.parent)
    createNodeField({ name: `collection`, node, value: fileNode.sourceInstanceName })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      github: String
      linkedin: String
    }

    type MarkdownRemark implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
      section: String
      order: Int
    }

    type Fields {
      slug: String
      collection: String
    }
  `)
}
