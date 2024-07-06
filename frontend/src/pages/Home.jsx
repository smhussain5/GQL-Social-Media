// TODO: USE GRID TO LAYOUT HOMEPAGE
import { Alert, AlertTitle, Box, LinearProgress, Stack } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import PostCard from '../components/PostCard'
import PostInputCard from '../components/PostInputCard';
import { useLayoutEffect } from 'react';

const GET_ALL_POSTS = gql`
    query {
        getAllPosts {
            id
            user {
                username
            }
            body
            createdAt
        }
    }
`;

export function Home() {

    const { loading, error, data, refetch } = useQuery(GET_ALL_POSTS);

    useLayoutEffect(() => {
        refetch();
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
                <Stack spacing={2}>
                    <PostInputCard />
                    <Stack direction={'column'} spacing={2}>
                        {data.getAllPosts.map((post) => (
                            <PostCard key={post.id} data={post} />
                        ))}
                    </Stack>
                </Stack>
            </Box>
        )
    }
}

export { GET_ALL_POSTS };

export default Home;