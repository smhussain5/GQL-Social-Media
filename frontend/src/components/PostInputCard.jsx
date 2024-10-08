// import React from 'react'
import { useForm } from "react-hook-form";
import { Box, Button, Card, CardContent, CardActions, Grid, TextField, Typography, LinearProgress } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { GET_USER_NEWSFEED } from "../graphql/queries/getUserNewsfeedQuery";
import { CREATE_POST } from "../graphql/mutations/createPostMutation";
import { useMutation } from '@apollo/client';

const PostInputCard = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    const [createPostMutation, { data, error }] = useMutation(CREATE_POST, {
        refetchQueries: [
            GET_USER_NEWSFEED
        ],
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await createPostMutation({
                variables: {
                    "postInput": {
                        "body": formData.post
                    }
                }
            });
            reset();
        } catch (error) {
            alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
            <Card variant='outlined'>
                <Grid container alignItems={'center'}>
                    <Grid item xs={9} md={10} lg={11}>
                        <CardContent>
                            <TextField
                                label="Share your thoughts!"
                                fullWidth
                                {...register("post", {
                                    required: true,
                                    maxLength: 150
                                })}
                            />
                        </CardContent>
                    </Grid>
                    <Grid item sm={3} md={2} lg={1}>
                        <CardActions>
                            <Button variant='text' disableElevation type="submit">
                                {watch("post")?.length > 150 ?
                                    <Typography color={"error"}>
                                        {watch("post").length}
                                    </Typography> :
                                    <SendRoundedIcon />
                                }
                            </Button>
                        </CardActions>
                    </Grid>
                    <Grid item>
                    </Grid>
                </Grid>
            </Card>
            {watch("post") &&
                <LinearProgress variant="determinate" value={watch("post").length > 150 ? 100 : (watch("post")?.length * 100) / 150} color={watch("post").length > 150 ? "error" : "primary"} />
            }
        </Box>
    )
}

export default PostInputCard