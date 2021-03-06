import {
  AboutType,
  ArticleType,
  CategoryType,
  GeneralType,
  HomepageType,
} from "../components/Types";

async function fetchAPI(
  query: string,
  props?: { variables: any }
): Promise<any> {
  const variables = props?.variables;
  try {
    const res = await fetch(`${process.env.API_URL}/graphql`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });
    const json = await res.json();
    if (json.errors) {
      console.error(json.errors);
      throw new Error("Failed to fetch API");
    }

    return json.data;
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

export async function getAbout(): Promise<AboutType> {
  try {
    const data = await fetchAPI(`query About {
      about {
        id
        content
        header_media {
          alternativeText
          caption
          name
          url
        }
        profile_name
        profile_subtitle
        profile_media {
          alternativeText
          caption
          name
          url
        }
        showcase_media(sort: "name:asc") {
          alternativeText
          caption
          name
          url
        }
        showcase_slides
        updated_at
      }
    }`);
    return data.about;
  } catch (e) {
    return null;
  }
}

export async function getArticles(): Promise<ArticleType[]> {
  try {
    const data = await fetchAPI(`query Articles {
      articles(sort: "published_at:desc") {
        id
        category {
          id
          name
          updated_at
        }
        tags {
          name
          color
        }
        title
        content
        header_media {
          alternativeText
          caption
          name
          url
        }
        thumbnail_media {
          alternativeText
          caption
          name
          url
        }
        showcase_media(sort: "name:asc") {
          alternativeText
          caption
          name
          url
        }
        showcase_slides
        published_at
        updated_at
      }
    }`);
    return data.articles;
  } catch (e) {
    return null;
  }
}

export async function getCategories(): Promise<CategoryType[]> {
  try {
    const data = await fetchAPI(`query Categories {
      categories(sort: "name:asc") {
        id
        name
        header_media {
          alternativeText
          caption
          name
          url
        }
        articles(sort: "published_at:desc") {
          id
          category {
            id
            name
          }
          tags {
            name
            color
          }
          title
          content
          header_media {
            alternativeText
            caption
            name
            url
          }
          thumbnail_media {
            alternativeText
            caption
            name
            url
          }
          showcase_media(sort: "name:asc") {
            alternativeText
            caption
            name
            url
          }
          showcase_slides
          published_at
          updated_at
          }
        updated_at
      }
    }`);
    return data.categories;
  } catch (e) {
    return null;
  }
}

export async function getGeneral(): Promise<GeneralType> {
  try {
    const data = await fetchAPI(`query General {
      general {
        footer_content
        header_media {
          alternativeText
          caption
          name
          url
        }
      }
    }`);
    return data.general;
  } catch (e) {
    return null;
  }
}

export async function getHomepage(): Promise<HomepageType> {
  try {
    const data = await fetchAPI(`query Homepage {
    homepage {
      articles_heading
      header_media {
        alternativeText
        caption
        name
        url
      }
      showcase_heading
      showcase_media(sort: "name:asc") {
        alternativeText
        caption
        name
        url
      }
      showcase_slides
      welcome_message
      updated_at
    }
  }`);
    return data.homepage;
  } catch (e) {
    return null;
  }
}
