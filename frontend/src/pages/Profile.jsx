// import * as React from 'react';
import { Alert, AlertTitle, Box, LinearProgress, Stack, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import { ProfileDetail } from '../components/ProfileDetail'

const GET_USER_BY_ID = gql`
    query GetUserById($userId: ID!) {
        getSingleUser(userId: $userId) {
            id
            username
            email
            createdAt
            posts {
                id
            }
            likedPosts {
                id
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
                <ProfileDetail data={data} />
                <Typography>
                    {JSON.stringify(data.getSingleUser)}
                </Typography>
            </Box>
        )
    }
}

export default Profile