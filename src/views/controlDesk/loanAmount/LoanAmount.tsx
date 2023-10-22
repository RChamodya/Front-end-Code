import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { axiosInstance } from "../../../api/Store";
import BasicTable from "../../../components/table/BasicTable";
import Pagination from "@mui/material/Pagination";
function LoanAmount() {
  const handleViewButtonClick = () => {
    searchParams.set("id", id);
    alert(id);

    searchParams.set("page", "view");
    navigate(`/createLoanAmount/view?${searchParams}`);
    // console.log(   "view")
  };
  const handleEditButtonClick = (id: any) => {
    console.log(id, "id");
    searchParams.set("id", id);
    searchParams.set("page", "edit");
    navigate(`/createLoanAmount/edit?${searchParams}`);
    // console.log(   "edit")
  };
  const handleDeleteButtonClick = (deleteId: any) => {
    if (deleteId) {
      axiosInstance
        .delete(`/loanAmount/delete/${deleteId}`)
        .then((response: any) => {
          alert("Loan amount deleted!");
          getLoanAmounts();
        })
        .catch((error) => {
          console.error("error fetching data", error);
        });
    }
  };

  function getLoanAmounts() {
    axiosInstance
      .get("/loanAmount/viewAll")
      .then((response) => {
        // console.log(response.data.body)
        setLoanAmounts(
          response.data.body.map((d: any) => ({
            loanId: d.loanId,
            loanCode: d.loanCode,
            loanDescription: d.loanDescription,
            loanLimit: d.loanAmount,
            validityMonth: d.isLimitValidityMonth,
            loanValidityPeriod: d.isLimitValidityMonth,
            // interestRate:d.interestRate,
            // isInterestRatePeriodMonth:d.isInterestRateValidityMonth?"Yes":"No",
            // loanLimitApplicable:d.isLoanLimitApplicable,
          })),
        );
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }
  useLayoutEffect(() => {
    getLoanAmounts();
  }, []);
  let navigate = useNavigate();
  const [id, setId] = useState<any>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [loanAmounts, setLoanAmounts] = useState<Array<any>>([]);
  const [columnHeaders, setColumnHeaders] = useState<Array<string>>([
    "Loan Code",
    "Loan Description",
    "Loan Limit",
    "Loan Amount",
  ]);
  const actionButtons = [
    {
      icon: <RemoveRedEyeIcon style={{ marginLeft: -25, marginRight: -25 }} />,
      tooltip: "View",
      action: handleViewButtonClick,
    },
    {
      icon: <EditIcon style={{ marginLeft: -25, marginRight: -25 }} />,
      tooltip: "Edit",
      action: handleEditButtonClick,
    },
    {
      icon: <DeleteIcon style={{ marginLeft: -25, marginRight: -25 }} />,
      tooltip: "Delete",
      action: handleDeleteButtonClick,
    },
  ];

  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        Loan Amount Page
      </Typography>
      <div>
        <Grid item xs={12} ml={25} mt={5} display="flex" justifyContent="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/createLoanAmount");
            }}
          >
            Create Loan AMount
          </Button>
        </Grid>
        <Grid
          mt={7}
          ml={25}
          mr={2}
          sx={{ width: "70%", justifyContent: "center", alignItems: "center" }}
        >
          {
            <BasicTable
              columnHeaders={columnHeaders}
              tableData={loanAmounts}
              actionButtons={actionButtons}
              id={"loanId"}
            />
          }
        </Grid>
        <Grid item xs={12} ml={25} mt={5} display="flex" justifyContent="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            Back
          </Button>
        </Grid>
      </div>
    </>
  );
}
export default LoanAmount;
