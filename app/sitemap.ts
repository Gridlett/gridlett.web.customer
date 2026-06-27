import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://gridlett.com'
  const changeFrequency = 'weekly' as const

  const routes = [
    '',
    '/about',
    '/careers',
    '/contact',
    '/faq',
    '/pricing',
    '/privacy',
    '/terms',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency,
    priority: route === '' ? 1.0 : 0.8,
  }))
}
