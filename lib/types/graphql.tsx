export interface GraphQLResponse<T> {
  data: { [item: string]: GraphQL<T> };
}

export interface GraphQL<T> {
  data: T;
}

export interface GraphQLData<T> {
  id: string;
  attributes: T;
}

export interface MediaAttributes {
  name: string;
  alternativeText: string;
  caption: string;
  url: string;
  width: null;
  height: null;
  mime: string;
  ext: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AboutType {
  name: string;
  subtitle: string;
  content: string;
  profile: GraphQL<GraphQLData<MediaAttributes>>;
  header: GraphQL<GraphQLData<MediaAttributes>>;
  showcase: GraphQL<Array<GraphQLData<MediaAttributes>>>;
  showcaseSlides: number;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
}

export interface ArticleType {
  title: string;
  content: string;
  header: GraphQL<GraphQLData<MediaAttributes>>;
  thumbnail: GraphQL<GraphQLData<MediaAttributes>>;
  showcase: GraphQL<Array<GraphQLData<MediaAttributes>>>;
  showcaseSlides: number;
  category: GraphQL<GraphQLData<CategoryType>>;
  tags: GraphQL<Array<GraphQLData<TagType>>>;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
}

export interface CategoryType {
  name: string;
  header?: GraphQL<GraphQLData<MediaAttributes>>;
  articles: GraphQL<Array<GraphQLData<ArticleType>>>;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
}

export interface GeneralType {
  header: GraphQL<GraphQLData<MediaAttributes>>;
  footer: string;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
}

export interface HomepageType {
  heading: string;
  subheading: string;
  createdAt: Date;
  publishedAt: Date;
  updatedAt: Date;
}

export interface TagType {
  name: string;
  createdAt: Date;
  color: string;
  publishedAt: Date;
  updatedAt: Date;
}
