(self.webpackChunkgatsby_starter_blog=self.webpackChunkgatsby_starter_blog||[]).push([[678],{8565:function(e){"use strict";e.exports=JSON.parse('{"layout":"fixed","backgroundColor":"#e8e8d8","images":{"fallback":{"src":"/static/ea0e7ba2520be125cffeb02d5aa44c9e/e5610/dan-photo.png","srcSet":"/static/ea0e7ba2520be125cffeb02d5aa44c9e/e5610/dan-photo.png 50w,\\n/static/ea0e7ba2520be125cffeb02d5aa44c9e/e9b55/dan-photo.png 100w","sizes":"50px"},"sources":[{"srcSet":"/static/ea0e7ba2520be125cffeb02d5aa44c9e/d4bf4/dan-photo.avif 50w,\\n/static/ea0e7ba2520be125cffeb02d5aa44c9e/ee81f/dan-photo.avif 100w","type":"image/avif","sizes":"50px"},{"srcSet":"/static/ea0e7ba2520be125cffeb02d5aa44c9e/3faea/dan-photo.webp 50w,\\n/static/ea0e7ba2520be125cffeb02d5aa44c9e/6a679/dan-photo.webp 100w","type":"image/webp","sizes":"50px"}]},"width":50,"height":50}')},9535:function(e,t,a){"use strict";var l=a(7294),n=a(5444),i=a(8605);t.Z=function(){var e,t,o=(0,n.useStaticQuery)("3257411868"),r=null===(e=o.site.siteMetadata)||void 0===e?void 0:e.author,s=null===(t=o.site.siteMetadata)||void 0===t?void 0:t.social;return l.createElement("div",{className:"bio"},l.createElement(i.S,{className:"bio-avatar",layout:"fixed",formats:["AUTO","WEBP","AVIF"],src:"../images/dan-photo.png",width:50,height:50,quality:95,alt:"Profile picture",__imageData:a(8565)}),(null==r?void 0:r.name)&&l.createElement("p",null,"Written by ",l.createElement("strong",null,r.name)," ",(null==r?void 0:r.summary)||null," ",l.createElement("a",{href:"https://twitter.com/"+((null==s?void 0:s.twitter)||"")},"You should follow them on Twitter")))}},7704:function(e,t,a){"use strict";a.r(t);var l=a(7294),n=a(5444),i=a(9535),o=a(7198),r=a(3751);t.default=function(e){var t,a=e.data,s=e.location,c=(null===(t=a.site.siteMetadata)||void 0===t?void 0:t.title)||"Title",d=a.allMarkdownRemark.nodes;return 0===d.length?l.createElement(o.Z,{location:s,title:c},l.createElement(r.Z,{title:"All posts"}),l.createElement(i.Z,null),l.createElement("p",null,'No blog posts found. Add markdown posts to "content/blog" (or the directory you specified for the "gatsby-source-filesystem" plugin in gatsby-config.js).')):l.createElement(o.Z,{location:s,title:c},l.createElement(r.Z,{title:"All posts"}),l.createElement(i.Z,null),l.createElement("ol",{style:{listStyle:"none"}},d.map((function(e){var t=e.frontmatter.title||e.fields.slug;return l.createElement("li",{key:e.fields.slug},l.createElement("article",{className:"post-list-item",itemScope:!0,itemType:"http://schema.org/Article"},l.createElement("header",null,l.createElement("h2",null,l.createElement(n.Link,{to:e.fields.slug,itemProp:"url"},l.createElement("span",{itemProp:"headline"},t))),l.createElement("small",null,e.frontmatter.date)),l.createElement("section",null,l.createElement("p",{dangerouslySetInnerHTML:{__html:e.frontmatter.description||e.excerpt},itemProp:"description"}))))}))))}}}]);
//# sourceMappingURL=component---src-pages-index-js-0442b59dd96629129042.js.map