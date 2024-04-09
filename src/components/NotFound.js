import React from "react";
import { Typography, Box, Button } from "@mui/material"

const NotFound = () => {
    return (
        <Box sx={{ textAlign: 'center', marginTop: 30 }}>
            <Typography variant="h6">404: Not Found</Typography>
            <Button href="/" variant="contained">Go back home?</Button>
        </Box>
    );
}

export default NotFound;