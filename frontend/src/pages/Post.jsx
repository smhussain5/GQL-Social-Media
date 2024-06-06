// import * as React from 'react';
import { Alert, AlertTitle, Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { PostDetail } from '../components/PostDetail';

const GET_POST_BY_ID = gql`
    query GetPostById($postId: ID!){
        getSinglePost(postId: $postId) {
            id
            body
            user {
                id
                username
            }
            createdAt
            likedBy {
                username
            }
            replies {
                body
                userId
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

    console.log(data);

    if (loading) {
        return (
            <Box padding={4}>
                <LinearProgress variant='indeterminate' />
            </Box>
        )
    } else if (error) {
        return (
            <Box padding={4}>
                <Alert variant='standard' severity='error'>
                    <AlertTitle>Error!</AlertTitle>
                    {error.message}
                </Alert>
            </Box>
        )
    } else {
        return (
            <Box padding={4}>
                <Stack direction={'column'} spacing={2}>
                    <Typography>
                        {JSON.stringify(data.getSinglePost)}
                    </Typography>
                    <PostDetail data={data} />
                </Stack>
            </Box>
        )
    }
}

export default Post