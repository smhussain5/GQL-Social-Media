import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

export const ProfileList = ({ data, postUser }) => {
    return (
        <Box>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar variant='circle'>
                            {postUser[0]}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={data.body} secondary={postUser} />
                    <Button component={RouterLink} to={`/posts/${data.id}`} startIcon={<AccountBoxRoundedIcon />}>
                        Post
                    </Button>
                </ListItem>
            </List>
        </Box>
    )
}

export default ProfileList