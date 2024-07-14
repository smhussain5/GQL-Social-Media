import { gql } from '@apollo/client';

export const DELETE_REPLY = gql`
    mutation DeleteReply($replyId: ID!) {
        deleteReply(replyId: $replyId)
    }
`;