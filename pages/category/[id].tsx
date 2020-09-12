import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import Articles from "../../components/articles";

import {
  getCategory,
  getCategories,
  getGeneral,
  getPages,
} from "../../lib/api";
import Layout from "../../components/layout";

const Category = ({ category, categories, general, pages }) => {
  return (
    <Layout categories={categories} general={general} pages={pages}>
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{category.name}</h1>
          <Articles articles={category.articles} />
        </div>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const categories = (await getCategories()) || [];
  return {
    paths: categories.map((category) => ({
      params: {
        id: category.id,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const category = (await getCategory(context.params.id)) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const pages = (await getPages()) || [];
  return {
    props: { category, categories, general, pages },
    unstable_revalidate: 1,
  };
};

export default Category;
