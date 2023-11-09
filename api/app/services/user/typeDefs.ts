// Construct a schema, using GraphQL schema language

export const typeDefs = `
  extend type Query {
    getUser(id: Int!): User
  }
  extend type Mutation {
    addUser(
      payload: PayloadAddUser
    ): User!
    editUser(payload: PayloadEditUser): User!
    deleteUser(
      userName: String!
    ): Boolean!
  }  

  input PayloadAddUser {
    firstName: String!, 
    password: String!,
    lastName: String, 
    birthdayDate: String!
  }
  
  input PayloadEditUser {
    firstName: String, 
    password: String!,
    lastName: String, 
    birthdayDate: String
    userName: String!
  }

  type User {
    id: Int!
    firstName: String!
    lastName: String!
    birthdayDate: String!
    userName: String!
  }
`;
