const Airtable = require('airtable');

module.exports = {
  siteUrl: process.env.SITE_URL || 'https://bermudaferries.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://bermudaferries.com/server-sitemap.xml',
    ],
  },
  additionalPaths: async (config) => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_PAT }).base('app4P77dJd7f0ffnK');
    const records = await base('Trips').select().all();

    const trips = records.map(record => ({
      id: record.id,
      fields: record.fields
    }));

    const routes = [...new Set(trips.map(trip => trip.fields['Route'][0]))];

    const routePaths = routes.map((route) => ({
      loc: `/route/${encodeURIComponent(route)}`,
      changefreq: 'daily',
      priority: 0.8,
      lastmod: new Date().toISOString(),
    }));

    return routePaths;
  },
};