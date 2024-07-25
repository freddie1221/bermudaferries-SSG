/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://bermudaferries.com',
  generateRobotsTxt: true,
  exclude: ['/server-sitemap.xml'], // exclude server-side sitemap from indexing
  robotsTxtOptions: {
    additionalSitemaps: [
      'https://bermudaferries.com/server-sitemap.xml', // Add server-side sitemap here
    ],
  },
}