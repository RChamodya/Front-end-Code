import {Button, FormControl, FormHelperText, Grid, Switch, Typography} from "@mui/material";
import React, { useState } from "react";
import FormTextField from "../components/textField/FormTextField";
import FormSwitchField from "../components/switch/FormSwitchField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {axiosInstance} from "../api/Store";
import { useNavigate } from "react-router-dom";


interface FormInputSwitchProps {
    name: string;
    label: string;
    helperText: string | undefined;
    disabled: boolean;
    error: boolean;
    control: any;
    setValue: (label: string, obj: any) => any;
}





function CategoryCreatePage(){


    const commonError = "Field is required";
    const validationSchema = Yup.object().shape({
        catId: Yup.string().required(commonError),
        catCode: Yup.string().required(commonError),
        categoryDescription: Yup.string().required(commonError),
        income: Yup.string().required(commonError),
        status: Yup.boolean(),
        ageGreaterThan18: Yup.boolean(),
        creditScore:Yup.string().required(commonError),
        specializedCustomer:Yup.boolean(),
        isDeleted: Yup.boolean(),

    });

    const createCategory = async (payload: any) => {
        try {
            const res = await axiosInstance.post(`/category/save`, payload);
            if (res.data?.status === 201) {
                setCatID(res.data?.data?.shopId);
                // notify.success(res.data?.message);
                navigate(-1);
            }
        } catch (error: any) {
            console.error(error);
            // notify.error(error.response?.data?.message);
        }
    };

    const submitButtonControl = () => {
        console.log("Submit button clicked");
        createCategory(getValues());
        navigate("/customerCategory");
    };

    const [catID, setCatID] = useState<number>(0);
    const navigate = useNavigate();
    const [defaultValues, setDefaultValues] = useState<any>({

        catCode: "",
        categoryDescription: "",
        status: false,
        specializedCustomer: false,
        ageGreaterThan18: false,
        creditScore: "",
        income: "",
        isDeleted: false,
    });
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
        <Typography variant="h4"   mt={5}  textAlign="center">Create Customer Category</Typography>
        <form className="create-form">

            <Grid item xs={12} ml={25}   display="flex" justifyContent="left">
                <Button variant="contained" onClick={()=>{navigate("/customerCategory")}}>Back</Button>
            </Grid>
        <Grid container spacing={2} mt={1} justifyContent="center" alignItems="center" >
            <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                <FormTextField  label={"Category Code"}
                                type="text"
                                {...register("catCode")}
                                error={!!errors.catId?.message}

                />
            </Grid>

            <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >
                <FormTextField  label={"Category Description"}
                                type="text"
                                {...register("categoryDescription")}
                                error={!!errors.catId?.message}
                />
            </Grid>

            <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={5}sx={{ width: "20%" }} >
                <FormTextField  label={"Credit Score"}
                                type="number"
                                {...register("creditScore")}
                                error={!!errors.creditScore?.message}
                />
            </Grid>

            <Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={5}sx={{ width: "20%" }} >
                <FormControl margin="normal" fullWidth>
                <FormTextField  label={"Income"}
                                type="number"
                                {...register("creditScore")}
                                error={!!errors.creditScore?.message}
                />

                </FormControl>
            </Grid>

            <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                <FormSwitchField
                    name={"status"}
                    label={"Status"}
                    helperText={""}
                    disabled={false}
                    error={!!errors.status?.message}
                    control={control}
                    setValue={()=>setValue}/>

            </Grid>

            <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                <FormSwitchField name={"specializedCustomer"}
                                 label={"Specialized Customer"}
                    // helperText={errors.specializedCustomer?.message}
                                 disabled={false}
                                 error={!!errors.specializedCustomer?.message}
                                 control={control}
                                 setValue={() => setValue}
                                 helperText={""}/>

            </Grid>
            <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                <FormSwitchField name={"ageGreaterThan18"}
                                 label={"Age Greaterthan 18"}
                    // helperText={errors.ageGreaterThan18?.message}
                                 disabled={false}
                                 error={!!errors.ageGreaterThan18?.message}
                                 control={control}
                                 setValue={() => setValue}
                                 helperText={""}
                />

            </Grid>
            <Grid item xs={4} sm={4} lg={4} ml={2} mr={2} mt={5} sx={{ width: "5%" }} >

                <FormSwitchField name={"isDeleted"}
                                 label={"Deleted"}
                    // helperText={errors.isDeleted?.message}
                                 disabled={true}
                                 error={!!errors.isDeleted?.message}
                                 control={control}
                                 setValue={() => setValue}
                                 helperText={""}
                />
            </Grid>

            <Grid item xs={12} display="flex" justifyContent="center">
                <Button type="submit" variant="contained" color="primary"
                        onClick={handleSubmit(submitButtonControl)}
                >
                    Submit
                </Button>
                <Button sx={{ marginLeft: 5 }} type="submit" variant="contained" color="primary"
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
export default CategoryCreatePage;