const SITE = 'https://daniellafeir.com/';

export const author = {
  '@type': 'Person',
  name: 'Dan Lafeir',
  url: SITE,
};

export function person(imageUrl: string) {
  return {
    '@context': 'https://schema.org',
    ...author,
    '@id': `${SITE}#person`,
    alternateName: 'Daniel Lafeir',
    image: imageUrl,
    address: { '@type': 'PostalAddress', addressLocality: 'Chicago', addressRegion: 'IL', addressCountry: 'US' },
    sameAs: ['https://www.linkedin.com/in/danlafeir', 'https://github.com/danlafeir'],
  };
}

export function article(fields: { headline: string; description?: string; url: URL; datePublished?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: fields.headline,
    description: fields.description,
    url: fields.url.href,
    datePublished: fields.datePublished,
    author,
  };
}

// Serialized into a <script> tag, so "<" is escaped to keep content from closing the tag early.
export function toJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
