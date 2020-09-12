async function fetchAPI(query, { variables } = {}) {
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
      published_at
      title
      category {
        id
        name
      }
      image {
        url
        alternativeText
      }
      published_at
    }
  }`);
  return data.articles;
}

export async function getArticle(id) {
  const data = await fetchAPI(
    `query Articles($id: ID!) {
    article(id: $id) {
      id
      title
      content
      image {
        url
        alternativeText
      }
      category {
        id
        name
      }
      published_at
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
    }
  }`);
  return data.categories;
}

export async function getCategory(id) {
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
        title
        content
        image {
          url
          alternativeText
        }
        category {
          id
          name
        }
        published_at
      }
    }
  }
`,
    { variables: { id } }
  );
  return data.category;
}

export async function getGeneral() {
  const data = await fetchAPI(`query General {
    general {
      footer_content
    }
  }
  `);
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
    }
  }`);
  return data.homepage;
}

export async function getPages() {
  const data = await fetchAPI(`query Pages {
    pages {
      id
      title
    }
  }`);
  return data.pages;
}

export async function getPage(id) {
  const data = await fetchAPI(
    `query Page($id: ID!) {
    page(id: $id) {
      id
      title
      content
      slider_media {
        url
        alternativeText
      }
      slider_slides
    }
  }`,
    { variables: { id } }
  );
  return data.page;
}
