import { getAbout, getArticles, getCategories, getHomepage } from "../lib/api";

const generateSitemap = (pages, origin) => {
  let xml = "";

  pages.map((page) => {
    xml += `
    <url>
        <loc>${origin + page.path}</loc>
        <lastmod>${page.updated}</lastmod>
    </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xml}
</urlset>`;
};

export async function getServerSideProps({ res }) {
  const about = await getAbout();
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const homepage = await getHomepage();

  const data = [];
  data.push({ path: "", updated: homepage.updated_at });
  data.push({ path: "/about", updated: about.updated_at });
  articles.forEach((article) =>
    data.push({
      path: `/article/${article.id}`,
      updated: article.updated_at,
    })
  );
  categories.forEach((category) =>
    data.push({
      path: `/category/${category.id}`,
      updated: category.updated_at,
    })
  );

  const sitemap = generateSitemap(
    data,
    "https://timmo-cms-frontend.vercel.app"
  );

  console.log("Sitemap:");
  console.log(sitemap);

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

const SitemapIndex = () => null;
export default SitemapIndex;
