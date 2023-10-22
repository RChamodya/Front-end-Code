import React, {useEffect, useState} from "react";
import {
    Button,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    Grid,
    Input,
    RadioGroup,
    Switch,
    Typography
} from "@mui/material";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import {axiosInstance} from "../../../api/Store";
import {useLocation, useNavigate} from "react-router-dom";
import {string} from "yup";
import FormSwitchField from "../../../components/switch/FormSwitchField";
import FormTextField from "../../../components/textField/FormTextField";

interface CustomerCategory {
    catId: number;
    catCode: string;
    categoryDescription: string;
    status: boolean;
    income: number;
}


const CustomerCategoryEditPage = () => {
    const [categories, setCategories] = useState<Array<any>>([]);
    // const [customerCategory, setCustomerCategory] = useState<CustomerCategory>({
    //     catId: 0,
    //     catCode: "",
    //     categoryDescription: "",
    //     status: false,
    //     income: 0
    // });

    let navigate = useNavigate();
    const submitButtonControll = (data: any) => {
        if (id) {
            const payloadData = {
                catId: parseInt(id),
                catCode: data.catCode,
                categoryDescription: data.categoryDescription,
                status: data.status,
                ageGreaterThan18: data.ageGreaterThan18,
                creditScore: data.creditScore,
                specializedCustomer: data.specializedCustomer,
                income: parseFloat(data.income),
                isDeleted: false
            }
            axiosInstance.put(`/category/update/${id}`, payloadData)
                .then((res: any) => {
                    alert("category Updated!")
                    navigate("/customerCategory");
                })

        }

    };


    const commonError = "Field is required";
    const validationSchema = Yup.object().shape({
        catId: Yup.string().required(commonError),
        catCode: Yup.string().required(commonError),
        categoryDescription: Yup.string().required(commonError),
        income: Yup.string().required(commonError),
        status: Yup.boolean(),
        ageGreaterThan18: Yup.boolean(),
        creditScore: Yup.string().required(commonError),
        specializedCustomer: Yup.boolean(),
        isDeleted: Yup.boolean(),

    });
    const [id, setId] = useState<any>("");
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);

    useEffect(() => {

        const catId = searchParams.get("id");
        if (catId) {
            console.log(id)
            setId(catId);
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

    function getCategoriesById() {
        axiosInstance.get(`/category/viewById/${id}`)
            .then((response: any) => {
                // check undefined?
                const responceData = response?.data?.data ?? {};


                // console.log(response.data.body)
                const defVals = {
                    catId: responceData?.catId ?? "",
                    catCode: responceData?.catCode ?? "",
                    categoryDescription: responceData?.categoryDescription ?? "",
                    status: responceData?.status ?? false,
                    income: responceData?.income ?? null,
                    ageGreaterThan18: responceData?.ageGreaterThan18 ?? false,
                    creditScore: responceData?.creditScore ?? null,
                    specializedCustomer: responceData?.specializedCustomer ?? false,
                    // isDeleted: response.data.body.isDeleted

                };
                reset(defVals);
                setValue("catId", defVals.catId);
                setValue("catCode", defVals.catCode);
                setValue("categoryDescription", defVals.categoryDescription);
                setValue("status", defVals.status);
                setValue("income", defVals.income);
            })
            .catch((error) => {
                console.error("error fetching data", error);
            })
    }

    useEffect(() => {
        if (id) {
            getCategoriesById();
        }
    }, [id])
    // const [defaultValues, setDefaultValues] = useState<any>({
    //     catId: 0,
    //     catCode: "",
    //     categoryDescription: "",
    //     status: false,
    //     income: 0
    // });

    return (


        <>

            <Typography variant="h4" mt={5} textAlign="center">Create Customer Category</Typography>
            <form>
                <Grid container spacing={2} mt={7}>
                    <Grid item xs={12} sm={12} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel>Cat ID</FormLabel>
                            <Input
                                type="number"
                                {...register("catId")}
                                error={!!errors.catId?.message}
                                disabled
                            />
                            <FormHelperText>{errors.catId?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel>Credit Score</FormLabel>
                            <Input
                                type="number"
                                {...register("creditScore")}
                                error={!!errors.creditScore?.message}

                            />
                            <FormHelperText>{errors.creditScore?.message}</FormHelperText>
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={12} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel></FormLabel>
                            <FormTextField  label={""}
                                            type="text"
                                            register={register("catCode")}
                                            error={!!errors?.catCode?.message}
                                            helperText={errors?.catCode?.message?.toString()}

                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel>Category Description</FormLabel>
                            <Input
                                type="text"
                                {...register("categoryDescription")}
                                error={!!errors.categoryDescription?.message}
                            />
                            <FormHelperText>{errors.categoryDescription?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel>Income</FormLabel>
                            <Input
                                type="number"
                                {...register("income")}
                                error={!!errors.income?.message}
                            />
                            <FormHelperText>{errors.income?.message}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormSwitchField name={"status"}
                                             label={"Status"}
                                             helperText={errors.status?.message}
                                             disabled={false}
                                             error={!!errors.status?.message}
                                             control={control}
                                             setValue={() => setValue}/>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={4} lg={4} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel></FormLabel>
                            <FormSwitchField name={"ageGreaterThan18"}
                                             label={"Age Greaterthan 18"}
                                             helperText={errors.ageGreaterThan18?.message}
                                             disabled={false}
                                             error={!!errors.ageGreaterThan18?.message}
                                             control={control}
                                             setValue={() => setValue}/>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} lg={4} ml={50} mr={50}>
                        <FormControl margin="normal" fullWidth>
                            <FormLabel></FormLabel>
                            <FormSwitchField name={"specializedCustomer"}
                                             label={"Specialized Customer"}
                                             helperText={errors.specializedCustomer?.message}
                                             disabled={false}
                                             error={!!errors.specializedCustomer?.message}
                                             control={control}
                                             setValue={() => setValue}/>
                        </FormControl>
                    </Grid>


                    {/*<Grid item xs={12} sm={12} ml={50} mr={50}>*/}
                    {/*    <FormControl margin="normal" fullWidth>*/}
                    {/*        <FormLabel> </FormLabel>*/}
                    {/*        <FormSwitchField name={"isDeleted"}*/}
                    {/*                         label={"Deleted"}*/}
                    {/*                         helperText={errors.isDeleted?.message}*/}
                    {/*                         disabled={true}*/}
                    {/*                         error={!!errors.isDeleted?.message}*/}
                    {/*                         control={control}*/}
                    {/*                         setValue={()=>setValue}/>*/}
                    {/*    </FormControl>*/}
                    {/*</Grid>*/}
                    {/*<Grid item xs={12} ml={25}  display="flex" justifyContent="left">*/}
                    {/*    <Button variant="contained" onClick={()=>{navigate("/customerCategory")}}>Back</Button>*/}
                    {/*</Grid>*/}
                    <Grid item xs={12} mb={10} display="flex" justifyContent="center">
                        <Button variant="contained" onClick={() => {
                            navigate("/customerCategory")
                        }}>Back</Button>
                        <Button sx={{marginLeft: 5}} type="submit" variant="contained" color="primary"
                                onClick={handleSubmit(submitButtonControll)}>
                            Submit
                        </Button>

                    </Grid>
                </Grid>
            </form>

        </>
    )

}

export default CustomerCategoryEditPage;