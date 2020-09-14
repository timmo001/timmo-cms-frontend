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

export async function getArticles() {
  const data = await fetchAPI(`query Articles {
    articles {
      id
      category {
        id
        name
      }
      title
      thumbnail_media {
        url
        alternativeText
      }
      published_at
      updated_at
    }
  }`);
  return data.articles;
}

export async function getArticle(id: string | string[]) {
  const data = await fetchAPI(
    `query Articles($id: ID!) {
    article(id: $id) {
      id
      category {
        id
        name
      }
      title
      content
      header_media {
        url
        alternativeText
      }
      thumbnail_media {
        url
        alternativeText
      }
      showcase_media {
        url
        alternativeText
      }
      showcase_slides
      published_at
      updated_at
    }
  }`,
    { variables: { id } }
  );
  return data.article;
}

export async function getCategories() {
  const data = await fetchAPI(`query Categories {
    categories {
      id
      name
      updated_at
    }
  }`);
  return data.categories;
}

export async function getCategory(id: string | string[]) {
  const data = await fetchAPI(
    `query Category($id: ID!) {
    category(id: $id) {
      id
      name
      header_media {
        url
        alternativeText
      }
      articles {
        id
        category {
          id
          name
        }
        title
        thumbnail_media {
          url
          alternativeText
        }
        published_at
        updated_at
      }
      updated_at
    }
  }`,
    { variables: { id } }
  );
  return data.category;
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
      id
      articles_heading
      header_media {
        url
        alternativeText
      }
      showcase_heading
      showcase_media {
        url
        alternativeText
      }
      showcase_slides
      welcome_message
      updated_at
    }
  }`);
  return data.homepage;
}

export async function getPages() {
  const data = await fetchAPI(`query Pages {
    pages {
      id
      title
      updated_at
    }
  }`);
  return data.pages;
}

export async function getPage(id: string | string[]) {
  const data = await fetchAPI(
    `query Page($id: ID!) {
    page(id: $id) {
      id
      title
      content
      header_media {
        url
        alternativeText
      }
      showcase_media {
        url
        alternativeText
      }
      showcase_slides
      updated_at
    }
  }`,
    { variables: { id } }
  );
  return data.page;
}
