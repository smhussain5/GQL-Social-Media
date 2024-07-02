import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';

export const ProfileList = ({ data, postUser }) => {
    return (
        <Box>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar variant='circle'>
                            {postUser}
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText>
                        {data.body}
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
    )
}

export default ProfileList