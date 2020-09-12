import React from "react";
import Head from "next/head";
import clsx from "clsx";
import ReactMarkdown from "react-markdown";

import Nav from "./nav";

const Layout = ({ children, categories, general, pages }) => (
  <>
    <Head>
      <title>Timmo</title>
    </Head>
    <Nav categories={categories} pages={pages} />
    {children}
    <footer>
      {general.footer_content ? (
        <ReactMarkdown source={general.footer_content} escapeHtml={false} />
      ) : (
        ""
      )}
    </footer>
  </>
);

export default Layout;
