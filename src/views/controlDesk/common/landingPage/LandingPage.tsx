import React from "react";
import LandinPageCard, {
  LndngPgCrdPrps,
} from "../../../../components/cards/LandinPageCard";
import { Grid, Card, CardContent, Typography, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const customerCategoryImage = require("../../../../assets/images/1.jpg");
const loanIag = require("../../../../assets/images/3.jpg");
const benefitImg = require("../../../../assets/images/2.jpg");
const idntfyCustomerImg = require("../../../../assets/images/2.jpg");

const lndngPgItms: LndngPgCrdPrps[] = [
  {
    id: 1,
    path: "/customerCategory",
    image: customerCategoryImage,
    title: "Customer Category",
  },
  {
    id: 2,
    path: "/benefit",
    image: benefitImg,
    title: "Benefit",
  },
  {
    id: 3,
    path: "/loanAmount",
    image: loanIag,
    title: "Loan Amount",
  },
  {
    id: 4,
    path: "/identifyCustomer",
    image: idntfyCustomerImg,
    title: "Identify Customer",
  },
  {
    id: 5,
    path: "/benefitAllocation",
    image: idntfyCustomerImg,
    title: "Benefit Allocation",
  },
];
const LandingPage: React.FC = () => {
  let navigate = useNavigate();
  return (
    <>
      <Typography variant="h3" ml={70} mt={5}>
        Control Desk
      </Typography>

      <Grid container spacing={2} mt={10} ml={14}>
        {lndngPgItms?.map((card: LndngPgCrdPrps) => (
          <>
            <Grid item xs={12} sm={6} md={2.5}>
              <LandinPageCard
                id={1}
                path={card.path}
                title={card.title}
                image={card.image}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
};

export default LandingPage;
