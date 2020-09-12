import React from "react";
import moment from "moment";
import Card from "./card";

const Articles = ({ articles }) => {
  articles.sort((a, b) =>
    moment(a.published_at) < moment(b.published_at) ? 1 : -1
  );

  return (
    <div className="uk-grid uk-child-width-1-4@m uk-child-width-1-2@s uk-grid-match">
      {articles.map((article, index) => (
        <Card key={index} article={article} key={`article__${article.id}`} />
      ))}
    </div>
  );
};

export default Articles;
