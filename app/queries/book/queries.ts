import gql from "graphql-tag";

export const GET_LIST_BOOKS = gql`
query getListBooks(
  $slug: String
  $sortBy: String
) {
  getListBooks(
    slug: $slug
    sortBy: $sortBy
  ) {
    uuid
    userUuid
    fullName
    slug
    address
    phoneNumber
    description
    email
    type
    image
  }
}
`;

export const GET_BOOK = gql`
  query getBook(
    $slug: String!
  ) {
    getBook(
      slug: $slug
    ) {
      uuid
      userUuid
      fullName
      slug
      description
      phoneNumber
      type
      image
      address
      email
      bookCategories {
        id
        uuid
        categoryUuid {
          name
        }
      }
      bookCollections {
        uuid
        collectionUuid {
          name
          uuid
        }
        id
      }
    }
  }
`;


export const GET_BOOK_ITEMS = gql`
query getBook(
  $slug: String
) {
  getBook(
    slug: $slug
  ) {
    items {
      uuid
      userUuid
      fullName
      slug
      description
      phoneNumber
      email
      address
      type
      image
      bookCategories {
        id
        uuid
        categoryUuid {
          name
        }
      }
      bookCollections {
        uuid
        collectionUuid {
          name
        }
        id
      }
    }
    hasMore
  }
}
`;
export const GET_BOOKS = gql`
query getBooks(
  $offset: Int
  $limit: Int
  $search: String
  $sortBy: String
) {
  getBooks(
    offset: $offset
    limit: $limit
    search: $search
    sortBy: $sortBy
  ) {
    items {
      uuid
      fullName
      slug
      address
      userUuid
      phoneNumber
      description
      email
      type
      image
      bookCategories {
        id
        uuid
        categoryUuid {
          name
        }
      }
      bookCollections {
        uuid
        collectionUuid {
          name
        }
        id
      }
    }
    hasMore
  }
}
`;

export const POST_CREATE_BOOK = gql`
  mutation editBook(
    $uuid: String!
    $status: String
    $slug: String
    $fullName: String!
    $userUuid: String!
    $phoneNumber: String!
    $image: String
    $address: String
    $description: String
    $email: String
    $type: String
  ) {
    addBook(
      payload: {
        uuid: $uuid
        status: $status
        slug: $slug
        fullName: $fullName
        userUuid: $userUuid
        phoneNumber: $phoneNumber
        image: $image
        address: $address
        description: $description
        email: $email
        type: $type
      }
    ) {
      fullName
      type
      email
      phoneNumber
    }
  }
`;

export const PUT_BOOK = gql`
  mutation editBook(
    $status: String
    $slug: String
    $uuid: String!
    $fullName: String!
    $userUuid: String!
    $phoneNumber: String!
    $image: String
    $address: String
    $description: String
    $email: String
    $type: String
  ) {
    editBook(
      payload: {
        status: $status
        slug: $slug
        fullName: $fullName
        uuid: $uuid
        userUuid: $userUuid
        phoneNumber: $phoneNumber
        image: $image
        address: $address
        description: $description
        email: $email
        type: $type
      }
    ) {
      fullName
      type
      email
      phoneNumber
    }
  }
`;


export const DELETE_BOOK = gql`
  mutation deleteBook(
    $uuid: String!
  ) {
    deleteBook(
      uuid: $uuid
    )
  }
`;
