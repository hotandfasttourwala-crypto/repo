import { MetadataRoute } from 'next';
import { getAllRoutesData } from '../data/routes';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hotandfasttourwala.com'; // Replace with actual domain when available

  const staticPages = [
    '',
    '/routes',
    '/fleet',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const routesData = await getAllRoutesData();
  const dynamicRoutes = routesData.map((route) => ({
    url: `${baseUrl}/route/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  return [...staticPages, ...dynamicRoutes];
}
