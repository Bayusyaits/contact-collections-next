import "reflect-metadata";
import * as express from "express";
import { ApolloServer, makeExecutableSchema } from "apollo-server-express";

import { merge } from "lodash";
import { typeDefs as UserTypeDefs } from "./app/services/user/typeDefs";
import { typeDefs as CategoryTypeDefs } from "./app/services/category/typeDefs";
import { typeDefs as BookTypeDefs } from "./app/services/book/typeDefs";
import { typeDefs as CollectionTypeDefs } from "./app/services/collection/typeDefs";
import { typeDefs as PhoneNumberTypeDefs } from "./app/services/phone-number/typeDefs";
import { typeDefs as BookCollectionTypeDefs } from "./app/services/book-collection/typeDefs";
import { typeDefs as BookCategoryTypeDefs } from "./app/services/book-category/typeDefs";
import {
   Query as UserQuery,
   Mutation as UserMutations
} from "./app/services/user/resolvers";
import {
  Query as CategoryQuery,
  Mutation as CategoryMutations
} from "./app/services/category/resolvers";
import {
  Query as BookQuery,
  Mutation as BookMutations
} from "./app/services/book/resolvers";
import {
 Query as CollectionQuery,
 Mutation as CollectionMutations
} from "./app/services/collection/resolvers";
import {
  Query as BookCollectionQuery,
  Mutation as BookCollectionMutations
} from "./app/services/book-collection/resolvers";
import {
  Query as BookCategoryQuery,
  Mutation as BookCategoryMutations
} from "./app/services/book-category/resolvers";
import {
  Query as PhoneNumberQuery,
  Mutation as PhoneNumberMutations
} from "./app/services/phone-number/resolvers";
const PORT = process.env.PORT || 4003;

const startServer = async () => {
  const schema = makeExecutableSchema({
    typeDefs: [ 
      CategoryTypeDefs,
      UserTypeDefs,
      BookTypeDefs,
      CollectionTypeDefs,
      BookCollectionTypeDefs,
      BookCategoryTypeDefs,
      PhoneNumberTypeDefs
    ],
    resolvers: merge(
      {
        Query: {
          ...CategoryQuery,
          ...UserQuery,
          ...BookQuery,
          ...CollectionQuery,
          ...BookCollectionQuery,
          ...BookCategoryQuery,
          ...PhoneNumberQuery
        },
        Mutation: {
          ...CategoryMutations,
          ...UserMutations,
          ...BookMutations,
          ...CollectionMutations,
          ...BookCollectionMutations,
          ...BookCategoryMutations,
          ...PhoneNumberMutations
        }
      }
    ),
  });
  const server = new ApolloServer({ 
    schema,
    introspection: true,
    playground: true,
    tracing: true,
  });

  const app: express.Application = express();

  server.applyMiddleware({ app });

  app.listen({ port: PORT }, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  );
};

startServer();
