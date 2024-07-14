import { gql } from '@apollo/client';

export const LIKE_POST = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId)
    }
`;