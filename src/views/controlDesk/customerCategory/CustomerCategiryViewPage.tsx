import {Button, Grid, Typography} from "@mui/material";
import BasicTable from "../components/landingPage/table/BasicTable";
import React, {useEffect, useState} from "react";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {axiosInstance} from "../api/Store";
import {useNavigate} from "react-router-dom";

function CustomerCategoryViewPage(){



    const [categories, setCategories] = useState<Array<any>>([]);
    const [columnHeaders, setColumnHeaders] = useState<Array<string>>(["catId", "catCode", "categoryDescription", "status", "income"]);
    // const actionButtons = [
    //     { icon: < RemoveRedEyeIcon   style={{  marginLeft: -25, marginRight: -25 }} />, tooltip: "View"  },
        // { icon: <EditIcon onClick={handleEditButtonClick} style={{  marginLeft: -25, marginRight: -25 }}  />,  tooltip: "Edit" },
        // { icon: <DeleteIcon onClick={handleDeleteButtonClick}  style={{  marginLeft: -25, marginRight: -25 }}  />,  tooltip: "Delete"},
    // ];
    let navigate = useNavigate()

    function getAllCategories(){
        axiosInstance.get("/category/viewAll")
            .then((response)=>{
                // console.log(response.data.body)
                setCategories(response.data.body.map((d:any)=>({
                    catId:d.catId,
                    catCode:d.catCode,
                    categoryDescription:d.categoryDescription,
                    status:d.status?"Active" : "Inactive",
                    income:d.income
                })));
            })
            .catch((error)=>{
                console.error("error fetching data", error);
            })
    }

    useEffect(()=>{
        getAllCategories();
    },[])
    return(
        <>

            <div>
                <Typography variant="h4"   mt={5}  textAlign="center">View Customer Category</Typography>
                <Grid mt={7} ml={25} mr={2} sx={{ width: "70%", justifyContent: "center", alignItems: "center" }}>
                    {<BasicTable columnHeaders={columnHeaders} tableData={categories} actionButtons={[]} id={"catId"} />}
                </Grid>
                <Grid item xs={12} ml={25} mt={5} display="flex" justifyContent="left">
                    <Button variant="contained" onClick={()=>{navigate("/customerCategory")}}>Back</Button>
                </Grid>
            </div>


        </>
    )
}
export default CustomerCategoryViewPage;