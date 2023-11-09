// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getBooks(
      search: String
      sortBy: String
      type: String
      offset: Int
      limit: Int
      ): PaginateBook
    getListBooks(
      slug: String
      sortBy: String
        limit: Int
      ): [Book!]!
    getBook(slug: String!): Book
  }
  
  extend type Mutation {
    addBook(payload: PayloadAddBook): Book!
    editBook(payload: PayloadEditBook): Book!
    deleteBook(
      uuid: String!
    ): Boolean!
  }

  type PaginateBook {
    hasMore: Boolean
    items: [Book!]!
    page: Int
    limit: Int
    total: Int
  }

  type Gallery {
    image: String
  }

  input PayloadAddBook {
    status: String
    slug: String
    fullName: String
    userUuid: String!
    image: String
    address: String
    description: String
    phoneNumber: String!
    email: String
    type: String
  }

  input PayloadEditBook {
    userUuid: String
    uuid: String!
    status: String
    slug: String
    fullName: String
    image: String
    address: String
    description: String
    phoneNumber: String
    email: String
    type: String
  }

  type Book {
    uuid: String!
    userUuid: String
    fullName: String!
    slug: String!
    image: String
    address: String
    description: String
    phoneNumber: String
    email: String
    type: String
    gallery: [Gallery]
    bookCollections: [BookCollection]
    bookCategories: [BookCategory]
  }
`;