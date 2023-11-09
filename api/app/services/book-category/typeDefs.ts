// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getBookCategories(
      uuid: String!
      search: String
      sortBy: String
      bookUuid: String
      userUuid: String
      offset: Int
      limit: Int
    ): PaginateBookCategory
    getBookCategory(uuid: String!): BookCategory
  }
  extend type Mutation {
    addBookCategory(
      bookUuid: String!
      categoryUuid: String!
      userUuid: String!
    ): BookCategory!
    addBulkBookCategory(
      categories: [String]
      books: [String]
      userUuid: String
    ): [BookCategory!]!
    editBookCategory(
      bookUuid: String!
      categoryUuid: String!
      userUuid: String!
      uuid: String!
    ): BookCategory!
    deleteBookCategory(
      uuid: String!
      userUuid: String!
    ): Boolean!
  }

  type PaginateBookCategory {
    hasMore: Boolean
    items: [BookCategory!]!
    page: Int
    limit: Int
    total: Int
  }

  type BookCategory {
    id: Int
    bookUuid: Book
    categoryUuid: Category
    uuid: String
    userUuid: String
  }
`;