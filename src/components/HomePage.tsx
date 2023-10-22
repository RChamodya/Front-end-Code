

import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import Card from "@mui/material/Card";

const HomePage: React.FC = () => {
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="div" align="center" gutterBottom>
                Welcome to the Bank Loan System
            </Typography>

        </Container>
    );
};

export default HomePage;
