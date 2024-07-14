import { gql } from '@apollo/client';

export const DELETE_POST = gql`
    mutation DeletePost($postId: ID!) {
        deleteSinglePost(postId: $postId)
    }
`;