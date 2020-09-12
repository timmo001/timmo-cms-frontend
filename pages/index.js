import React from "react";
import Slider from "react-slick";

import Articles from "../components/articles-homepage";
import Layout from "../components/layout";
import {
  getArticles,
  getCategories,
  getGeneral,
  getHomepage,
  getPages,
} from "../lib/api";

const sliderSettingsProfile = {
  dots: true,
  infinite: true,
  speed: 2000,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Home = ({ articles, categories, general, homepage, pages }) => {
  // const sliderSettingsShowcase = {
  //   dots: true,
  //   infinite: true,
  //   speed: 2000,
  //   slidesToShow: homepage.showcase_slides || 3,
  //   slidesToScroll: homepage.showcase_slides || 3,
  // };

  return (
    <Layout categories={categories} general={general} pages={pages}></Layout>
  );
};

export async function getStaticProps() {
  const articles = (await getArticles()) || [];
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const homepage = await getHomepage();
  const pages = (await getPages()) || [];
  return {
    props: { articles, categories, general, homepage, pages },
    unstable_revalidate: 1,
  };
}

export default Home;
