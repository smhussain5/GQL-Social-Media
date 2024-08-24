import { gql } from '@apollo/client';

export const GET_USER_SEARCH = gql`
    query GetUserSearch($userSearchInput: String!) {
        getUserSearchResults(userSearchInput: $userSearchInput) {
            id
            username
        }
    }
`;