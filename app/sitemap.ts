import { langs } from '@/lib/i18n'
import type { MetadataRoute } from 'next'

const SITE_URL = 'https://trayka.com'
function alternates(path: string) {
  const map: Record<string, string> = {}

  langs.forEach((lang) => {
    map[lang.code] = `${SITE_URL}/${lang.code}${path}`
  })

  map['x-default'] = `${SITE_URL}${path}`;
  //<xhtml:link rel="alternate" hreflang="x-default" href="https://trayka.com/" />

  return {
    languages: map,
    'x-default': `${SITE_URL}${path}`,
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date().toISOString().split('T')[0];

  const pages = [
    { path: '/', priority: 1.0 },
    { path: '/zta', priority: 0.9 },
    { path: '/rag', priority: 0.9 },
    // { path: '/blog', priority: 0.7 },
    { path: '/career', priority: 0.6 },
    { path: '/privacy', priority: 0.4 },
  ]

  return pages.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: 'weekly',
    priority,
    alternates: alternates(path),
  }))
}