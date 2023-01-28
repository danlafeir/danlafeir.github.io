import * as React from "react"
import type { PageProps } from "gatsby"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"

const Recipes = (_props: PageProps) => (
  <Layout>
    <h1>Recipes</h1>
    <h3>Chicken Sandwich</h3>
    <p>Ingrediants</p> 
    <ol>
      <li>chicken breast</li>
      <li>cornflakes</li>
      <li>flour</li>
      <li>salt</li>
      <li>pepper</li>
      <li>garlic powder</li>
      <li>gougjang</li>
      <li>siracha</li>
      <li>greek yogurt</li>
      <li>pickles</li>
    </ol>
  </Layout>
)

export default Recipes
