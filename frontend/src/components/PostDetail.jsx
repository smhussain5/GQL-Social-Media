import { Box, Card, CardContent, Stack, Typography } from '@mui/material';

export const PostDetail = ({ data }) => {
    return (
        <Box>
            <Card variant='outlined'>
                <CardContent>
                    <Stack direction={'column'} spacing={2}>
                        <Typography variant='body1'>
                            {data.getSinglePost.id}
                        </Typography>
                        <Typography variant='body1'>
                            {data.getSinglePost.body}
                        </Typography>
                        <Typography variant='body1'>
                            {data.getSinglePost.user.username}
                        </Typography>
                        <Typography variant='caption'>
                            {data.getSinglePost.createdAt}
                        </Typography>
                    </Stack>
                </CardContent>
            </Card>
        </Box >
    )
}

export default PostDetail