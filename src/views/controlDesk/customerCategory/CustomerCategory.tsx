import React, { useState, useEffect } from "react";
import axios from "axios";
import BasicTable from "../../../components/table/BasicTable";
import { Button, Grid, IconButton, Typography } from "@mui/material";
import { axiosInstance } from "../../../api/Store";
import { Simulate } from "react-dom/test-utils";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import BackButton from "../../../components/button/BackButton";

interface CustomerCategory {
  catId: number;
  catCode: string;
  categoryDescription: string;
  status: boolean;
  specializedCustomer: boolean;
  ageGreaterThan18: boolean;
  creditScore: number;
  income: number;
  isDeleted: boolean;
}

const CustomerCategory: React.FC = () => {
  const handleViewButtonClick = (id: any) => {
    searchParams.set("id", id);
    searchParams.set("page", "view");
    navigate(`/customerCategory/view/?${searchParams}`);
  };
  const handleEditButtonClick = (id: any) => {
    searchParams.set("id", id);
    searchParams.set("page", "edit");
    navigate(`/customerCategory/edit/?${searchParams}`);
  };
  const handleDeleteButtonClick = (deleteId: any) => {
    if (deleteId) {
      axiosInstance
        .delete(`/category/delete/${deleteId}`)
        .then((response: any) => {
          alert("Customer Category deleted!");
          getAllCategories();
        })
        .catch((error) => {
          console.error("error fetching data", error);
        });
    }
  };
  let navigate = useNavigate();
  // const [id, setId] = useState<any>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [categories, setCategories] = useState<Array<any>>([]);
  const [columnHeaders, setColumnHeaders] = useState<Array<string>>([
    "catId",
    "catCode",
    "categoryDescription",
    "status",
    "income",
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

  function getAllCategories() {
    axiosInstance
      .get("/category/viewAll")
      .then((response) => {
        setCategories(
          response.data.data.map((d: any) => ({
            catId: d.catId,
            catCode: d.catCode,
            categoryDescription: d.categoryDescription,
            status: d.status ? "Active" : "Inactive",
            income: d.income,
          })),
        );
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }

  useEffect(() => {
    console.log("data:", categories);
    getAllCategories();
  }, []);

  return (
    <div>
      <Typography variant="h4" mt={5} textAlign="center">
        Customer Category
      </Typography>
      <hr />

      <Grid container pl={25} pr={25}>
        <Grid item xs={6} md={6} mt={5} display="flex" justifyContent="left">
          {/*<Button variant="contained" onClick={() => {*/}
          {/*    navigate("/")}}> <ArrowBackIosOutlinedIcon/></Button>*/}
          <BackButton />
        </Grid>
        <Grid item xs={6} md={6} mt={5} display="flex" justifyContent="right">
          <Button
            variant="contained"
            onClick={() => {
              navigate("/customerCategory/create");
            }}
          >
            Create Category
          </Button>
        </Grid>
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
            tableData={categories}
            actionButtons={actionButtons}
            id={"catId"}
          />
        }
      </Grid>
    </div>
  );
};
export default CustomerCategory;
