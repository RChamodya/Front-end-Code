import {Button} from "@mui/material";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import React from "react";
import { useNavigate } from "react-router-dom";


function BackButton() {
    const navigate = useNavigate();
    return(
        <>

            <Button variant="contained" onClick={() => {
                navigate("/")}}> <ArrowBackIosOutlinedIcon/></Button>
        </>
    )
}export default BackButton;