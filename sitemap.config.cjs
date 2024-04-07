/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL || "http://localhost:3000",
  generateIndexSitemap: true,
  generateRobotsTxt: true,
};
