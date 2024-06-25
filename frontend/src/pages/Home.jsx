// TODO: USE GRID TO LAYOUT HOMEPAGE

import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Alert, AlertTitle, Box, Grid, LinearProgress, Stack, Typography } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import PostCard from '../components/PostCard'
import PostInputCard from '../components/PostInputCard';

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

    const { loading, error, data } = useQuery(GET_ALL_POSTS);

    const { user } = useContext(AuthContext);

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

export default Home