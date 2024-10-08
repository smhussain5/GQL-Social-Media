import { Alert, AlertTitle, Box, LinearProgress, Stack } from '@mui/material';
import { GET_USER_NEWSFEED } from '../graphql/queries/getUserNewsfeedQuery';
import { useQuery } from '@apollo/client';
import PostCard from '../components/PostCard'
import PostInputCard from '../components/PostInputCard';
import FollowAccordion from '../components/FollowAccordion';
import { useContext, useLayoutEffect } from 'react';
import AuthContext from "../context/AuthContext";

export function Home() {

    const { userContext } = useContext(AuthContext);

    const { loading, error, data, refetch } = useQuery(GET_USER_NEWSFEED, {
        variables: {
            "userId": userContext.id
        },
    });

    useLayoutEffect(() => {
        refetch();
    });

    if (loading) {
        return (
            <Box padding={2}>
                <LinearProgress variant='indeterminate' />
            </Box>
        )
    } else if (error) {
        return (
            <Box padding={2}>
                <Alert variant='standard' severity='error'>
                    <AlertTitle>Error!</AlertTitle>
                    {error.message}
                </Alert>
            </Box>
        )
    } else {
        return (
            <Box padding={2}>
                <Stack spacing={2}>
                    <PostInputCard />
                    <FollowAccordion />
                    <Stack direction={'column'} spacing={2}>
                        {data.getUserNewsfeed.map((post) => (
                            <PostCard key={post.id} data={post} />
                        ))}
                    </Stack>
                </Stack>
            </Box>
        )
    }
}

export default Home;