import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Page404 = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap:'20px', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h1">404 - Page Not Found</Typography>
            <Typography variant="h4">Sorry, The page you are looking for does not exist.
            (Unless you were looking for the 404 Page, then you found it!)</Typography>
            <Button sx={{fontSize:'20px'}} component={Link} to="/" variant="contained" color="primary">
                Go to Homepage
            </Button>
        </Box>
    );
};

export default Page404;
