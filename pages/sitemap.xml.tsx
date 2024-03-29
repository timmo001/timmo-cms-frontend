import { getAbout, getArticles, getCategories, getHomepage } from "../lib/api";

interface PageType {
  path: string;
  updated?: Date;
}

const generateSitemap = (pages: PageType[], origin: string): string => {
  let xml = "";

  pages.map((page) => {
    xml += `
    <url>
        <loc>${origin + page.path}</loc>
        <lastmod>${page.updated}</lastmod>
    </url>`;
  });

  return `<?xml version="1.0" encoding="UTF-8" ?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${xml.trimStart()}
</urlset>`;
};

export async function getServerSideProps({
  res,
}): Promise<{ [key: string]: any }> {
  const about = await getAbout();
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const homepage = await getHomepage();

  const data: PageType[] = [];
  data.push({ path: "", updated: homepage?.updatedAt });
  data.push({ path: "/about", updated: about?.updatedAt });
  articles.forEach((article) =>
    data.push({
      path: `/article?id=${article.id}`,
      updated: article.attributes.updatedAt,
    })
  );
  categories.forEach((category) =>
    data.push({
      path: `/category?id=${category.id}`,
      updated: category.attributes.updatedAt,
    })
  );

  const sitemap = generateSitemap(data, "https://timmo.dev");

  res.setHeader("Content-Type", "text/xml");
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

const SitemapIndex = () => null;
export default SitemapIndex;
