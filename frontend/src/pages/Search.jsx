import { Box, Stack, Typography } from '@mui/material';
import FollowAccordion from '../components/FollowAccordion';
import SearchForm from '../components/SearchForm';
import { useParams } from 'react-router-dom';

export function Search() {

    const { typeParameter, queryParameter } = useParams();

    return (
        <Box padding={2}>
            <Stack direction={'column'} spacing={2}>
                <Typography variant='h4' fontWeight={800} sx={{ color: 'text.primary' }}>
                    {
                        (typeParameter && queryParameter) ?
                            `SEARCH RESULTS FOR ${typeParameter.toUpperCase()} CONTAINING "${queryParameter.toUpperCase()}"`
                            :
                            "SEARCH"

                    }
                </Typography>
                <FollowAccordion />
                <SearchForm typeParameter={typeParameter} queryParameter={queryParameter} />
            </Stack>
        </Box>
    )
}

export default Search;