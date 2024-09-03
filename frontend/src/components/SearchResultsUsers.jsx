import {
    Avatar,
    Alert,
    AlertTitle,
    Box,
    Button,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack
} from "@mui/material";
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import { useQuery } from '@apollo/client';
import { Link as RouterLink } from 'react-router-dom';
import { GET_USER_SEARCH } from "../graphql/queries/getUserSearchResults";

export const SearchResultsUsers = ({ queryParameter }) => {

    const { loading, error, data, refetch } = useQuery(GET_USER_SEARCH, {
        variables: {
            "userSearchInput": queryParameter
        },
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

        const searchResults = data.getUserSearchResults;
        const searchResultsCount = Object.keys(searchResults).length;

        return (
            <Box padding={2}>
                <Stack direction={"column"} spacing={2}>
                    {
                        searchResultsCount > 0 ?
                            <List>
                                {
                                    searchResults.map((result) => {
                                        return (
                                            <ListItem key={result.id}>
                                                <ListItemAvatar>
                                                    <Avatar variant='circle'>
                                                        {result.username[0]}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={result.username}
                                                />
                                                <Button component={RouterLink} to={`/users/${result.id}`}>
                                                    <ForwardRoundedIcon />
                                                </Button>
                                            </ListItem>
                                        )
                                    })
                                }
                            </List>
                            :
                            <Alert severity="info">
                                Nothing here...yet!
                            </Alert>
                    }
                </Stack>
            </Box >
        )
    }
}

export default SearchResultsUsers;