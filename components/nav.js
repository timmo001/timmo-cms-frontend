import React from "react";
import Link from "next/link";

const Nav = ({ categories, pages }) => {
  return (
    <div>
      <nav className="uk-navbar uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Home</a>
              </Link>
            </li>
            {pages.map(({ id, title }) => {
              return (
                <li key={id}>
                  <Link as={`/page/${id}`} href="/page/[id]">
                    <a className="uk-link-reset">{title}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {categories.map(({ id, name }) => {
              return (
                <li key={id}>
                  <Link as={`/category/${id}`} href="/category/[id]">
                    <a className="uk-link-reset">{name}</a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
