import { useLayoutEffect } from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Alert,
    AlertTitle,
    Avatar,
    Box,
    Button,
    LinearProgress,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Stack,
    Typography
} from "@mui/material";
import ForwardRoundedIcon from '@mui/icons-material/ForwardRounded';
import ArrowDropDownRoundedIcon from '@mui/icons-material/ArrowDropDownRounded';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { Link as RouterLink } from "react-router-dom";
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from "../graphql/queries/getAllUsers";

export function FollowAccordion() {

    const { loading, error, data, refetch } = useQuery(GET_ALL_USERS);

    useLayoutEffect(() => {
        refetch();
    });

    if (loading) {
        return (
            <Box>
                <LinearProgress variant='indeterminate' />
            </Box>
        )
    } else if (error) {
        return (
            <Box>
                <Alert variant='standard' severity='error'>
                    <AlertTitle>Error!</AlertTitle>
                    {error.message}
                </Alert>
            </Box>
        )
    } else {
        return (
            <Box>
                <Accordion variant={"outlined"} square>
                    <AccordionSummary expandIcon={<ArrowDropDownRoundedIcon />}>
                        <Stack direction={"row"} spacing={2}>
                            <AutoAwesomeRoundedIcon color={"primary"} />
                            <Typography>
                                Find some accounts to follow!
                            </Typography>
                        </Stack>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                        </Typography>
                        <List>
                            {data.getAllUsers.map((user) => {
                                return (
                                    <ListItem key={user.id}>
                                        <ListItemAvatar>
                                            <Avatar variant={"circular"}>
                                                {user.username[0]}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={user.username}
                                        />
                                        <Button component={RouterLink} to={`/users/${user.id}`}>
                                            <ForwardRoundedIcon />
                                        </Button>
                                    </ListItem>
                                )
                            })}
                        </List>
                    </AccordionDetails>
                </Accordion>
            </Box>
        )
    }


}

export default FollowAccordion;