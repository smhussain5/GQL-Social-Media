import { gql } from '@apollo/client';

export const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        getSingleUser(userId: $userId) {
            id
            username
            createdAt
            posts {
                id
                createdAt
                body
                user {
                    username
                }
            }
            likedPosts {
                id
                createdAt
                body
                user {
                    username
                }
            }
            followers {
                id
                username
            }
            following {
                id
                username
            }
        }
    }
`;