import React from "react";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div>
            <h1>Home</h1>
            <Link to="/customer-categories">
                <Button variant="contained">View</Button>
            </Link>
        </div>
    );
};

export default Home;
