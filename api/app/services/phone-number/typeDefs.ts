// Construct a schema, using GraphQL schema language
export const typeDefs = `
  extend type Query {
    getPhoneNumbers(
      uuid: String!
      search: String
      orderBy: String
      bookUuid: String
      userUuid: String
      offset: Int
      limit: Int
    ): PaginatePhoneNumber
    getPhoneNumber(uuid: String!): PhoneNumber
  }
  extend type Mutation {
    addPhoneNumber(
      bookUuid: String!
      phoneNumber: String!
      userUuid: String!
    ): PhoneNumber!
    editBulkPhoneNumber(
      phoneNumbers: [PayloadPhoneNumber]
      bookUuid: String
      userUuid: String
    ): [PhoneNumber!]!
    addBulkPhoneNumber(
      phoneNumbers: [String]
      bookUuid: String
      userUuid: String
    ): [PhoneNumber!]!
    bulkPhoneNumber(
      payload: [PayloadBulkPhoneNumber!]!
    ): [PhoneNumber]
    editPhoneNumber(
      bookUuid: String!
      phoneNumber: String!
      userUuid: String!
      uuid: String!
    ): PhoneNumber!
    deletePhoneNumber(
      uuid: String!
      userUuid: String!
    ): Boolean!
  }

  type PaginatePhoneNumber {
    hasMore: Boolean
    items: [PhoneNumber!]!
    offset: Int
    page: Int
    limit: Int
    total: Int
  }

  type PhoneNumber {
    id: Int
    bookUuid: Book
    phoneNumber: String
    uuid: String
    userUuid: String
  }

  input PayloadPhoneNumber {
    id: Int
    phoneNumber: String
    uuid: String
    userUuid: String
  }

  input PayloadBulkPhoneNumber {
    bookUuid: String!
    uuid: String
    phoneNumber: String
    action: String!
    userUuid: String!
  }
`;