import { gql } from '@apollo/client';

export const CREATE_POST = gql`
    mutation AddPost($postInput: PostInput) {
        createPost(postInput: $postInput) {
            __typename
        }
    }
`;