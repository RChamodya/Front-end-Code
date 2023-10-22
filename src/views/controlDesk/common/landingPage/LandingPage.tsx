import React from "react";

import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const customerCategoryImage = require("../../assets/images/1.jpg");
const LandingPage: React.FC = () => {

    let navigate = useNavigate()
    return (
        <>
        <Typography variant="h3"  ml={70} mt={5}>Control Desk</Typography>

        <Grid container spacing={2} mt={10} ml={6}>
            <Grid item xs={12} sm={6} md={2.5}>
                <Card onClick={()=>{navigate("/customerCategory")}}>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        image="" />
                    <CardContent>
                        <Typography variant="h5">Customer Category</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Card onClick={()=>{navigate("/loanAmount")}}>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        image="" />
                    <CardContent>
                        <Typography variant="h5">Loan Amount</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Card onClick={()=>{navigate("/benefit")}}>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        image="" />
                    <CardContent>
                        <Typography variant="h5">Benefit</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
                <Card onClick={()=>{navigate("/subBenefit")}}>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        image="./src/components/landingPage/1.jpg" />
                    <CardContent>
                        <Typography variant="h5">Sub Benefit</Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={2.5}>
                <Card onClick={()=>{navigate("/identifyCustomer")}}>
                    <CardMedia
                        component="img"
                        alt=""
                        height="140"
                        image="" />
                    <CardContent>
                        <Typography variant="h5">Identify Customer</Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
        </>
    );
};

export default LandingPage;
