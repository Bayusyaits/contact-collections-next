// Construct a schema, using GraphQL schema language
export const typeDefs = `
  type Query {
    getCategories(
      slug: String!
      search: String
      sortBy: String
      type: String
      offset: Int
      limit: Int
      ): PaginateCategory
      getCategory(uuid: String!): Category
  }
  type Mutation {
    addCategory(payload: PayloadAddCategory): Category!
    editCategory(payload: PayloadEditCategory): Category!
    deleteCategory(uuid: String!): Boolean!
  }

  type PaginateCategory {
    hasMore: Boolean
    items: [Category!]!
    page: Int
    limit: Int
    total: Int
  }

  input PayloadAddCategory {
    name: String!
    slug: String!
    icon: Int!
  }

  input PayloadEditCategory {
    uuid: String!
    name: String
    slug: String
    icon: Int
  }

  type Category {
    id: Int!
    name: String!
    slug: String!
    icon: Int!
  }
`;