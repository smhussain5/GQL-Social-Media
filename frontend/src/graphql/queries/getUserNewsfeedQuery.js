import { gql } from '@apollo/client';

export const GET_USER_NEWSFEED = gql`
    query GetUserNewsfeed($userId: ID!) {
        getUserNewsfeed(userId: $userId) {
            id
            user {
                username
            }
            body
            createdAt
        }
}
`;