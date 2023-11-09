// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getBookCollections(
      uuid: String!
      search: String
      orderBy: String
      bookUuid: String
      userUuid: String
      offset: Int
      limit: Int
    ): PaginateBookCollection
    getBookCollection(uuid: String!): BookCollection
  }
  extend type Mutation {
    addBookCollection(
      bookUuid: String!
      collectionUuid: String!
      userUuid: String!
    ): BookCollection!
    addBulkBookCollection(
      collections: [String]
      books: [String]
      userUuid: String
    ): [BookCollection!]!
    bulkBookCollection(
      payload: [PayloadBulkBookCollection!]!
    ): [BookCollection]
    editBookCollection(
      bookUuid: String!
      collectionUuid: String!
      userUuid: String!
      uuid: String!
    ): BookCollection!
    deleteBookCollection(
      uuid: String!
      userUuid: String!
    ): Boolean!
  }

  type PaginateBookCollection {
    hasMore: Boolean
    items: [BookCollection!]!
    offset: Int
    page: Int
    limit: Int
    total: Int
  }

  type BookCollection {
    id: Int
    bookUuid: Book
    collectionUuid: Collection
    uuid: String
    userUuid: String
  }

  input CollectionUuid {
    uuid: String!
  }

  input PayloadBulkBookCollection {
    bookUuid: String!
    uuid: String
    collectionUuid: CollectionUuid!
    action: String!
    userUuid: String!
  }
`;