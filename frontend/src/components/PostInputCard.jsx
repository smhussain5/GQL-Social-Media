// import React from 'react'
import { Box, Button, Card, CardContent, CardActions, Grid, TextField } from '@mui/material';
import SendRoundedIcon from '@mui/icons-material/SendRounded';

const PostInputCard = () => {
    return (
        <Box>
            <Card variant='outlined'>
                <Grid container alignItems={'center'}>
                    <Grid item xs={10}>
                        <CardContent>
                            <TextField
                                label="Share your thoughts!"
                                fullWidth
                            />
                        </CardContent>
                    </Grid>
                    <Grid item xs={2}>
                        <CardActions>
                            <Button variant='text' disableElevation onClick={() => { alert("Clicked!") }}>
                                <SendRoundedIcon />
                            </Button>
                        </CardActions>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    )
}

export default PostInputCard