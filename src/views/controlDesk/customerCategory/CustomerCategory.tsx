
                import React, { useState, useEffect } from "react";
                import axios from "axios";
                import BasicTable from "../components/landingPage/table/BasicTable";
                import {Button, Grid, Typography} from "@mui/material";
                import {axiosInstance} from "../api/Store";
                import {Simulate} from "react-dom/test-utils";
                import error = Simulate.error;
                import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
                import EditIcon from '@mui/icons-material/Edit';
                import DeleteIcon from '@mui/icons-material/Delete';
                import {useLocation, useNavigate} from "react-router-dom";
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


                    const handleViewButtonClick = () =>{
                        navigate("/viewCustomerCategory")
                        console.log(   "view")
                    }
                    const handleEditButtonClick = (id:any) =>{
                        console.log(id,"id")
                        searchParams.set("id",id)
                        navigate(`/editCustomerCategory?${searchParams}`)
                        console.log(   "edit")
                    }
                    const handleDeleteButtonClick = (deleteId:any) =>{

                        if (deleteId){
                            axiosInstance.delete(`/category/delete/${deleteId}`)
                                .then((response: any) => {
                                    alert("category deleted!");
                                    getAllCategories();
                                })
                                .catch((error)=>{
                                    console.error("error fetching data", error);
                                })
                        }

                    }
                    let navigate = useNavigate();
                    // const [id, setId] = useState<any>("");
                    const location = useLocation();
                    const searchParams = new URLSearchParams(location.search);
                    const [categories, setCategories] = useState<Array<any>>([]);
                    const [columnHeaders, setColumnHeaders] = useState<Array<string>>(["catId", "catCode", "categoryDescription", "status", "income"]);
                    const actionButtons = [
                        { icon: < RemoveRedEyeIcon   style={{  marginLeft: -25, marginRight: -25 }} />, tooltip: "View", action:handleViewButtonClick },
                        { icon: <EditIcon  style={{  marginLeft: -25, marginRight: -25 }}  />,  tooltip: "Edit", action:handleEditButtonClick },
                        { icon: <DeleteIcon   style={{  marginLeft: -25, marginRight: -25 }}  />,  tooltip: "Delete", action:handleDeleteButtonClick },
                    ];

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
                    return (
                        <div>
                            <Grid item xs={12} ml={25} mt={5} display="flex" justifyContent="left">
                                <Button variant="contained" onClick={()=>{navigate("/createCustomerCategory")}}>Create Category</Button>
                            </Grid>
                            <Typography variant="h4"   mt={5}  textAlign="center">Customer Category</Typography>
                            <Grid mt={7} ml={25} mr={2} sx={{ width: "70%", justifyContent: "center", alignItems: "center" }}>
                                {<BasicTable  columnHeaders={columnHeaders} tableData={categories}
                                             actionButtons={actionButtons} id={"catId"}  />}
                            </Grid>
                            <Grid item xs={12} ml={25} mt={5} display="flex" justifyContent="left">
                                <Button variant="contained" onClick={()=>{navigate("/")}}>Back</Button>
                            </Grid>

                        </div>
                    );

                }
                export default CustomerCategory;
