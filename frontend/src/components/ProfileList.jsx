import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from '@mui/material';
import React from 'react';

export const ProfileList = ({ data }) => {
    return (
        <Box>
            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar variant='rounded'>
                            {data.body[0]}
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