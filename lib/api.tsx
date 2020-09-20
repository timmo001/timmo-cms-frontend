async function fetchAPI(query, props?): Promise<any> {
  const variables = props?.variables;
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
}

export function getApiMediaUrl(url: string): string {
  return `${
    process.env.NODE_ENV !== "production" ? process.env.API_URL : ""
  }${url}`;
}

export async function getAbout() {
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
      showcase_media {
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
}

export async function getArticles() {
  const data = await fetchAPI(`query Articles {
    articles {
      id
      category {
        id
        name
      }
      tags {
        name
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
      showcase_media {
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
}

export async function getCategories() {
  const data = await fetchAPI(`query Categories {
    categories {
      id
      name
      header_media {
        alternativeText
        caption
        name
        url
      }
      articles {
        id
        category {
          id
          name
        }
        tags {
          name
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
        showcase_media {
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
}

export async function getGeneral() {
  const data = await fetchAPI(`query General {
    general {
      footer_content
      header_media {
        url
        alternativeText
      }
    }
  }`);
  return data.general;
}

export async function getHomepage() {
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
      showcase_media {
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
}
