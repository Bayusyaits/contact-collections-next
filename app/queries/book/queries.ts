import gql from "graphql-tag";

export const GET_LIST_BOOKS = gql`
query getListBooks(
  $slug: String
  $orderBy: String
) {
  getListBooks(
    slug: $slug
    orderBy: $orderBy
  ) {
    uuid
    userUuid
    fullName
    slug
    address
    description
    email
    type
    image
    phoneNumbers {
      uuid
      phoneNumber
      id
    }
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
      phoneNumbers {
        uuid
        phoneNumber
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
      phoneNumbers {
        uuid
        phoneNumber
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
  $slug: String
  $search: String
  $orderBy: String
) {
  getBooks(
    offset: $offset
    limit: $limit
    slug: $slug
    search: $search
    orderBy: $orderBy
  ) {
    items {
      uuid
      fullName
      slug
      address
      userUuid
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
      phoneNumbers {
        uuid
        phoneNumber
        id
      }
    }
    offset
    page
    limit
    total
    hasMore
  }
}
`;

export const POST_CREATE_BOOK = gql`
  mutation addBook(
    $status: String
    $slug: String
    $fullName: String!
    $userUuid: String!
    $phoneNumbers: [String!]
    $image: String
    $address: String
    $description: String
    $email: String
    $type: String
  ) {
    addBook(
      payload: {
        status: $status
        slug: $slug
        fullName: $fullName
        userUuid: $userUuid
        phoneNumbers: $phoneNumbers
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
    $phoneNumbers: [PayloadPhoneNumber!]
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
        phoneNumbers: $phoneNumbers
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
