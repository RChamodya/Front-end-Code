import {Button, Grid, Typography} from "@mui/material";
import React, {useState} from "react";
import * as Yup from "yup";
import {axiosInstance} from "../api/Store";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormTextField from "../components/textField/FormTextField";
import FormSwitchField from "../components/switch/FormSwitchField";

function CreateLoanAmount(){



    const commonError = "Field is required";
    const validationSchema = Yup.object().shape({
        loanId: Yup.string().required(commonError),
        loanCode: Yup.string().required(commonError),
        loanDescription: Yup.string().required(commonError),
        isActive:  Yup.boolean(),
        loanLimit:  Yup.string().required(commonError),
        interestRate: Yup.string().required(commonError),
        isInterestRatePeriodMonth:Yup.string().required(commonError),
        loanLimitApplicable:Yup.boolean(),
        limitValidityPeriodApplicable: Yup.boolean(),
        interestRateApplicable: Yup.string().required(commonError),
        interestRateValidityPeriodApplicable:Yup.boolean(),
        loanAmount:Yup.string().required(commonError),
        isDeleted: Yup.boolean()

    });


    const createLoanAmount = async (payload: any) => {
        try {
            const res = await axiosInstance.post(`/category/save`, payload);
            if (res.data?.status === 201) {
                setloanID(res.data?.data?.shopId);
                // notify.success(res.data?.message);
                navigate(-1);
            }
        } catch (error: any) {
            console.error(error);
            // notify.error(error.response?.data?.message);
        }
    };
    const [loanID, setloanID] = useState<number>(0);
    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState<any>({

        loanId: "",
        loanCode: "",
        loanDescription: "",
        isActive: false,
        loanLimit:  "",
        interestRate: "",
         // isInterestRatePeriodMonth:"",
        loanLimitApplicable:false,
        limitValidityPeriodApplicable: false,
        interestRateApplicable: "",
        interestRateValidityPeriodApplicable:false,
        loanAmount:"",
        isDeleted: false
    });
    const submitButtonControl = () => {
        console.log("Submit button clicked");
        createLoanAmount(getValues());
        navigate("/customerCategory");
    };


    const {
        register,
        handleSubmit,
        reset,
        getValues,
        setValue,
        control,
        watch,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(validationSchema),
        defaultValues: defaultValues,
    });



    return(
        <>
            <Typography variant="h4"   mt={5}  textAlign="center">Create Loan Amount</Typography>
            <form className="create-form">

                <Grid item xs={12} ml={25}   display="flex" justifyContent="left">
                    <Button variant="contained" onClick={()=>{navigate("/customerCategory")}}>Back</Button>
                </Grid>
                <Grid container spacing={2} mt={1} justifyContent="center" alignItems="center" >

                    {/*<Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >*/}
                    {/*    <FormTextField  label={"Loan Id"}*/}
                    {/*                    type="number"*/}
                    {/*                    {...register("loanId")}*/}
                    {/*                    error={!!errors.loanId?.message}*/}

                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Loan Code"}
                                        type="text"
                                        {...register("loanCode")}
                                        error={!!errors.loanCode?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Loan Description"}
                                        type="text"
                                        {...register("loanDescription")}
                                        error={!!errors.loanDescription?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Loan Limit"}
                                        type="number"
                                        {...register("loanLimit")}
                                        error={!!errors.loanLimit?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Validity Month"}
                                        type="number"
                                        {...register("validityMonth")}
                                        error={!!errors.validityMonth?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Loan Validity Period"}
                                        type="number"
                                        {...register("loanValidityPeriod")}
                                        error={!!errors.loanValidityPeriod?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Interest Rate"}
                                        type="number"
                                        {...register("interestRate")}
                                        error={!!errors.interestRate?.message}
                        />
                    </Grid>
                    {/*<Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >*/}
                    {/*    <FormTextField  label={"Interest Rate Period Month"}*/}
                    {/*                    type="number"*/}
                    {/*                    {...register("isInterestRatePeriodMonth")}*/}
                    {/*                    error={!!errors.isInterestRatePeriodMonth?.message}*/}
                    {/*    />*/}
                    {/*</Grid>*/}

                    {/*<Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >*/}
                    {/*    <FormTextField  label={"Interest Rate Period Month"}*/}
                    {/*                    type="number"*/}
                    {/*                    {...register("isInterestRatePeriodMonth")}*/}
                    {/*                    error={!!errors.isInterestRatePeriodMonth?.message}*/}
                    {/*    />*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Interest Rate Applicable"}
                                        type="number"
                                        {...register("interestRateApplicable")}
                                        error={!!errors.interestRateApplicable?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                        <FormTextField  label={"Loan Amount"}
                                        type="number"
                                        {...register("loanAmount")}
                                        error={!!errors.loanAmount?.message}
                        />
                    </Grid>

                    <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                        <FormSwitchField
                            name={"isActive"}
                            label={"Active"}
                            helperText={""}
                            disabled={false}
                            error={!!errors.isActive?.message}
                            control={control}
                            setValue={()=>setValue}/>

                    </Grid>
                    <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                        <FormSwitchField
                            name={"loanLimitApplicable"}
                            label={"Loan Limit Applicable"}
                            helperText={""}
                            disabled={false}
                            error={!!errors.loanLimitApplicable?.message}
                            control={control}
                            setValue={()=>setValue}/>

                    </Grid>


                    <Grid item xs={12} mb={10} display="flex" justifyContent="center">
                        <Button type="submit" variant="contained" color="primary"
                                onClick={handleSubmit(submitButtonControl)}
                        >
                            Submit
                        </Button>
                        <Button sx={{ marginLeft: 25  }} type="submit" variant="contained" color="primary"
                                onClick={()=> reset()}
                        >
                            Clear
                        </Button>
                    </Grid>


                </Grid>
  </form>
        </>
    )
}
export default CreateLoanAmount;