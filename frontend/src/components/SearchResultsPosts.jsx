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
import { GET_POST_SEARCH } from '../graphql/queries/getPostSearchResults';

export const SearchResultsPosts = ({ queryParameter }) => {

    const { loading, error, data, refetch } = useQuery(GET_POST_SEARCH, {
        variables: {
            "postSearchInput": queryParameter
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

        const searchResults = data.getPostSearchResults;
        const searchResultsCount = Object.keys(searchResults).length;

        return (
            <Box padding={2} >
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
                                                        {result.user.username[0]}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={result.body}
                                                />
                                                <Button component={RouterLink} to={`/posts/${result.id}`}>
                                                    <ForwardRoundedIcon color={"secondary"} />
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

export default SearchResultsPosts;