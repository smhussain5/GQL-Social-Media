import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, FormLabel, FormControlLabel, RadioGroup, Radio, Stack, TextField, Typography } from "@mui/material";
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { SearchResultsUsers } from "./SearchResultsUsers";
import { SearchResultsPosts } from "./SearchResultsPosts";

export function SearchForm({ typeParameter, queryParameter }) {

    const navigateTo = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (formData) => {
        try {
            navigateTo(`/search/${formData.type.toLowerCase()}/${formData.search}`);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Card variant="outlined" >
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <FormLabel>Search</FormLabel>
                        <TextField
                            {...register("search", {
                                required: "Enter search query!"
                            })}
                            helperText={errors.search?.message}
                        />
                        <FormLabel>Type</FormLabel>
                        <RadioGroup defaultValue={"Users"} row>
                            <FormControlLabel label="Users" value={"Users"} control={<Radio />} {...register("type")} />
                            <FormControlLabel label="Posts" value={"Posts"} control={<Radio />} {...register("type")} />
                        </RadioGroup>
                        <Box>
                            <Button type="submit" startIcon={<SearchRoundedIcon />} variant="contained" disableElevation>
                                Search
                            </Button>
                        </Box>
                    </Stack>
                </CardContent>
            </Card >
            {
                typeParameter === "users" &&
                <SearchResultsUsers queryParameter={queryParameter} />
            }
            {
                typeParameter === "posts" &&
                <SearchResultsPosts queryParameter={queryParameter} />
            }
        </Box >
    )
}

export default SearchForm