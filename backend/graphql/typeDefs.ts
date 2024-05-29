import { gql } from "graphql-tag"

const typeDefs = gql`
    type User {
        id: ID!
        username: String!
        email: String!
        password: Int!
        token: String!
        createdAt: String!
        posts: [Post!]
        likedPosts: [Post!]
        followers: [User!]
        following: [User!]
        replies: [Reply!]
    }
    type Post {
        id: ID!
        body: String!
        createdAt: String!
        user: User
        userId: String!
        likedBy: [User!]
        replies: [Reply!]
    }
    type Reply {
        id: ID!
        body: String!
        createdAt: String!
        post: Post
        postId: String!
        user: User
        userId: String!
    }
    type Query {
        getAllUsers: [User!]
        getSingleUser(userId: ID!): User
        getAllPosts: [Post!]
        getSinglePost(postId: ID!): Post
    }
    type Mutation {
        loginUser(loginInput: LoginInput): User!
        registerUser(registrationInput: RegistrationInput): User!
        createPost(postInput: PostInput): Post!
        deleteSinglePost(postId: ID!): String!
        likePost(postId: ID!): String!
        followUser(userId: ID!): String!
        createReply(replyInput: ReplyInput): Reply!
    }
    input RegistrationInput {
        username: String!
        password: String!
        confirmPassword: String!
        email: String!
    }
    input LoginInput {
        username: String!
        password: String!
    }
    input PostInput {
        body: String!
    }
    input ReplyInput {
        postId: String!
        body: String!
    }
`;

export { typeDefs };