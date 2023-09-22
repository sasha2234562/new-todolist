import * as React from 'react';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Button from "@mui/material/Button";
import {Box, Snackbar, SnackbarOrigin} from "@mui/material";

export  function LinearColor() {
    return (
        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
            <LinearProgress color="success" />
        </Stack>
    );
}

interface State extends SnackbarOrigin {
    open: boolean;
}

export default function PositionedSnackbar() {
    const [state, setState] = React.useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, open } = state;

    const handleClick = (newState: SnackbarOrigin) => () => {
        setState({ ...newState, open: true });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

    const buttons = (
        <React.Fragment>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={handleClick({ vertical: 'bottom', horizontal: 'center' })}>
                    Bottom-Center
                </Button>
            </Box>
        </React.Fragment>
    );

    return (
        <Box sx={{ width: 500 }}>
            {buttons}
            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            />
        </Box>
    );
}