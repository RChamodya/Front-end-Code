import {
  Button,
  Card,
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import FormTextField from "../../../components/textField/FormTextField";
import FormSwitchField from "../../../components/switch/FormSwitchField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { axiosInstance } from "../../../api/Store";
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../components/button/BackButton";

interface FormInputSwitchProps {
  name: string;
  label: string;
  helperText: string | undefined;
  disabled: boolean;
  error: boolean;
  control: any;
  setValue: (label: string, obj: any) => any;
}

function CategoryCreatePage() {
  const [id, setId] = useState<any>("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [page, setPage] = useState("create");
  const [title, setTitle] = useState("Create Customer Category");
  const [isEdit, setIsEdit] = useState(false);
  const [isView, setIsView] = useState(false);

  useEffect(() => {
    const page = searchParams.get("page");
    const catId = searchParams.get("id");

    if (page == "edit") {
      setTitle("Edit Customer Category");
      setIsEdit(true);
    }
    if (page == "view") {
      setIsView(true);
      setTitle("view Customer Category");
    }

    if (page) setPage(page);
    if (catId) {
      setId(catId);
    }
  }, [location]);

  function getCategoriesById() {
    axiosInstance
      .get(`/category/viewById/${id}`)
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
      });
  }

  useEffect(() => {
    if (id) {
      getCategoriesById();
    }
  }, [id]);

  const commonError = "Field is required";
  const validationSchema = Yup.object().shape({
    catCode: Yup.string().required(commonError),
    categoryDescription: Yup.string().required(commonError),
    income: Yup.string().required(commonError),
    status: Yup.boolean(),
    ageGreaterThan18: Yup.boolean(),
    creditScore: Yup.string().required(commonError),
    specializedCustomer: Yup.boolean(),
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
  const handleSubmitCreate = async (data: any) => {
    console.log(data);

    const Payload = {
      catId: "",
      catCode: data.catCode,
      categoryDescription: data.categoryDescription,
      status: data.status,
      specializedCustomer: data.specializedCustomer,
      ageGreaterThan18: data.ageGreaterThan18,
      creditScore: parseInt(data.creditScore),
      income: parseInt(data.income),
      isDeleted: false,
    };
    console.log(Payload, "payload");
    axiosInstance.post("/category/save", Payload).then((response: any) => {
      if (response.data.status == 200) {
        console.log("done!", data);
      }
    });
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
  });
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
    if (errors) {
      console.log(errors);
    }
  }, [errors]);

  const handleSubmitEdit = (data: any) => {
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
        isDeleted: false,
      };
      axiosInstance
        .put(`/category/update/${id}`, payloadData)
        .then((res: any) => {
          alert("category Updated!");
          navigate("/customerCategory");
        });
    }
  };

  const handleClick = (data: any) => {
    if (page == "edit") {
      handleSubmitEdit(data);
    }
    if (page == "create") {
      handleSubmitCreate(data);
    }
  };

  return (
    <>
      <Typography variant="h4" mt={5} textAlign="center">
        {title}
      </Typography>
      <hr />
      <Card
        style={{
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Add a shadow
          display: "flex",
          flexDirection: "column",
          alignItems: "center", // Center align the card content
          width: "50%", // Set a specific width if needed
          margin: "0 auto", // Center horizontally
          marginTop: "20px", // Add some top margin for spacing
        }}
      >
        <CardContent>
          <form className="create-form">
            <Grid item xs={12} ml={12} display="flex" justifyContent="left">
              <Button
                variant="outlined"
                onClick={() => {
                  navigate("/customerCategory");
                }}
              >
                Back
              </Button>
              {/*<BackButton />*/}
            </Grid>
            <Grid
              container
              spacing={2}
              mt={1}
              justifyContent="center"
              alignItems="center"
            >
              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={4}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Category Code"}
                  type="text"
                  register={register("catCode")}
                  error={!!errors?.catCode?.message}
                  helperText={errors?.catCode?.message?.toString()}
                  disabled={isView || isEdit}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={4}
                sx={{ width: "20%" }}
              >
                <FormTextField
                  label={"Category Description"}
                  type="text"
                  register={register("categoryDescription")}
                  error={!!errors?.categoryDescription?.message}
                  helperText={errors?.categoryDescription?.message?.toString()}
                  disabled={isView}
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
                  label={"Credit Score"}
                  type="number"
                  register={register("creditScore")}
                  error={!!errors?.creditScore?.message}
                  helperText={errors?.creditScore?.message?.toString()}
                  disabled={isView}
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
                <FormControl margin="normal" fullWidth>
                  <FormTextField
                    label={"Income"}
                    type="number"
                    register={register("income")}
                    error={!!errors?.income?.message}
                    helperText={errors?.income?.message?.toString()}
                    disabled={isView}
                  />
                </FormControl>
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
                  name={"status"}
                  label={"Status"}
                  error={!!errors.status?.message}
                  control={control}
                  helperText={errors?.status?.message?.toString()}
                  setValue={() => setValue}
                  disabled={isView}
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
                  name={"specializedCustomer"}
                  label={"Specialized Customer"}
                  // helperText={errors.specializedCustomer?.message}
                  error={!!errors.specializedCustomer?.message}
                  control={control}
                  setValue={() => setValue}
                  helperText={""}
                  disabled={isView}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={3}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"ageGreaterThan18"}
                  label={"Age Greaterthan 18"}
                  // helperText={errors.ageGreaterThan18?.message}
                  error={!!errors.ageGreaterThan18?.message}
                  control={control}
                  setValue={() => setValue}
                  helperText={""}
                  disabled={isView}
                />
              </Grid>
              <Grid
                item
                xs={4}
                sm={4}
                lg={4}
                ml={2}
                mr={2}
                mt={3}
                sx={{ width: "5%" }}
              >
                <FormSwitchField
                  name={"isDeleted"}
                  label={"Deleted"}
                  // helperText={errors.isDeleted?.message}
                  disabled={true}
                  error={!!errors.isDeleted?.message}
                  control={control}
                  setValue={() => setValue}
                  helperText={""}
                />
              </Grid>
              {!isView ? (
                <Grid item xs={12} display="flex" justifyContent="center">
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit(handleClick)}
                  >
                    Submit
                  </Button>
                  <Button
                    sx={{ marginLeft: 5 }}
                    type="submit"
                    variant="contained"
                    color="primary"
                    onClick={() => reset()}
                  >
                    {" "}
                    Clear{" "}
                  </Button>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default CategoryCreatePage;
