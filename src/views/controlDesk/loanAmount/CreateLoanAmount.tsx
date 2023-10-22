import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import * as Yup from "yup";
import { axiosInstance } from "../../../api/Store";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import FormTextField from "../../../components/textField/FormTextField";
import FormSwitchField from "../../../components/switch/FormSwitchField";
import FormDropdownField from "../../../components/formDropdown/FormDromdown";
import FormAutoCompleteField from "../../../components/autoComplete/FormAutoCompleteField";

function CreateLoanAmount() {
  const commonError = "Field is required";
  const validationSchema = Yup.object().shape({
    // loanId: Yup.string().required(commonError),
    loanCode: Yup.string().required(commonError),
    loanDescription: Yup.string().required(commonError),
    isActive: Yup.boolean(),
    interestRate: Yup.string().required(commonError),
    interestRateValidity: Yup.string().required(commonError),
    loanLimitApplicable: Yup.boolean(),
    interestRateValidityPeriod: Yup.string().required(commonError),
    interestRateValidityPeriodApplicable: Yup.boolean(),
    loanAmount: Yup.string().required(commonError),
    limitValidityPeriod: Yup.number().required(commonError),
    limitValidity: Yup.string().required(commonError),
    // loanValidityPeriod:Yup.string().required(commonError),
    catId: Yup.string().required(commonError),
  });

  const createLoanAmount = async (data: any) => {
    alert("loanAmount created");
    navigate("/loanAmount");
    // console.log(data);
    const payload = {
      loanId: "",
      loanCode: data.loanCode,
      loanDescription: data.loanDescription,
      isLoanLimitApplicable: data.loanLimitApplicable,
      loanAmount: parseInt(data.loanAmount),
      isLimitValidityPeriodApplicable:
        data.limitValidityPeriodApplicable ?? false,
      isLimitValidityMonth: data.limitValidity === "Monthly",
      isLimitValidityDays: data.limitValidity === "Daily",
      limitValidityPeriod: parseInt(data.limitValidityPeriod),
      interestRate: data.interestRate,
      isInterestRateValidityPeriodApplicable:
        data.interestRateValidityPeriodApplicable ?? false,
      isInterestRateValidityMonth: data.interestRateValidity === "Monthly",
      isInterestRateValidityDays: data.interestRateValidity === "Daily",
      interestRateValidityPeriod: parseInt(data.interestRateValidityPeriod),
      isDeleted: false,
      isInterestRateApplicable: data.interestRateApplicable,
      catId: parseInt(data.catId),
    };
    // console.log("payload",payload)
    try {
      const res = await axiosInstance.post(`/loanAmount/save`, payload);
      if (res.data?.status === 201) {
        setloanID(res.data?.data?.loanId);
        // notify.success(res.data?.message);
      }
    } catch (error: any) {
      console.error(error);
      // notify.error(error.response?.data?.message);
    }
  };

  const updateLoanAmount = async (data: any) => {
    if (id) {
      const payloadData = {
        loanId: parseInt(id),
        loanCode: data.loanCode,
        loanDescription: data.loanDescription,
        isLoanLimitApplicable: data.loanLimitApplicable,
        loanAmount: parseInt(data.loanAmount),
        isLimitValidityPeriodApplicable:
          data.limitValidityPeriodApplicable ?? false,
        isLimitValidityMonth: data.limitValidity === "Monthly",
        isLimitValidityDays: data.limitValidity === "Daily",
        limitValidityPeriod: parseInt(data.limitValidityPeriod),
        interestRate: data.interestRate,
        isInterestRateValidityPeriodApplicable:
          data.interestRateValidityPeriodApplicable ?? false,
        isInterestRateValidityMonth: data.interestRateValidity === "Monthly",
        isInterestRateValidityDays: data.interestRateValidity === "Daily",
        interestRateValidityPeriod: parseInt(data.interestRateValidityPeriod),
        isDeleted: false,
        isInterestRateApplicable: data.interestRateApplicable,
        catId: parseInt(data.catId),
      };
      // console.log("payload",payload)
      try {
        const res = await axiosInstance.put(
          `/loanAmount/update/${id}`,
          payloadData,
        );
        console.log(res);
        alert("Loan Amount Updated!");
        navigate("/loanAmount");
      } catch (error: any) {
        console.error(error);
        // notify.error(error.response?.data?.message);
      }
    }
  };
  const handleClick = (data: any) => {
    if (page == "edit") {
      updateLoanAmount(data);
    } else {
      createLoanAmount(data);
    }
  };

  const [loanID, setloanID] = useState<number>(0);
  const navigate = useNavigate();
  const [defaultValues, setDefaultValues] = useState<any>({
    loanCode: "",
    loanDescription: "",
    isActive: false,
    interestRate: "",
    interestRateValidity: "",
    loanLimitApplicable: false,
    interestRateValidityPeriod: "",
    interestRateValidityPeriodApplicable: false,
    loanAmount: "",
    limitValidity: "",
    limitValidityPeriod: "",
    catId: "",
  });
  // const submitButtonControl = () => {
  //     console.log("Submit button clicked");
  //     // createLoanAmount(getValues());
  //     navigate("/customerCategory");
  // };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [title, setTitle] = useState("Create Loan Amount");

  const [id, setId] = useState("");
  const [page, setpage] = useState("");
  const access = window.location.href.includes("view");
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const id = searchParams.get("id");
    const page = searchParams.get("page");

    if (page == "edit") {
      setTitle("Edit Loan Amount");
      setIsEdit(true);
    }
    if (page == "view") {
      setIsView(true);
      setTitle("View Loan Amount");
    }
    if (page) setpage(page);
    if (id) {
      setId(id);
    }
  }, [location]);

  function getLoanAmountById() {
    axiosInstance
      .get(`/loanAmount/viewById/${id}`)
      .then((response: any) => {
        // check undefined?
        const responceData = response?.data?.body ?? {};
        // console.log(response.data.body)
        const defVals = {
          catId: responceData?.catId ?? "",
          loanCode: responceData?.loanCode ?? "",
          loanDescription: responceData?.loanDescription ?? "",
          loanAmount: responceData?.loanAmount ?? "",
          limitValidity: responceData?.isLimitValidityMonth
            ? "Monthly"
            : responceData.isLimitValidityDays
            ? "Daily"
            : "",
          interestRateValidity: responceData?.isInterestRateValidityMonth
            ? "Monthly"
            : responceData.isInterestRateValidityDays
            ? "Daily"
            : "",
          limitValidityPeriod: responceData?.limitValidityPeriod,
          interestRate: responceData?.interestRate ?? false,
          interestRateValidityPeriod:
            responceData?.interestRateValidityPeriod ?? null,
          specializedCustomer: responceData?.specializedCustomer ?? false,
          isInterestRateApplicable:
            responceData?.isInterestRateApplicable ?? false,
          isLoanLimitApplicable: responceData?.isLoanLimitApplicable ?? false,
          isLimitValidityPeriodApplicable:
            responceData?.isLimitValidityPeriodApplicable ?? false,
          isInterestRateValidityPeriodApplicable:
            responceData?.isInterestRateValidityPeriodApplicable ?? false,
          // isDeleted: response.data.body.isDeleted
        };
        reset(defVals);
        setValue("catId", defVals.catId);
        setValue("catCode", defVals.loanCode);
        setValue("loanDescription", defVals.loanDescription);
        setValue("loanAmount", defVals.loanAmount);
        setValue("limitValidityPeriod", defVals.limitValidityPeriod);
        setValue("interestRate", defVals.interestRate);
        setValue(
          "interestRateValidityPeriod",
          defVals.interestRateValidityPeriod,
        );
        setValue("isInterestRateApplicable", defVals.isInterestRateApplicable);
        setValue("isLoanLimitApplicable", defVals.isLoanLimitApplicable);
        setValue(
          "isLimitValidityPeriodApplicable",
          defVals.isLimitValidityPeriodApplicable,
        );
        setValue(
          "isInterestRateValidityPeriodApplicable",
          defVals.isInterestRateValidityPeriodApplicable,
        );
        setValue("interestRateValidity", defVals.interestRateValidity);
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }

  useEffect(() => {
    if (id) {
      getLoanAmountById();
    }
  }, [id]);

  const [categories, setCategories] = useState([]);

  useLayoutEffect(() => {
    getAllCategories();
  }, []);

  function getAllCategories() {
    axiosInstance
      .get("/category/viewAll")
      .then((response) => {
        setCategories(
          response.data.data.map((d: any) => ({
            value: d.catId,
            label: `${d.catCode} - ${d.categoryDescription}`,
          })),
        );
      })
      .catch((error) => {
        console.error("error fetching data", error);
      });
  }

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    control,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: defaultValues,
  });

  useEffect(() => {
    console.log("err", errors);
  }, [errors]);

  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        {title}
      </Typography>
      <Card
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "50%",
          margin: "0 auto",
          marginTop: "88px",
          marginBottom: "88px",
        }}
      >
        <CardContent>
          <form className="create-form">
            <Grid
              item
              xs={12}
              ml={12}
              mt={3}
              display="flex"
              justifyContent="left"
            >
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/loanAmount");
                }}
              >
                Back
              </Button>
            </Grid>
            <Grid
              container
              spacing={2}
              mt={1}
              justifyContent="center"
              alignItems="center"
            >
              {/*<Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >*/}
              {/*    <FormTextField  label={"Loan Id"}*/}
              {/*                    type="number"*/}
              {/*                    {...register("loanId")}*/}
              {/*                    error={!!errors.loanId?.message}*/}

              {/*    />*/}
              {/*</Grid>*/}
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "20%" }}
              >
                <FormAutoCompleteField
                  options={categories}
                  register={register("catId")}
                  label={"Category Id"}
                  error={!!errors.catId?.message}
                  helperText={
                    errors?.catId?.message
                      ? errors?.catId?.message?.toString()
                      : ""
                  }
                  id={"catId"}
                  required={false}
                  control={control}
                  setValue={setValue}
                  watch={watch}
                  disabled={access}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Loan Code"}
                  type="text"
                  register={register("loanCode")}
                  error={!!errors.loanCode?.message}
                  helperText={errors.loanCode?.message?.toString()}
                  disabled={access}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={3}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Loan Description"}
                  type="text"
                  register={register("loanDescription")}
                  error={!!errors.loanDescription?.message}
                  helperText={errors.loanDescription?.message?.toString()}
                  disabled={access}
                />
              </Grid>
              {/*<Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >*/}
              {/*    <FormTextField  label={"Loan Limit"}*/}
              {/*                    type="number"*/}
              {/*                    register = {register("loanLimit")}*/}
              {/*                    error={!!errors.loanLimit?.message}*/}
              {/*                    helperText={errors.loanLimit?.message?.toString()}*/}
              {/*                    disabled={access}*/}
              {/*    />*/}
              {/*</Grid>*/}
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={3}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Limit Validity Period"}
                  type="number"
                  register={register("limitValidityPeriod")}
                  error={!!errors.limitValidityPeriod?.message}
                  helperText={errors.limitValidityPeriod?.message?.toString()}
                  disabled={access}
                />
              </Grid>
              {/*<Grid item xs={12} sm={4} lg={4} ml={2} mr={2} mt={10}sx={{ width: "20%" }} >*/}
              {/*    <FormTextField  label={"Loan Validity Period"}*/}
              {/*                    type="number"*/}
              {/*                    register = {register("loanValidityPeriod")}*/}
              {/*                    error={!!errors.loanValidityPeriod?.message}*/}
              {/*                    helperText={errors.loanValidityPeriod?.message?.toString()}*/}
              {/*                    disabled={access}*/}
              {/*    />*/}
              {/*</Grid>*/}
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={3}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Interest Rate"}
                  type="number"
                  register={register("interestRate")}
                  helperText={errors.interestRate?.message?.toString()}
                  error={!!errors.interestRate?.message}
                  disabled={access}
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
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={3}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Interest Rate Validity Period"}
                  type="number"
                  register={register("interestRateValidityPeriod")}
                  error={!!errors.interestRateApplicable?.message}
                  helperText={errors.interestRateApplicable?.message?.toString()}
                  disabled={access}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={3}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Loan Amount"}
                  type="number"
                  register={register("loanAmount")}
                  error={!!errors.loanAmount?.message}
                  helperText={errors.loanAmount?.message?.toString()}
                  disabled={access}
                />
              </Grid>

              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"isActive"}
                  label={"Active"}
                  helperText={""}
                  disabled={access}
                  error={!!errors.isActive?.message}
                  control={control}
                  setValue={() => setValue}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"loanLimitApplicable"}
                  label={"Loan Limit Applicable"}
                  helperText={""}
                  disabled={access}
                  error={!!errors.loanLimitApplicable?.message}
                  control={control}
                  setValue={() => setValue}
                />
              </Grid>

              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"limitValidityPeriodApplicable"}
                  label={"Limit Validity Period Applicable"}
                  helperText={""}
                  disabled={access}
                  error={false}
                  control={control}
                  setValue={() => setValue}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"interestRateApplicable"}
                  label={"Interest Rate Applicable"}
                  helperText={""}
                  disabled={access}
                  error={false}
                  control={control}
                  setValue={() => setValue}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"interestRateValidityPeriodApplicable"}
                  label={"Interest Rate Validity Period Applicable"}
                  helperText={""}
                  disabled={access}
                  error={false}
                  control={control}
                  setValue={() => setValue}
                />
              </Grid>

              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormDropdownField
                  label={"Limit Validity"}
                  required={true}
                  labelId={"limitValidity"}
                  name={"limitValidity"}
                  control={control}
                  errorMessage={errors.limitValidity?.message}
                  optionList={[
                    { label: "Daily", value: "Daily" },
                    { label: "Monthly", value: "Monthly" },
                  ]}
                  disabled={access}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={5}
                sx={{ width: "5%" }}
              >
                <FormDropdownField
                  label={"interest RatevValidity"}
                  required={true}
                  labelId={"interestRateValidity"}
                  name={"interestRateValidity"}
                  errorMessage={errors.interestRateValidity?.message}
                  control={control}
                  optionList={[
                    { label: "Daily", value: "Daily" },
                    { label: "Monthly", value: "Monthly" },
                  ]}
                  disabled={access}
                />
              </Grid>

              {!access ? (
                <Grid
                  item
                  xs={12}
                  mb={10}
                  display="flex"
                  justifyContent="center"
                >
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(handleClick)}
                  >
                    Submit
                  </Button>
                  <Button
                    sx={{ marginLeft: 25 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => reset()}
                  >
                    Clear
                  </Button>
                </Grid>
              ) : (
                <></>
              )}
              {/*<Grid item xs={12} mb={10} display="flex" justifyContent="center">*/}
              {/*    <Button type="submit" variant="contained" color="primary"*/}
              {/*            onClick={handleSubmit(createLoanAmount)}*/}
              {/*    >*/}
              {/*        Submit*/}
              {/*    </Button>*/}
              {/*    <Button sx={{ marginLeft: 25  }} type="submit" variant="contained" color="primary"*/}
              {/*            onClick={()=> reset()}*/}
              {/*    >*/}
              {/*        Clear*/}
              {/*    </Button>*/}
              {/*</Grid>*/}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}
export default CreateLoanAmount;
