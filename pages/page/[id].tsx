import { GetStaticProps, GetStaticPaths, GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Slider from "react-slick";

import { getCategories, getGeneral, getPage, getPages } from "../../lib/api";
import Layout from "../../components/layout";

const Page = ({ categories, general, page, pages }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: page.slider_slides || 3,
    slidesToScroll: page.slider_slides || 3,
  };
  return (
    <Layout categories={categories} general={general} pages={pages}>
      <div id="page-content" className="uk-container uk-container-medium">
        <h1>{page.title}</h1>
        <ReactMarkdown source={page.content} escapeHtml={false} />
        <div className="uk-flex-center uk-flex-middle">
          <Slider {...sliderSettings}>
            {page.slider_media.map(({ url, alternativeText }, index) => (
              <img
                key={index}
                className="slider-image"
                src={`${
                  process.env.NODE_ENV !== "production"
                    ? process.env.API_URL
                    : ""
                }${url}`}
                alt={alternativeText}
              />
            ))}
          </Slider>
        </div>
        <p>
          <br />
          <br />
        </p>
      </div>
    </Layout>
  );
};

export async function getStaticPaths() {
  const pages = (await getPages()) || [];
  return {
    paths: pages.map((page) => ({
      params: {
        id: page.id,
      },
    })),
    fallback: false,
  };
}

export const getStaticProps: GetStaticProps = async (context) => {
  const categories = (await getCategories()) || [];
  const general = await getGeneral();
  const page = await getPage(context.params.id);
  const pages = (await getPages()) || [];
  return {
    props: { categories, general, page, pages },
    unstable_revalidate: 1,
  };
};

export default Page;
