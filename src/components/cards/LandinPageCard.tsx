import {Card, CardContent, CardMedia, Typography} from "@mui/material";
import React from "react";
import {useNavigate} from "react-router-dom";
 export interface  LndngPgCrdPrps {
    id:number;
    path:string;
    image?:string;
    title:string;
}

function LandinPageCard({path,image,title}:LndngPgCrdPrps){

    const navigate = useNavigate();

    return(
        <>
            <Card onClick={()=>{navigate(path)}}>
                <CardMedia
                    component="img"
                    alt=""
                    height="140"
                    image={image} />
                <CardContent>
                    <Typography variant="h5"> {title}</Typography>
                </CardContent>
            </Card>

        </>
    )
}
export default LandinPageCard;