import { gql } from "graphql-tag"

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
        posts: [Post!]
    }
    type Post {
        id: ID!
        body: String!
        user: User!
        userId: String!
    }
    type Query {
        getUsers: [User!]
        getPosts: [Post!]
    }
`;

export { typeDefs };