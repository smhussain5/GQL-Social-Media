// import React from 'react';
import { useForm } from "react-hook-form";
import { Box, Button, Card, CardContent, CardActions, Grid, TextField, Typography, LinearProgress } from "@mui/material";
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { GET_POST_BY_ID } from '../graphql/queries/getPostByIdQuery';
import { ADD_COMMENT } from "../graphql/mutations/addCommentMutation";
import { useMutation } from '@apollo/client';

export const ReplyInputCard = ({ postIdParameter }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset
    } = useForm();

    const [addPostMutation, { data, error }] = useMutation(ADD_COMMENT, {
        refetchQueries: [
            GET_POST_BY_ID
        ],
    });

    const onSubmit = async (formData) => {
        try {
            const { data } = await addPostMutation({
                variables: {
                    "replyInput": {
                        "body": formData.comment,
                        "postId": postIdParameter
                    }
                }
            });
            reset();
        } catch (error) {
            alert(JSON.stringify(error.graphQLErrors[0].extensions.errors, null, 2));
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off" >
            <Card variant='outlined'>
                <Grid container alignItems={'center'}>
                    <Grid item xs={11}>
                        <CardContent>
                            <TextField
                                label="Share your thoughts!"
                                fullWidth
                                {...register("comment", {
                                    required: true,
                                    maxLength: 150
                                })}
                            />
                        </CardContent>
                    </Grid>
                    <Grid item xs={1}>
                        <CardActions>
                            <Button variant='text' disableElevation type="submit">
                                {watch("comment")?.length > 150 ?
                                    <Typography color={"error"}>
                                        {watch("comment").length}
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
            {
                watch("comment") &&
                <LinearProgress variant="determinate" value={watch("comment").length > 150 ? 100 : (watch("comment")?.length * 100) / 150} color={watch("comment").length > 150 ? "error" : "primary"} />
            }
        </Box >
    )
}

export default ReplyInputCard