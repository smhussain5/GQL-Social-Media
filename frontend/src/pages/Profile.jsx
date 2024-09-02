// import * as React from 'react';
import {
    Alert,
    AlertTitle,
    Box,
    LinearProgress
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import { useQuery } from '@apollo/client';
import { ProfileDetail } from '../components/ProfileDetail';
import { GET_USER_BY_ID } from "../graphql/queries/getUserByIdQuery";

export function Profile() {

    const { userIdParameter } = useParams();

    const { loading, error, data, refetch } = useQuery(GET_USER_BY_ID, {
        variables: {
            "userId": userIdParameter
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
                <ProfileDetail data={data} />
            </Box>
        )
    }
}

export default Profile;