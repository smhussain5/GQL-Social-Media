import { Avatar, Box, Card, CardContent, CardActionArea, Stack, Typography } from '@mui/material'
import { blue } from '@mui/material/colors'

export const PostCard = ({ data }) => {
    const { id, user, body, createdAt } = data

    return (
        <Box>
            <Card variant='outlined'>
                <CardActionArea href='/'>
                    <CardContent>
                        <Stack direction={'column'} spacing={2}>
                            <Stack direction={'row'} spacing={2} alignItems='center'>
                                <Avatar variant='rounded' sx={{ bgcolor: blue[500] }}>
                                    {user.username[0]}
                                </Avatar>
                                <Typography variant='body1'>
                                    {body}
                                </Typography>
                            </Stack>
                            <Typography variant='caption'>
                                {createdAt}
                            </Typography>
                        </Stack>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Box >
    )
}

export default PostCard