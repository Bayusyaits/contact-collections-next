// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getCollections(
      slug: String!
      search: String
      orderBy: String
      type: String
      offset: Int
      limit: Int
      ): PaginateCollection
    getListCollection(
      slug: String
      orderBy: String
      ): [Collection!]!
    getCollection(uuid: String!): Collection
  }
  extend type Mutation {
    addCollection(payload: PayloadAddCollection): Collection!
    editCollection(payload: PayloadEditCollection): Collection!
    deleteCollection(
      uuid: String!
    ): Boolean!
  }

  type PaginateCollection {
    hasMore: Boolean
    items: [Collection!]!
    offset: Int
    page: Int
    limit: Int
    total: Int
  }

  input PayloadAddCollection {
    name: String!
    slug: String!
    image: Int!
  }

  input PayloadEditCollection {
    uuid: String!
    name: String
    slug: String
    image: Int
  }
  
  type Collection {
    uuid: String!
    name: String!
    type: String
    slug: String
    image: String
  }
`;