// import * as React from 'react';
import { Alert, AlertTitle, Box, LinearProgress, Stack } from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { PostDetail } from '../components/PostDetail';
import { CommentsCard } from "../components/CommentsCard";
import { ReplyInputCard } from "../components/ReplyInputCard"

const GET_POST_BY_ID = gql`
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

export function Post() {

    const { postIdParameter } = useParams();

    const { loading, error, data } = useQuery(GET_POST_BY_ID, {
        variables: {
            "postId": postIdParameter
        },
    });

    if (loading) {
        return (
            <Box padding={4} sx={{ bgcolor: 'background.default', height: '100vh' }} >
                <LinearProgress variant='indeterminate' />
            </Box>
        )
    } else if (error) {
        return (
            <Box padding={4} sx={{ bgcolor: 'background.default', height: '100vh' }} >
                <Alert variant='standard' severity='error'>
                    <AlertTitle>Error!</AlertTitle>
                    {error.message}
                </Alert>
            </Box>
        )
    } else {
        return (
            <Box padding={4} sx={{ bgcolor: 'background.default', height: '100vh' }} >
                <Stack direction={'column'} spacing={2}>
                    <PostDetail data={data} />
                    <ReplyInputCard postIdParameter={postIdParameter} />
                    <CommentsCard data={data} />
                </Stack>
            </Box>
        )
    }
}

export { GET_POST_BY_ID };

export default Post;