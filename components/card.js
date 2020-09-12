import React from "react";
import Moment from "react-moment";
import Link from "next/link";

const Card = ({ article }) => {
  const imageUrl = article.image
    ? article.image.url.startsWith("/")
      ? process.env.API_URL + article.image.url
      : article.image.url
    : "";
  return (
    <Link as={`/article/${article.id}`} href="/article/[id]">
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted uk-flex uk-flex-column uk-flex-between">
          <div className="uk-flex-1" />
          <div className="uk-card-media-bottom">
            <img
              src={imageUrl}
              alt={article.image?.alternativeText}
              height="100"
            />
          </div>
          <div className="uk-flex-1" />
          <div className="uk-card-body">
            <p id="category" className="uk-text-uppercase">
              {article.category?.name}
            </p>
            <p id="title" className="uk-text-large">
              {article.title}
            </p>
            <p id="subtitle" className="uk-text-xsmall">
              <Moment format="Do MMMM YYYY">{article.published_at}</Moment>
            </p>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Card;
