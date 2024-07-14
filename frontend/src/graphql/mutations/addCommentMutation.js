import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
    mutation AddComment($replyInput: ReplyInput) {
        createReply(replyInput: $replyInput) {
            __typename
        }
    }
`;