import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next'
import ReactMarkdown from "react-markdown";
import Moment from "react-moment";

import {
  getArticles,
  getArticle,
  getCategories,
  getGeneral,
  getPages,
} from "../../lib/api";
import Layout from "../../components/layout";

const Article = ({ article, categories, general, pages }) => {
  const imageUrl = article.image
    ? article.image.url.startsWith("/")
      ? process.env.API_URL + article.image.url
      : article.image.url
    : "";
  return (
    <Layout categories={categories} general={general} pages={pages}>
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{article.title}</h1>
      </div>

      <div id="article-content" className="uk-container uk-container-small">
        <h5>
          <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
        </h5>
        <ReactMarkdown source={article.content} escapeHtml={false} />
      </div>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const articles = (await getArticles()) || [];
  return {
    paths: articles.map((article) => ({
      params: {
        id: article.id,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const article = (await getArticle(context.params.id)) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const pages = (await getPages()) || [];
  return {
    props: { article, categories, general, pages },
    unstable_revalidate: 1,
  };
};

export default Article;
