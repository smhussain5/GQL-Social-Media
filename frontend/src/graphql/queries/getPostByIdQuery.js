import { gql } from '@apollo/client';

export const GET_POST_BY_ID = gql`
    query GetPostById($postId: ID!) {
        getSinglePost(postId: $postId) {
            id
            body
            user {
                id
                username
            }
            createdAt
            likedBy {
                id
                username
            }
            replies {
                id
                body
                createdAt
                user {
                    id
                    username
                }
            }
        }
    }
`;