import {Button, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import {axiosInstance} from "../../../api/Store";
import FormTextField from "../../../components/textField/FormTextField";
import FormDropdownField from "../../../components/formDropdown/FormDromdown";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import FormSwitchField from "../../../components/switch/FormSwitchField";

function EditLoanAmount() {

    const [loans, setloans] = useState<Array<any>>([]);
    const [categories, setCategories] = useState<Array<any>>([]);
    let navigate = useNavigate();
    const daysMonths = [
        {
            label: "Daily",
            value: "Daily"
        },
        {
            label: "Monthly",
            value: "Monthly"
        }

    ]

    const submitButtonControll = (data: any) => {
        if (id) {
            const payloadData = {
                loanId: parseInt(id),
                loanCode: data.loanCode,
                loanDescription: data.loanDescription,
                isActive: data.isActive,
                loanLimit: data.loanLimit,
                validityMonth: data.validityMonth,
                loanValidityPeriod: data.loanValidityPeriod,
                interestRate: data.interestRate,
                isInterestRatePeriodMonth: data.isInterestRatePeriodMonth,
                loanLimitApplicable: data.loanLimitApplicable,
                limitValidityPeriodApplicable: data.limitValidityPeriodApplicable,
                interestRateApplicable: data.interestRateApplicable,
                interestRateValidityPeriodApplicable: data.interestRateValidityPeriodApplicable,
                loanAmount: data.loanAmount,
                isDeleted: data.isDeleted,

            }
            axiosInstance.put(`/loanAmount/update/${id}`, payloadData)
                .then((res: any) => {
                    alert("loan amount Updated!")
                    navigate("/loanAmount");
                })

        }}
        const commonError = "Field is required";
        const validationSchema = Yup.object().shape({
            loanCode: Yup.string().required(commonError),
            loanDescription: Yup.string().required(commonError),
            loanAmount: Yup.string().required(commonError),
            limitValidityPeriodApplicable: Yup.boolean(),
            interestRateApplicable: Yup.string(),
            interestRateValidity: Yup.string().required(commonError),
            interestRateValidityPeriodApplicable: Yup.string(),
            loanLimitApplicable: Yup.boolean(),
            loanValidityPeriod: Yup.string().required(commonError),
            interestRateValidityApplicable:Yup.boolean(),
            limitValidity:Yup.string(),
            interestRate:Yup.string().required(commonError),


        });



        const [id, setId] = useState<any>("");
        const location = useLocation();
        const searchParams = new URLSearchParams(location.search);

        useEffect(() => {

            const loanId = searchParams.get("id");
            if (loanId) {
                console.log(id)
                setId(loanId);
            }
        }, [location])

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
            // defaultValues: defaultValues,
        });
        let navigate1 = useNavigate();
    const submitForm = (data:any) => {
        console.log(data)
        console.log(errors)
        console.log("Submit button clicked");
        navigate("/loanAmount");
    };
        function getCategoriesById() {
            axiosInstance.get(`/category/viewById/${id}`)
                .then((response: any) => {
                        // console.log(response.data.body)
                        const defVals = {
                            loanCode: response.data.body.loanCode,
                            loanDescription: response.data.body.loanDescription,
                            isActive: response.data.body.isActive,
                            loanLimit: response.data.body.loanLimit,
                            loanAmount: response.data.body.loanAmount,
                            ageGreaterThan18: response.data.body.ageGreaterThan18,
                            creditScore: response.data.body.creditScore,
                            specializedCustomer: response.data.body.specializedCustomer,
                            // isDeleted: response.data.body.isDeleted

                        };
                    }
                )}
    useEffect(()=>{
        if (errors){
            console.log(errors);
        }


    },[errors])
                    return (
                        <>
                            <Typography variant="h4" mt={5} textAlign="center">Edit Loan Amount</Typography>

                            <form className="create-form">
                                <Grid item xs={12} ml={25} display="flex" justifyContent="left">
                                    <Button variant="contained" onClick={() => {
                                        navigate("/customerCategory")
                                    }}>Back</Button>
                                </Grid>

                                <Grid container spacing={2} mt={1} justifyContent="center" alignItems="center">


                                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10} sx={{width: "20%"}}>
                                        <FormTextField label={"Loan Code"}
                                                       type="text"
                                                       register={register("loanCode")}
                                                       helperText={errors?.loanCode?.message?.toString()}

                                            // error={!!errors.loanCode?.message}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10} sx={{width: "20%"}}>
                                        <FormTextField label={"Loan Description"}
                                                       type="text"
                                                       error={false}
                                                       register={register("loanDescription")}
                                                       helperText={errors?.loanDescription?.message?.toString()}
                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10} sx={{width: "20%"}}>
                                        <FormTextField label={"Loan Amount"}
                                                       type="number"
                                                       register={register("loanAmount")}
                                                        error={!!errors.loanAmount?.message}
                                                       helperText={errors?.loanAmount?.message?.toString()}

                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10} sx={{width: "20%"}}>
                                        <FormTextField label={"Interest Rate"}
                                                       type="number"
                                                       register={register("interestRate")}
                                                       error={!!errors.interestRate?.message}
                                                       helperText={errors?.interestRate?.message?.toString()}

                                        />
                                    </Grid>

                                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10} sx={{width: "20%"}}>
                                        <FormDropdownField label={"Interest Rate Validity"}
                                                           required={false}
                                                           // register={register("interestRateValidity")}
                                                           labelId={"interestRateValidity"}
                                                           name={"interestRateValidity"}
                                                           control={control}
                                                           optionList={daysMonths}
                                                           disabled={false}
                                                           errorMessage={errors?.interestRateValidity?.message}
                                        />



                                    </Grid>
                                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10} sx={{width: "20%"}}>
                                        <FormDropdownField label={"Limit Validity"}
                                                           required={false}
                                                           labelId={"interestRateValidity"}
                                                           name={"interestRateValidity"}
                                                           control={control}
                                                           optionList={daysMonths}
                                                           disabled={false}
                                                           errorMessage={errors?.interestRateValidity?.message}
                                        />



                                    </Grid>

                                    <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                                        <FormSwitchField
                                            name={"loanLimitApplicable"}
                                            label={"Loan Limit Applicable"}
                                            disabled={false}
                                            error={!!errors?.loanLimitApplicable?.message}
                                            control={control}
                                            helperText={errors?.loanLimitApplicable?.message?.toString()}
                                            setValue={()=>setValue}/>

                                    </Grid>

                                    <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                                        <FormTextField  label={"Loan Validity Period"}
                                                        type="number"
                                                        register={register("loanValidityPeriod")}
                                                        error={!!errors?.loanValidityPeriod?.message}
                                                        helperText={errors?.loanValidityPeriod?.message?.toString()}
                                        />
                                    </Grid>


                                        <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                                            <FormSwitchField
                                                name={"loanValidityPeriodApplicable"}
                                                label={"Loan Limit Validi Period Applicable"}
                                                helperText={""}
                                                disabled={false}
                                                error={!!errors.loanLimitApplicable?.message}
                                                control={control}
                                                setValue={()=>setValue}/>

                                        </Grid>
                                    <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                                            <FormSwitchField
                                                name={"interestRateValidityPeriodApplicable"}
                                                label={"Interest Rate Validity Period Applicable"}
                                                helperText={""}
                                                disabled={false}
                                                error={!!errors.loanLimitApplicable?.message}
                                                control={control}
                                                setValue={()=>setValue}/>

                                        </Grid>

                                    <Grid item xs={12} mb={10} display="flex" justifyContent="center">
                                        <Button type="submit" variant="contained" color="primary"
                                                onClick={handleSubmit(submitForm)}
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
                export default EditLoanAmount;