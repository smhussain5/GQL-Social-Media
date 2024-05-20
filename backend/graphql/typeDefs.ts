import { gql } from "graphql-tag"

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: Int!
        createdAt: String!
        posts: [Post!]
    }
    type Post {
        id: ID!
        body: String!
        createdAt: Int!
        user: User!
        userId: String!
    }
    type Query {
        getAllUsers: [User!]
        getSingleUser(userId: ID!): User
        getAllPosts: [Post!]
        getSinglePost(postId: ID!): Post
    }
    type Mutation {
        deleteSinglePost(postId: ID!): Post
    }
`;

export { typeDefs };