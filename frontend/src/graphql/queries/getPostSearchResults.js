import { gql } from '@apollo/client';

export const GET_POST_SEARCH = gql`
    query GetPostSearch($postSearchInput: String!) {
        getPostSearchResults(postSearchInput: $postSearchInput) {
            id
            createdAt
            body
            user {
                username
            }
        }
    }
`;