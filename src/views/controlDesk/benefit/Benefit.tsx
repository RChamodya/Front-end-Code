import { axiosInstance } from "../../../api/Store";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Grid, Typography } from "@mui/material";
import BasicTable from "../../../components/table/BasicTable";
import AddBoxIcon from "@mui/icons-material/AddBox";

function Benefit() {
  const handleViewButtonClick = (id: any) => {
    searchParams.set("id", id);
    alert(id);
    searchParams.set("page", "view");
    navigate(`/benefit/view?${searchParams}`);
    // console.log(   "view")
  };
  const handleEditButtonClick = (id: any) => {
    console.log(id, "id");
    searchParams.set("id", id);
    searchParams.set("page", "edit");
    navigate(`/benefit/edit?${searchParams}`);
    // console.log(   "edit")
  };

  const handleAddButtonClick = (id: any) => {
    searchParams.set("id", id);
    // searchParams.set("page", "view");
    navigate(`/benefit/subBenefit?${searchParams}`);
  };

  const handleDeleteButtonClick = (deleteId: any) => {
    if (deleteId) {
      axiosInstance
        .delete(`/mainBenefit/delete/${deleteId}`)
        .then((response: any) => {
          alert("Loan amount deleted!");
          getMainBenefits();
        })
        .catch((error) => {
          console.error("error fetching data", error);
        });
    }
  };

  function getMainBenefits() {
    axiosInstance
      .get("/mainBenefit/viewAll")
      .then((response) => {
        // console.log(response.data.body)
        setMainBenefits(
          response.data.data.map((d: any) => ({
            mainBenefitId: d.mainBenefitId,
            mainBenefitCode: d.mainBenefitCode,
            mainBenefitName: d.mainBenefitName,
            status: d.status ? "Active" : "Inactive",
          }))
        );
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }
  useEffect(() => {
    getMainBenefits();
  }, []);
  let navigate = useNavigate();
  // const [id, setId] = useState<any>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [mainBenefits, setMainBenefits] = useState<Array<any>>([]);
  const [columnHeaders, setColumnHeaders] = useState<Array<string>>([
    "Main Benefit Id",
    "Code",
    "Benefit Name",
    "Status",
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
    {
      icon: <AddBoxIcon style={{ marginLeft: -25, marginRight: -25 }} />,
      tooltip: "Add Sub Benefit",
      action: handleAddButtonClick,
    },
  ];
  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        Main Benefit Page
      </Typography>
      <div>
        <Grid item xs={12} ml={25} mt={5} display="flex" justifyContent="left">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/createMainBenefit");
            }}
          >
            Create Main Benefit
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
              tableData={mainBenefits}
              actionButtons={actionButtons}
              id={"mainBenefitId"}
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

export default Benefit;
