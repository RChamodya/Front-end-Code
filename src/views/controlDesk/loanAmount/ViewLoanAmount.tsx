import {Button, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {axiosInstance} from "../../../api/Store";
import BasicTable from "../../../components/table/BasicTable";

function ViewLoanAmount(){

    const [loanAmounts, setLoanAmounts] = useState<Array<any>>([]);
    const [columnHeaders, setColumnHeaders] = useState<Array<string>>(["loanCode", "loanDescription", "loanLimit", " validityMonth", "loanValidityPeriod"]);
    let navigate = useNavigate()


    function getLoanAmounts(){
        axiosInstance.get("/loanAmount/viewAll")
            .then((response)=>{
                // console.log(response.data.body)
                setLoanAmounts(response.data.body.map((d:any)=>({
                    loanCode:d.loanCode,
                    loanDescription:d.loanDescription,
                    loanLimit:d.loanLimit,
                    validityMonth:d.validityMonth,
                    loanValidityPeriod:d.loanValidityPeriod,
                    interestRate:d.interestRate,
                    isInterestRatePeriodMonth:d.intereisInterestRatePeriodMonthstRate,
                    loanLimitApplicable:d.loanLimitApplicable,
                })));
            })
            .catch((error)=>{
                console.error("error fetching data", error);
            })
    }

    useEffect(()=>{
        getLoanAmounts();
    },[])

    return(
        <>
            <Typography variant="h4"   mt={5}  textAlign="center">View Loan Amount</Typography>
            <div>


                <Grid mt={7} ml={25} mr={2} sx={{ width: "70%", justifyContent: "center", alignItems: "center" }}>
                    {<BasicTable  columnHeaders={columnHeaders} tableData={loanAmounts}
                                  actionButtons={[]} id={"loanId"}  />}
                </Grid>
                <Grid item xs={12} ml={25} mt={5} display="flex" justifyContent="left">
                    <Button variant="contained" onClick={()=>{navigate("/loanAmount")}}>Back</Button>
                </Grid>

            </div>
        </>
    )

}

export default ViewLoanAmount;