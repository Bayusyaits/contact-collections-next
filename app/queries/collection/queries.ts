import gql from "graphql-tag";

export const POST_CREATE_COLLECTION = gql`
  mutation postCreateCollection(
    $id: String!
    $slug: String!
    $name: String!
    $image: String!
    $isActive: Boolean!
    $type: String!
  ) {
    postCreateCollection(
      id: $id
      slug: $slug
      name: $name
      type: $type
      isActive: $isActive
      image: $image
    ) {
      id
      name
      type
      isActive
      slug
      image
    }
  }
`;
export const GET_LIST_COLLECTIONS = gql`
  query getListCollections(
    $slug: String
    $sortBy: String
  ) {
    getListCollection(
      slug: $slug,
      sortBy: $sortBy
    ) {
      uuid
      name
      slug
      type
      image
    }
  }
`;
