import { createWriteStream } from 'fs';
import { SitemapStream } from 'sitemap';
import { Readable } from 'stream';

const generateSitemap = () => {
  const sitemap = new SitemapStream({ hostname: 'https://www.bennking.dev' }); // Replace with your app's base URL
  const writeStream = createWriteStream('./public/sitemap.xml'); // Output path for the sitemap XML file

  const rootRoute = {
    url: '/',
    changefreq: 'weekly',
    priority: 1,
    lastmod: new Date().toISOString(),
  };

  sitemap.write(rootRoute);
  sitemap.end();

  const readableStream = Readable.from(sitemap);
  readableStream.pipe(writeStream).on('error', (error) => {
    console.error(error);
  });
};

generateSitemap();

