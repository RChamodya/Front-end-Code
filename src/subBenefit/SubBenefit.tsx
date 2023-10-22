import { Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosInstance } from "../api/Store";
import { useLocation, useNavigate } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BasicTable from "../components/table/BasicTable";

function SubBenefit() {
  const handleViewButtonClick = (id: any) => {
    searchParams.set("subId", id);
    alert(id);
    searchParams.set("page", "view");
    navigate(`/benefit/subBenefit/view?${searchParams}`);
    // console.log(   "view")
  };
  const location = useLocation();
  const handleEditButtonClick = (id: any) => {
    console.log(id, "id");
    searchParams.set("subId", id);
    searchParams.set("page", "edit");
    navigate(`/benefit/subBenefit/edit/?${searchParams}`);
    // console.log(   "edit")
  };
  const handleDeleteButtonClick = (deleteId: any) => {
    if (deleteId) {
      axiosInstance
        .delete(`/subBenefit/delete/${deleteId}`)
        .then((response: any) => {
          alert("Loan amount deleted!");
          getSubBenefits();
        })
        .catch((error) => {
          console.error("error fetching data", error);
        });
    }
  };
  const [id, setId] = useState<any>("");
  useEffect(() => {
    const id = searchParams.get("id");
    if (id) {
      setId(id);
    }
  }, [location]);
  function getSubBenefits() {
    axiosInstance
      .get(`subBenefit/getSubBenefitByMainBenefitID/${id}`)
      .then((response) => {
        // console.log(response.data.body)
        setSubBenefits(
          response.data.data.map((d: any) => ({
            subBenefitId: d.subBenefitId,
            subBenefitCode: d.subBenefitCode,
            subBenefitName: d.subBenefitName,
            status: d.status ? "Active" : "Inactive",
          })),
        );
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }

  useEffect(() => {
    if (id) {
      getSubBenefits();
    }
  }, [id]);
  let navigate = useNavigate();

  const searchParams = new URLSearchParams(location.search);

  const [subBenefits, setSubBenefits] = useState<Array<any>>([]);
  const [columnHeaders, setColumnHeaders] = useState<Array<string>>([
    "Sub Benefit Code",
    "Sub Benefit Name",
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
  ];
  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        Sub Benefit Page
      </Typography>
      <hr />
      <form className="create-form">
        <Grid item xs={12} ml={25} display="flex" justifyContent="left">
          <Button
            variant="contained"
            onClick={() => {
              searchParams.set("mainBenefitId", id);
              navigate(`/benefit/subBenefit/create?${searchParams}`);
            }}
          >
            Create Sub Benefit
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
              tableData={subBenefits}
              actionButtons={actionButtons}
              id={"subBenefitId"}
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
      </form>
    </>
  );
}
export default SubBenefit;
