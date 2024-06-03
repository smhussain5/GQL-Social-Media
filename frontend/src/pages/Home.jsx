// TODO: USE GRID TO LAYOUT HOMEPAGE

// import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { gql, useQuery } from '@apollo/client';
import PostCard, { } from '../components/PostCard'

const GET_ALL_POSTS = gql`
    query GetAllPosts {
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

    if (loading) {
        return (
            <Box padding={4}>
                <Stack direction={'column'}>
                    <Typography>
                        LOADING...
                    </Typography>
                </Stack>
            </Box>
        )
    } else if (error) {
        return (
            <Box padding={4}>
                <Stack direction={'column'}>
                    <Typography variant='h4' fontWeight={800}>
                        ERROR
                    </Typography>
                    <Typography>
                        {error.message}
                    </Typography>
                </Stack>
            </Box>
        )
    } else {
        return (
            <Box padding={4}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Box>
                        <Typography>
                            Hey
                        </Typography>
                    </Box>
                    <Stack direction={'column'} spacing={2}>
                        <Box>
                            <Stack direction={'column'} spacing={2}>
                                {data.getAllPosts.map((post) => (
                                    <PostCard key={post.id} data={post} />
                                ))}
                            </Stack>
                        </Box>
                    </Stack>
                </Stack>
            </Box>
        )
    }

}

export default Home