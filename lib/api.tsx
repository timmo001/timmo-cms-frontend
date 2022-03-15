import axios from "axios";

import {
  AboutType,
  ArticleType,
  CategoryType,
  GeneralType,
  GraphQL,
  GraphQLData,
  GraphQLResponse,
  HomepageType,
} from "./types/graphql";
import queryAbout from "./graphql/about.graphql";
import queryArticles from "./graphql/articles.graphql";
import queryCategories from "./graphql/categories.graphql";
import queryGeneral from "./graphql/general.graphql";
import queryHomepage from "./graphql/homepage.graphql";

async function graphQLGet<T>(
  array: boolean,
  item: string,
  query: string,
  variables?: { [key: string]: any }
): Promise<Array<GraphQLData<T>> | T> {
  try {
    const response = await axios.post<
      GraphQLResponse<Array<GraphQLData<T>> | GraphQLData<T>>
    >(
      `${process.env.API_URL}/graphql`,
      {
        query,
        variables,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (array) {
      const data = response.data.data[item].data as Array<GraphQLData<T>>;
      if (array) return data;
    }
    const data = response.data.data[item].data as GraphQLData<T>;
    return data.attributes;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export function getApiMediaUrl(url: string): string {
  return `${
    url && url.startsWith("http")
      ? ""
      : process.env.NODE_ENV !== "production"
      ? process.env.API_URL
      : ""
  }${url}`;
}

export async function getAbout(): Promise<AboutType | null> {
  try {
    return (await graphQLGet<AboutType>(
      false,
      "about",
      queryAbout
    )) as AboutType;
  } catch (e) {
    return null;
  }
}

export async function getArticles(): Promise<Array<
  GraphQLData<ArticleType>
> | null> {
  try {
    return (await graphQLGet<ArticleType>(
      true,
      "articles",
      queryArticles
    )) as Array<GraphQLData<ArticleType>>;
  } catch (e) {
    return null;
  }
}

export async function getCategories(): Promise<Array<
  GraphQLData<CategoryType>
> | null> {
  try {
    return (await graphQLGet<CategoryType>(
      true,
      "categories",
      queryCategories
    )) as Array<GraphQLData<CategoryType>>;
  } catch (e) {
    return null;
  }
}

export async function getGeneral(): Promise<GeneralType | null> {
  try {
    return (await graphQLGet<GeneralType>(
      false,
      "general",
      queryGeneral
    )) as GeneralType;
  } catch (e) {
    return null;
  }
}

export async function getHomepage(): Promise<HomepageType | null> {
  try {
    return (await graphQLGet<HomepageType>(
      false,
      "homepage",
      queryHomepage
    )) as HomepageType;
  } catch (e) {
    return null;
  }
}
