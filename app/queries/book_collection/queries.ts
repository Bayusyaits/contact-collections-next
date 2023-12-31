import gql from "graphql-tag";
export const PUT_BULK_BOOK_COLLECTION = gql`
  mutation bulkBookCollection(
    $payload: [PayloadBulkBookCollection!]!
  ) {
    bulkBookCollection(
      payload: $payload
    ) {
      uuid
      userUuid
    }
  }
`;

export const POST_ADD_BULK_BOOK_COLLECTION = gql`
  mutation addBulkBookCollection(
    $collections: [String]
    $books: [String]
    $userUuid: String
  ) {
    addBulkBookCollection(
      collections: $collections
      books: $books
      userUuid: $userUuid
    ) {
      id
      uuid
      userUuid
    }
  }
`;
export const GET_LIST_BOOK_COLLECTIONS = gql`
  query getListBookCollections(
    $slug: String
    $orderBy: String
  ) {
    getListBookCollection(
      slug: $slug,
      orderBy: $orderBy
    ) {
      uuid
      bookUuid {
        id
        uuid
      }
      userUuid
    }
  }
`;
