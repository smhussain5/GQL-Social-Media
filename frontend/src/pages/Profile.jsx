// import * as React from 'react';
import { Alert, AlertTitle, Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { ProfileDetail } from '../components/ProfileDetail';

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        getSingleUser(userId: $userId) {
            id
            username
            createdAt
            posts {
                id
                body
            }
            likedPosts {
                id
                body
            }
            followers {
                id
                username
            }
            following {
                id
                username
            }
        }
    }
`;

export function Profile() {

    const { userIdParameter } = useParams();

    const { loading, error, data } = useQuery(GET_USER_BY_ID, {
        variables: {
            "userId": userIdParameter
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
                <ProfileDetail data={data} />
                <Typography>
                    {JSON.stringify(data.getSingleUser)}
                </Typography>
            </Box>
        )
    }
}

export { GET_USER_BY_ID };

export default Profile;